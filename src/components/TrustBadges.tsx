'use client';

import { ShieldCheck, Printer } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { StripeMark, VisaMark, MastercardMark, BambuMark } from '@/components/brand-marks';

const L = {
  pt: {
    aria: 'Confiança e qualidade',
    secure: 'Pagamento 100% seguro',
    secureSub: 'Processado por',
    quality: 'Máquinas e filamento profissionais',
    qualitySub: 'Impresso com equipamento oficial',
  },
  en: {
    aria: 'Trust and quality',
    secure: '100% secure payment',
    secureSub: 'Processed by',
    quality: 'Professional printers and filament',
    qualitySub: 'Printed with official equipment',
  },
} as const;

export default function TrustBadges() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <section
      aria-label={t.aria}
      className="border-t border-stone-200/70 dark:border-white/10"
    >
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14">
        {/* Pagamento seguro — Stripe */}
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 shrink-0 text-green-600 dark:text-green-500" aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">{t.secure}</span>
            <span className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              {t.secureSub} <StripeMark />
              <span className="mx-0.5 h-3 w-px bg-stone-300 dark:bg-white/15" aria-hidden="true" />
              <VisaMark />
              <MastercardMark />
            </span>
          </div>
        </div>

        <div className="hidden sm:block h-10 w-px bg-stone-200 dark:bg-white/10" aria-hidden="true" />

        {/* Equipamento — Bambu Lab */}
        <div className="flex items-center gap-3">
          <Printer className="h-8 w-8 shrink-0 text-stone-600 dark:text-stone-300" aria-hidden="true" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">{t.quality}</span>
            <span className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              {t.qualitySub} <BambuMark />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
