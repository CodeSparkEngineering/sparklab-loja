import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductById, formatEUR } from '@/data/products';

// Precisa do runtime Node (crypto para verificar a assinatura da Stripe).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook da Stripe: recebe o aviso de cada pagamento concluído e envia
 * um email ao vendedor com a encomenda (produtos + personalização + cliente
 * + morada de envio).
 *
 * Configuração necessária (variáveis de ambiente, na Vercel e no .env.local):
 *  - STRIPE_SECRET_KEY        (já existe)
 *  - STRIPE_WEBHOOK_SECRET    (whsec_… — vem do painel da Stripe ao criar o webhook)
 *  - RESEND_API_KEY           (re_… — conta gratuita em resend.com)
 *  - ORDER_EMAIL_TO           (o teu email, onde recebes as encomendas)
 *  - ORDER_EMAIL_FROM         (opcional; por omissão "SparkLab <onboarding@resend.dev>")
 *
 * No painel da Stripe: Developers → Webhooks → Add endpoint →
 *   URL: https://www.sparklab3d.pt/api/stripe-webhook
 *   (o URL antigo https://sparklab-loja.vercel.app/api/stripe-webhook
 *   também continua a funcionar — /api/* está excluído do redirect)
 *   Evento: checkout.session.completed
 *   Copia o "Signing secret" para STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!key || !webhookSecret) {
    // 500 de propósito, NÃO 200.
    //
    // Isto já custou uma encomenda: em agosto de 2026 faltava o
    // STRIPE_WEBHOOK_SECRET e esta função respondia 200 { configured: false }.
    // A Stripe lia "entregue com sucesso", nunca reportava erro nem repetia, e
    // a venda passou despercebida — não saiu email nem para nós nem para o
    // cliente. A falha era invisível dos dois lados.
    //
    // Com 500 a entrega aparece a vermelho no painel da Stripe, ela repete
    // com backoff (e avisa por email ao fim de várias falhas), e nós damos por
    // isso no próprio dia. Repetir aqui não faz mal nenhum: sem segredo não
    // chegámos a processar nada, portanto não há trabalho duplicado.
    console.error(
      '[stripe-webhook] NÃO CONFIGURADO: falta STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET. ' +
        'Nenhuma encomenda será notificada até isto estar resolvido na Vercel.'
    );
    return NextResponse.json(
      { received: false, configured: false },
      { status: 500 }
    );
  }

  const stripe = new Stripe(key);
  const sig = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig ?? '', webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'assinatura inválida';
    console.error('[stripe-webhook] assinatura inválida:', msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  try {
    const sessionId = (event.data.object as Stripe.Checkout.Session).id;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true });
    }

    // Um email para nós (aviso de encomenda) e outro para o cliente (obrigado).
    // allSettled: se um falhar, o outro segue à mesma; a venda já aconteceu.
    const [aviso] = await Promise.allSettled([
      sendOrderEmail(session),
      sendCustomerEmail(session),
    ]);

    // Se o AVISO não saiu, devolvemos 500 para a Stripe repetir — ficaríamos
    // sem saber da encomenda, que é exatamente a falha que já nos escapou uma
    // vez. Repetir é seguro: como não saiu email nenhum, não há duplicados.
    //
    // Reparar que a decisão depende SÓ do aviso, nunca do email do cliente: se
    // o aviso saiu e só o do cliente falhou, respondemos 200. Caso contrário a
    // repetição da Stripe mandava-nos o mesmo aviso vezes sem conta.
    const avisoSaiu = aviso.status === 'fulfilled' && aviso.value === true;
    if (!avisoSaiu) {
      return NextResponse.json(
        { received: false, reason: 'order-email-failed' },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('[stripe-webhook] erro ao processar encomenda:', err);
    // Devolve 200 na mesma: a venda já aconteceu, não queremos repetições infinitas.
  }

  return NextResponse.json({ received: true });
}

/**
 * Aviso de encomenda para NÓS. Devolve `true` só quando o email saiu mesmo —
 * o chamador usa isso para decidir se deixa a Stripe repetir (ver POST).
 */
async function sendOrderEmail(session: Stripe.Checkout.Session): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM || 'SparkLab <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.error(
      '[stripe-webhook] RESEND_API_KEY ou ORDER_EMAIL_TO em falta — o aviso de ' +
        'encomenda NÃO foi enviado. A venda está feita e paga na Stripe.'
    );
    return false;
  }

  const total = typeof session.amount_total === 'number' ? session.amount_total / 100 : 0;
  const c = session.customer_details;

  // Morada de envio (varia conforme a versão da API da Stripe).
  type ShipLike = {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      postal_code?: string | null;
      city?: string | null;
      country?: string | null;
    } | null;
  };
  const ship: ShipLike | null =
    (session as unknown as { shipping_details?: ShipLike }).shipping_details ??
    (session.collected_information?.shipping_details as ShipLike | undefined) ??
    null;

  const rows = orderRowsHtml(session);

  const addr = ship?.address;
  const addrHtml = addr
    ? [
        ship?.name,
        addr.line1,
        addr.line2,
        [addr.postal_code, addr.city].filter(Boolean).join(' '),
        addr.country,
      ]
        .filter(Boolean)
        .map((l) => esc(String(l)))
        .join('<br/>')
    : '<em>Sem morada (produto digital ou não recolhida)</em>';

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
    <h2 style="color:#ea580c;margin:0 0 4px">🧾 Nova encomenda — SparkLab</h2>
    <p style="color:#57534e;margin:0 0 18px">Total pago: <strong>${formatEUR(total)}</strong></p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">${rows}</table>

    <h3 style="margin:0 0 6px">👤 Cliente</h3>
    <p style="margin:0 0 16px;color:#44403c">
      ${esc(c?.name ?? '—')}<br/>
      ${esc(c?.email ?? '—')}<br/>
      ${esc(c?.phone ?? 'sem telefone')}
    </p>

    <h3 style="margin:0 0 6px">📦 Morada de envio</h3>
    <p style="margin:0 0 16px;color:#44403c">${addrHtml}</p>

    <p style="color:#a8a29e;font-size:12px">SparkLab · aviso automático de encomenda</p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `🧾 Nova encomenda — ${formatEUR(total)}`,
      html,
      reply_to: c?.email || undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[stripe-webhook] Resend falhou:', res.status, body);
    return false;
  }
  return true;
}

