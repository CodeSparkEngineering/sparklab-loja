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
 *   URL: https://sparklab-loja.vercel.app/api/stripe-webhook
 *   Evento: checkout.session.completed
 *   Copia o "Signing secret" para STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!key || !webhookSecret) {
    // Ainda não configurado — responde 200 para a Stripe não ficar a repetir.
    console.warn('[stripe-webhook] STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET em falta.');
    return NextResponse.json({ received: true, configured: false });
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

    await sendOrderEmail(session);
  } catch (err) {
    console.error('[stripe-webhook] erro ao processar encomenda:', err);
    // Devolve 200 na mesma: a venda já aconteceu, não queremos repetições infinitas.
  }

  return NextResponse.json({ received: true });
}

async function sendOrderEmail(session: Stripe.Checkout.Session) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_EMAIL_FROM || 'SparkLab <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.warn('[stripe-webhook] RESEND_API_KEY ou ORDER_EMAIL_TO em falta — email não enviado.');
    return;
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

  const rows = (session.line_items?.data ?? [])
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
  }
}

// Escapa HTML para evitar problemas com nomes que tenham < > &.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
