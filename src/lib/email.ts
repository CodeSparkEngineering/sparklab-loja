import { SITE_URL, CONTACT_EMAIL } from '@/data/site';

/**
 * Moldura de marca dos emails transacionais + envio via Resend.
 * Partilhado pelo webhook da Stripe (encomendas) e pela rota /api/orcamento
 * (leads do formulário) — um só sítio para mudar o layout dos emails.
 *
 * Email não é web: Outlook e Gmail deitam fora flex, grid e CSS externo. Por
 * isso é tudo tabelas + estilos inline, larguras em px e URLs absolutos — o
 * logótipo tem de ser https://…, um caminho relativo não carrega em lado
 * nenhum. Fundo claro de propósito: fundos escuros são invertidos por vários
 * clientes e o resultado é imprevisível.
 */

const INSTAGRAM_URL = 'https://www.instagram.com/sparklabs.3d';
const WHATSAPP_URL = 'https://wa.me/351916853802';

/** Escapa HTML para evitar problemas com nomes que tenham < > &. */
export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Topo com o logótipo, clicável para o site. */
function emailHeader(): string {
  return `
  <tr>
    <td align="center" style="padding:28px 24px 20px;border-bottom:1px solid #e7e5e4">
      <a href="${SITE_URL}" style="text-decoration:none">
        <img src="${SITE_URL}/logo.jpg" width="120" height="120" alt="SparkLab"
             style="display:block;border:0;border-radius:16px" />
      </a>
    </td>
  </tr>`;
}

/** Rodapé com links do site, redes e contacto. */
function emailFooter(lang: 'pt' | 'en'): string {
  const t =
    lang === 'en'
      ? { shop: 'Shop', guides: 'Guides', quote: 'Get a quote',
          tag: 'Made-to-order 3D printing, in Portugal',
          addr: 'SparkLab · Sangalhos, Aveiro · Portugal' }
      : { shop: 'Catálogo', guides: 'Guias', quote: 'Pedir orçamento',
          tag: 'Impressão 3D sob encomenda, em Portugal',
          addr: 'SparkLab · Sangalhos, Aveiro · Portugal' };

  const link = (href: string, label: string) =>
    `<a href="${href}" style="color:#57534e;text-decoration:none;font-size:13px">${label}</a>`;

  return `
  <tr>
    <td style="padding:26px 24px 30px;border-top:1px solid #e7e5e4">
      <p style="margin:0 0 12px;text-align:center">
        ${link(`${SITE_URL}/#catalogo`, t.shop)}
        <span style="color:#d6d3d1"> &nbsp;·&nbsp; </span>
        ${link(`${SITE_URL}/guias`, t.guides)}
        <span style="color:#d6d3d1"> &nbsp;·&nbsp; </span>
        ${link(`${SITE_URL}/#orcamento`, t.quote)}
      </p>
      <p style="margin:0 0 14px;text-align:center">
        ${link(WHATSAPP_URL, 'WhatsApp')}
        <span style="color:#d6d3d1"> &nbsp;·&nbsp; </span>
        ${link(INSTAGRAM_URL, 'Instagram')}
        <span style="color:#d6d3d1"> &nbsp;·&nbsp; </span>
        ${link(`mailto:${CONTACT_EMAIL}`, CONTACT_EMAIL)}
      </p>
      <p style="margin:0;text-align:center;color:#a8a29e;font-size:12px;line-height:1.6">
        <a href="${SITE_URL}" style="color:#ea580c;text-decoration:none;font-weight:bold">sparklab3d.pt</a><br />
        ${t.tag}<br />${t.addr}
      </p>
    </td>
  </tr>`;
}

/** Envolve o conteúdo na moldura da marca. */
export function emailShell(conteudo: string, lang: 'pt' | 'en'): string {
  return `
  <div style="background:#faf9f6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"
           style="width:100%;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:14px;overflow:hidden">
      ${emailHeader()}
      <tr><td style="padding:28px 24px 8px;color:#1c1917">${conteudo}</td></tr>
      ${emailFooter(lang)}
    </table>
  </div>`;
}

/**
 * Envia um email pela API do Resend. Devolve `true` só quando saiu mesmo;
 * falhas ficam no log do servidor (o chamador decide se são fatais).
 */
export async function sendViaResend(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM || 'SparkLab <onboarding@resend.dev>';
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY em falta — email não enviado:', opts.subject);
    return false;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      reply_to: opts.replyTo || undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[email] Resend falhou:', res.status, body);
    return false;
  }
  return true;
}
