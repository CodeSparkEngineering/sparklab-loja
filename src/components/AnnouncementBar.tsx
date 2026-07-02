'use client';

import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    ship: <>🚚 <span className="font-bold underline decoration-orange-300 underline-offset-2">Envio Grátis</span> a partir de 40€!</>,
    bulk: <>📦 Preços especiais de <span className="font-bold underline decoration-orange-300 underline-offset-2">Atacado</span> a partir de 10 peças!</>,
  },
  en: {
    ship: <>🚚 <span className="font-bold underline decoration-orange-300 underline-offset-2">Free Shipping</span> on orders over €40!</>,
    bulk: <>📦 Special <span className="font-bold underline decoration-orange-300 underline-offset-2">Wholesale</span> pricing from 10 pieces!</>,
  },
} as const;

export default function AnnouncementBar() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-medium py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 tracking-wide">
      <span>{t.ship}</span>
      <span className="hidden sm:inline opacity-50">|</span>
      <span>{t.bulk}</span>
    </div>
  );
}
