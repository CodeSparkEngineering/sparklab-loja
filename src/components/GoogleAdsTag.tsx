'use client';

import Script from 'next/script';

/**
 * Tag global do Google Ads (gtag.js) — medição de conversões das campanhas.
 *
 * Totalmente controlada por variáveis de ambiente: sem NEXT_PUBLIC_GADS_ID
 * definido, não renderiza NADA (zero scripts, zero cookies). Para ativar,
 * basta definir a variável na Vercel e fazer redeploy — sem mexer no código.
 *
 * A conversão de "pedido de orçamento" é disparada na página /pedido-recebido
 * (ver PedidoRecebidoCard), via fireQuoteConversion().
 */

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID; // ex.: AW-123456789

export default function GoogleAdsTag() {
  if (!GADS_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GADS_ID}');`}
      </Script>
    </>
  );
}

/**
 * Dispara a conversão de lead (pedido de orçamento) no Google Ads.
 * Precisa de NEXT_PUBLIC_GADS_ID e NEXT_PUBLIC_GADS_QUOTE_LABEL definidos;
 * caso contrário é um no-op silencioso (a página funciona na mesma).
 */
export function fireQuoteConversion(): void {
  const id = process.env.NEXT_PUBLIC_GADS_ID;
  const label = process.env.NEXT_PUBLIC_GADS_QUOTE_LABEL;
  if (!id || !label) return;

  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', 'conversion', { send_to: `${id}/${label}` });
}