// Linhas da encomenda (produto + personalização + subtotal) — partilhado pelos
// dois emails (o de aviso ao vendedor e o de agradecimento ao cliente).
function orderRowsHtml(session: Stripe.Checkout.Session): string {
  return (session.line_items?.data ?? [])
    .map((item) => {
      const prod = item.price?.product;
      const meta =
        prod && typeof prod === 'object' && 'metadata' in prod ? prod.metadata ?? {} : {};
      const productId = meta.product_id;
      const product = productId ? getProductById(productId) : undefined;

      const customs = Object.entries(meta)
        .filter(([k]) => k !== 'product_id')
        .map(([k, v]) => {
          const label = product?.customizations?.find((o) => o.id === k)?.label || k;
          return `<div style="color:#b45309"><strong>${esc(label)}:</strong> ${esc(String(v))}</div>`;
        })
        .join('');

      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee">
            <strong>${esc(item.description ?? product?.name ?? 'Produto')}</strong> × ${item.quantity ?? 1}
            ${customs ? `<div style="margin-top:4px;font-size:14px">${customs}</div>` : ''}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">
            ${formatEUR((item.amount_total ?? 0) / 100)}
          </td>
        </tr>`;
    })
    .join('');
}

// Email de agradecimento AO CLIENTE (no idioma escolhido no site, via metadata).
// Só precisa da RESEND_API_KEY e do email do cliente (independente do email de
// aviso ao vendedor). Para boa entrega, verificar o domínio sparklab3d.pt no Resend.
async function sendCustomerEmail(session: Stripe.Checkout.Session) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = session.customer_details?.email;
  const from = process.env.ORDER_EMAIL_FROM || 'SparkLab <onboarding@resend.dev>';
  if (!apiKey || !to) return;

  const lang: 'pt' | 'en' = session.metadata?.lang === 'en' ? 'en' : 'pt';
  const total = typeof session.amount_total === 'number' ? session.amount_total / 100 : 0;
  const firstName = session.customer_details?.name?.trim().split(/\s+/)[0];
  const rows = orderRowsHtml(session);
  const wa = 'https://wa.me/351916853802';

  const T = {
    pt: {
      subject: 'Obrigado pela tua encomenda! 🧡 — SparkLab',
      hi: `Olá${firstName ? ' ' + esc(firstName) : ''}, obrigado! 🧡`,
      intro: 'Recebemos a tua encomenda e o pagamento está confirmado. Aqui fica o resumo:',
      totalLabel: 'Total pago',
      nextTitle: 'O que acontece a seguir',
      steps: [
        'Começamos a produzir a(s) tua(s) peça(s) nas nossas Bambu Lab P1S.',
        'Avisamos-te no WhatsApp com o prazo e o número de seguimento.',
        'Enviamos via CTT registado para a tua morada, com tracking.',
      ],
      waLine: 'Alguma dúvida sobre a tua encomenda?',
      waBtn: 'Falar no WhatsApp',
      foot: 'SparkLab · Impressão 3D sob encomenda, em Portugal',
    },
    en: {
      subject: 'Thank you for your order! 🧡 — SparkLab',
      hi: `Hi${firstName ? ' ' + esc(firstName) : ''}, thank you! 🧡`,
      intro: 'We received your order and your payment is confirmed. Here is the summary:',
      totalLabel: 'Total paid',
      nextTitle: 'What happens next',
      steps: [
        'We start producing your piece(s) on our Bambu Lab P1S printers.',
        'We keep you posted on WhatsApp with the timeline and tracking number.',
        'We ship via registered CTT mail to your address, with tracking.',
      ],
      waLine: 'Any questions about your order?',
      waBtn: 'Chat on WhatsApp',
      foot: 'SparkLab · Made-to-order 3D printing, in Portugal',
    },
  }[lang];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1c1917">
    <h2 style="color:#ea580c;margin:0 0 6px">${T.hi}</h2>
    <p style="color:#57534e;margin:0 0 18px">${T.intro}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:6px">${rows}</table>
    <p style="text-align:right;margin:0 0 24px;font-size:16px"><strong>${T.totalLabel}: ${formatEUR(total)}</strong></p>

    <h3 style="margin:0 0 8px">${T.nextTitle}</h3>
    <ol style="margin:0 0 24px;padding-left:20px;color:#44403c;line-height:1.7">
      ${T.steps.map((s) => `<li>${esc(s)}</li>`).join('')}
    </ol>

    <p style="margin:0 0 10px;color:#57534e">${T.waLine}</p>
    <a href="${wa}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:11px 22px;border-radius:999px">${T.waBtn}</a>

    <p style="color:#a8a29e;font-size:12px;margin-top:30px">${T.foot}</p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: T.subject,
      html,
      reply_to: process.env.ORDER_EMAIL_TO || undefined, // respostas do cliente vão para nós
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[stripe-webhook] Resend (cliente) falhou:', res.status, body);
  }
}

// Escapa HTML para evitar problemas com nomes que tenham < > &.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
