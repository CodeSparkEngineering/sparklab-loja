'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageContext';
import QuoteForm from '@/components/QuoteForm';
import { StripeMark, GoogleMark } from '@/components/brand-marks';
import { GOOGLE_PROFILE_URL } from '@/data/site';

const L = {
  pt: {
    // Título literal que repete a pesquisa do anúncio (intent match).
    h1: 'Orçamento de impressão 3D em Portugal',
    sub: 'Envia o teu ficheiro 3D — ou só a ideia — e recebe o preço e o prazo, sem compromisso.',
    reply: 'Resposta em até 2 horas úteis no WhatsApp',
    tRating: '5,0 no Google',
    tPieces: '+150 peças criadas',
    tShip: 'Envio CTT registado',
    tPay: 'Pagamento seguro',
    home: 'Ver o catálogo',
  },
  en: {
    h1: '3D printing quote in Portugal',
    sub: 'Send us your 3D file — or just the idea — and get the price and timeline, no strings attached.',
    reply: 'We reply within 2 business hours on WhatsApp',
    tRating: '5.0 on Google',
    tPieces: '+150 pieces made',
    tShip: 'Registered CTT shipping',
    tPay: 'Secure payment',
    home: 'View the catalog',
  },
} as const;

export default function OrcamentoLanding() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-28 pb-20">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Título literal (intent match) + subtítulo + promessa */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t.h1}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            {t.sub}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-500/15 px-4 py-1.5 text-sm font-semibold text-green-700 dark:text-green-400">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8z" /></svg>
            {t.reply}
          </p>
        </div>

        {/* Formulário logo no primeiro ecrã */}
        <QuoteForm aside={false} />

        {/* Selos de confiança por baixo */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-stone-600 dark:text-stone-300">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium hover:text-orange-600 dark:hover:text-orange-400"
          >
            <GoogleMark size={15} />
            <span className="text-amber-500">★</span> {t.tRating}
          </a>
          <span className="inline-flex items-center gap-1.5 font-medium">🖨️ {t.tPieces}</span>
          <span className="inline-flex items-center gap-1.5 font-medium">🚚 {t.tShip}</span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            {t.tPay} <StripeMark />
          </span>
        </div>

        <div className="mt-8 text-center">
          <Link href="/#catalogo" className="text-sm text-stone-500 dark:text-stone-400 underline underline-offset-2 hover:text-orange-600 dark:hover:text-orange-400">
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
