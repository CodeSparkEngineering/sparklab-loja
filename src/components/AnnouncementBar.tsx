'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageContext';
import { NATAL, faseNatal } from '@/data/natal';
import { useAgora } from '@/components/natal/useAgora';

const destaque = 'font-bold underline decoration-orange-300 underline-offset-2';

const L = {
  pt: {
    ship: <>🚚 <span className={destaque}>Envio Grátis</span> a partir de 40€!</>,
    bulk: <>📦 <span className={destaque}>Atacado: −15%</span> em 10+ unidades da mesma peça!</>,
    natal: (data: string) => <>🎄 <span className={destaque}>Prendas de Natal</span>: encomenda até {data}</>,
    natalTarde: <>🎄 <span className={destaque}>Natal</span>: ainda vais a tempo? Fala connosco</>,
  },
  en: {
    ship: <>🚚 <span className={destaque}>Free Shipping</span> on orders over €40!</>,
    bulk: <>📦 <span className={destaque}>Wholesale: −15%</span> on 10+ units of the same piece!</>,
    natal: (data: string) => <>🎄 <span className={destaque}>Christmas gifts</span>: order by {data}</>,
    natalTarde: <>🎄 <span className={destaque}>Christmas</span>: still in time? Message us</>,
  },
} as const;

export default function AnnouncementBar() {
  const { lang } = useLang();
  const t = L[lang];

  // Durante a campanha de Natal a barra veste-se de vermelho/verde e o aviso
  // de atacado dá lugar ao prazo de encomenda; depois volta sozinha ao normal.
  const agora = useAgora();
  const fase = agora ? faseNatal(agora) : 'a-tempo';

  if (fase === 'terminada') {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-medium py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 tracking-wide">
        <span>{t.ship}</span>
        <span className="hidden sm:inline opacity-50">|</span>
        <span>{t.bulk}</span>
      </div>
    );
  }

  const dataLimite = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pt-PT', {
    day: 'numeric',
    month: 'long',
  }).format(NATAL.ultimoDia);

  return (
    <>
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white text-xs sm:text-sm font-medium py-2 px-4 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 tracking-wide">
        <Link href="/#natal" className="hover:opacity-90">
          {fase === 'a-tempo' ? t.natal(dataLimite) : t.natalTarde}
        </Link>
        <span className="hidden sm:inline opacity-50">|</span>
        <span>{t.ship}</span>
      </div>
      <div className="natal-doce" aria-hidden="true" />
    </>
  );
}
