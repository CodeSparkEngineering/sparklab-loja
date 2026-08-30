'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Banner de consentimento de cookies (RGPD/ePrivacy) com Google Consent
 * Mode v2. O consent default ("denied") é definido no layout ANTES do
 * gtag.js; aqui apenas: (1) mostramos o banner se ainda não houve escolha,
 * (2) ao aceitar/recusar, gravamos e chamamos gtag('consent','update').
 *
 * Guarda a escolha em localStorage ('sparklab-consent' = granted|denied) —
 * numa visita futura o layout já arranca com o consentimento certo e o
 * banner não reaparece.
 */
const STORAGE_KEY = 'sparklab-consent';

const L = {
  pt: {
    aria: 'Aviso de cookies',
    text: 'Usamos cookies para analisar o tráfego e melhorar o site.',
    // Só em ecrãs largos — no mobile o banner tapava o formulário da landing
    // dos anúncios; o detalhe fica a um toque no "Saber mais".
    textExtra: 'Os cookies de análise só são ativados com o teu consentimento.',
    accept: 'Aceitar',
    reject: 'Recusar',
    privacy: 'Saber mais',
  },
  en: {
    aria: 'Cookie notice',
    text: 'We use cookies to analyze traffic and improve the site.',
    textExtra: 'Analytics cookies are only enabled with your consent.',
    accept: 'Accept',
    reject: 'Decline',
    privacy: 'Learn more',
  },
} as const;

export default function CookieBanner() {
  const { lang } = useLang();
  const t = L[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Só mostra se ainda não houve escolha. Leitura única na montagem.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      /* localStorage indisponível (modo privado estrito) — não mostra */
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      /* ignora */
    }
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
    });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label={t.aria}
      className="fixed inset-x-2 bottom-2 z-[120] mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-stone-900/95 sm:inset-x-3 sm:bottom-3 sm:flex sm:items-center sm:gap-4 sm:p-5"
    >
      <p className="m-0 flex-1 text-[13px] leading-snug text-stone-600 dark:text-stone-300 sm:text-sm sm:leading-relaxed">
        🍪 {t.text} <span className="hidden sm:inline">{t.textExtra}</span>{' '}
        <Link href="/privacidade" className="underline underline-offset-2 hover:text-orange-600 dark:hover:text-orange-400">
          {t.privacy}
        </Link>
      </p>
      <div className="mt-2.5 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" onClick={() => decide(false)} className="btn btn--ghost btn--sm flex-1 sm:flex-initial">
          {t.reject}
        </button>
        <button type="button" onClick={() => decide(true)} className="btn btn--primary btn--sm flex-1 sm:flex-initial">
          {t.accept}
        </button>
      </div>
    </div>
  );
}
