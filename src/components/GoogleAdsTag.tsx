'use client';

import Script from 'next/script';

/**
 * Tag global do Google Ads (gtag.js) — medição de conversões das campanhas.
 *
 * O ID de conversão (AW-…) e o rótulo são PÚBLICOS por natureza (viajam para
 * o cliente em cada página), por isso vêm embutidos como default — à
 * semelhança do ID do GA4 — e podem ser trocados por NEXT_PUBLIC_GADS_ID /
 * NEXT_PUBLIC_GADS_QUOTE_LABEL sem mexer no código. Só corre em produção,
 * para não sujar os dados nem disparar conversões falsas em testes locais.
 *
 * A conversão de "pedido de orçamento" é registada AQUI, de forma global,
 * por delegação de eventos: uma única conversão por visita, disparada quando
 * o visitante submete o formulário #quote-form OU clica em qualquer link de
 * WhatsApp (wa.me / api.whatsapp.com) — o botão flutuante, o rodapé, as
 * páginas de produto, etc. Assim medimos todos os contactos de lead, não só
 * os que passam pela página /pedido-recebido.
 */

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? 'AW-18302291386';
const QUOTE_LABEL = process.env.NEXT_PUBLIC_GADS_QUOTE_LABEL ?? 'ax1hCNekmNkcELqbm5dE';

export default function GoogleAdsTag() {
  if (!GADS_ID || process.env.NODE_ENV !== 'production') return null;

  const sendTo = QUOTE_LABEL ? `${GADS_ID}/${QUOTE_LABEL}` : '';

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GADS_ID}');
${sendTo ? `(function(){
  var contou = false;
  function registarLead(){
    if (contou) return;            // 1 conversao por visita
    contou = true;
    gtag('event','conversion',{ send_to:'${sendTo}', value:1.0, currency:'EUR' });
  }
  document.addEventListener('submit', function(e){
    if (e.target && e.target.id === 'quote-form') registarLead();
  }, true);
  document.addEventListener('click', function(e){
    var link = e.target && e.target.closest
      ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]')
      : null;
    if (link) registarLead();
  }, true);
})();` : ''}`}
      </Script>
    </>
  );
}
