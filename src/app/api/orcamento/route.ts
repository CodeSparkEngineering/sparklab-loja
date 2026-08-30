import { NextResponse, type NextRequest } from 'next/server';
import { SITE_URL } from '@/data/site';
import { esc, emailShell, sendViaResend } from '@/lib/email';

export const runtime = 'nodejs';

/**
 * Captura de leads do formulário de orçamento.
 *
 * O fluxo principal continua a ser o WhatsApp — mas ele depende de o cliente
 * completar o salto e carregar em "enviar" lá. No desktop sem WhatsApp Web
 * autenticado, muita gente desiste no QR code e o pedido evaporava sem
 * deixarmos rasto (com o ficheiro STL já no nosso Blob, mas sem contacto).
 *
 * Esta rota fecha esse buraco: o formulário envia-nos aqui uma cópia do
 * pedido no momento do submit (fire-and-forget, não trava o WhatsApp), e nós
 * recebemos o lead por email via Resend — chegue o cliente ao WhatsApp ou não.
 *
 * Reutiliza RESEND_API_KEY + ORDER_EMAIL_TO, já configurados para o webhook.
 */

// Limites defensivos — o formulário real nunca chega perto disto.
const MAX = { name: 100, phone: 40, material: 60, prazo: 30, desc: 1500 } as const;

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Link wa.me para responder ao cliente com um toque (null se irreconhecível). */
function waLinkFor(phone: string): string | null {
  let digits = phone.replace(/\D/g, '').replace(/^00/, '');
  // Número nacional (9 dígitos, começa por 9 ou 2) sem indicativo → +351.
  if (digits.length === 9 && /^[92]/.test(digits)) digits = '351' + digits;
  return digits.length >= 9 && digits.length <= 15 ? `https://wa.me/${digits}` : null;
}

export async function POST(request: NextRequest) {
  // Mesma validação de origem do checkout: só os nossos domínios.
  const ALLOWED_ORIGINS = new Set([
    SITE_URL,
    'https://sparklab3d.pt',
    'https://sparklab-loja.vercel.app',
    ...(process.env.NODE_ENV !== 'production' ? [new URL(request.url).origin] : []),
  ]);
  const origin = request.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Origem não permitida.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corpo inválido.' }, { status: 400 });
  }

  // Honeypot: campo invisível para humanos. Preenchido = bot — respondemos
  // "ok" na mesma para não lhe dar sinal de que foi apanhado.
  if (clean(body.empresa, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  if (!name || !phone) {
    return NextResponse.json({ error: 'Nome e WhatsApp em falta.' }, { status: 400 });
  }

  const material = clean(body.material, MAX.material);
  const prazo = clean(body.prazo, MAX.prazo);
  const desc = clean(body.desc, MAX.desc);
  const qty = Math.max(1, Math.min(9999, Math.floor(Number(body.qty) || 1)));
  const lang = body.lang === 'en' ? 'en' : 'pt';

  // Só aceitamos links do NOSSO Blob store — impede que alguém injete um URL
  // malicioso no email que vamos abrir.
  let fileUrl: string | null = null;
  const rawFile = clean(body.fileUrl, 500);
  if (rawFile) {
    try {
      const u = new URL(rawFile);
      if (u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com')) {
        fileUrl = u.href;
      }
    } catch {
      // URL inválido — segue sem ficheiro
    }
  }

  const to = process.env.ORDER_EMAIL_TO;
  if (!to) {
    console.error('[orcamento] ORDER_EMAIL_TO em falta — lead NÃO enviado:', name, phone);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const wa = waLinkFor(phone);
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px 8px 0;color:#78716c;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#1c1917;font-weight:bold">${value}</td>
    </tr>`;

  const corpo = `
    <h2 style="color:#ea580c;margin:0 0 4px;font-size:20px">📐 Novo pedido de orçamento</h2>
    <p style="color:#57534e;margin:0 0 18px">Submetido no formulário do site${lang === 'en' ? ' (em inglês)' : ''}.</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:18px">
      ${row('Nome', esc(name))}
      ${row('WhatsApp', esc(phone))}
      ${row('Material', esc(material || '—'))}
      ${row('Quantidade', String(qty))}
      ${row('Prazo', esc(prazo || '—'))}
      ${row('Descrição', desc ? esc(desc).replace(/\n/g, '<br/>') : '<em style="font-weight:normal">—</em>')}
      ${row('Ficheiro', fileUrl
        ? `<a href="${fileUrl}" style="color:#ea580c">${esc(fileUrl.split('/').pop() ?? 'descarregar')}</a>`
        : '<em style="font-weight:normal">sem ficheiro — precisa de modelação</em>')}
    </table>

    ${wa ? `
    <a href="${wa}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:bold;padding:11px 22px;border-radius:999px">Responder no WhatsApp</a>
    ` : `<p style="color:#b45309;margin:0">⚠ Número não reconhecido — responder manualmente: ${esc(phone)}</p>`}

    <p style="color:#a8a29e;font-size:12px;margin:26px 0 0">
      Lead automático do formulário — o cliente pode também aparecer no WhatsApp
      com a mesma mensagem (é o fluxo normal; isto é a rede de segurança).
    </p>`;

  const enviado = await sendViaResend({
    to,
    subject: `📐 Orçamento — ${name}${fileUrl ? ' (com ficheiro)' : ''}`,
    html: emailShell(corpo, 'pt'),
  });

  return NextResponse.json({ ok: enviado }, { status: enviado ? 200 : 500 });
}
