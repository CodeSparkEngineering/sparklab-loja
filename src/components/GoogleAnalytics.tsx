'use client';

import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js) — medição de audiência.
 *
 * O ID de medição (G-…) é público por natureza (fica no cliente), por isso
 * vem embutido como default e pode ser trocado por NEXT_PUBLIC_GA_ID sem
 * mexer no código. Só carrega em produção (não polui os dados com tráfego
 * de desenvolvimento), à semelhança do Vercel Analytics.
 *
 * ATENÇÃO (RGPD/ePrivacy): o GA4 usa cookies (_ga). Em Portugal/UE, isso
 * exige consentimento prévio — idealmente com um banner de cookies +
 * Google Consent Mode v2. Ver GoogleAdsTag para a tag de conversão do Ads.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-3RE0VFNPDJ';

export default function GoogleAnalytics() {
  if (!GA_ID || process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
