'use client';

import Link from 'next/link';
import Image from 'next/image';
import { guiasRecentes, gTitle, gDesc } from '@/data/guias';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'aprende connosco',
    desc: 'Respostas honestas às perguntas que nos fazem todos os dias — escritas por quem opera as impressoras.',
    minutes: (n: number) => `${n} min de leitura`,
    all: 'Ver todos os guias',
  },
  en: {
    eyebrow: 'learn with us',
    desc: 'Honest answers to the questions we get every day — written by the people who run the printers.',
    minutes: (n: number) => `${n} min read`,
    all: 'See all guides',
  },
} as const;

export default function GuiasTeaser() {
  const { lang } = useLang();
  const t = L[lang];
  const guias = guiasRecentes(2);

  if (guias.length === 0) return null;

  return (
    <section className="section" id="guias">
      <div className="container">
        <div className="section__head section__head--row reveal">
          <div>
            <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>{t.eyebrow}</span>
            {lang === 'pt' ? (
              <h2 className="h2">Guias de <span className="hand-underline">impressão 3D</span></h2>
            ) : (
              <h2 className="h2">3D printing <span className="hand-underline">guides</span></h2>
            )}
          </div>
          <p className="section__desc">{t.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2 reveal">
          {guias.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="group card p-6 flex gap-5 items-center hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors"
            >
              {g.image ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
                  <Image
                    src={g.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>
              ) : (
                <span className="text-4xl shrink-0" aria-hidden="true">{g.emoji}</span>
              )}
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-1">
                  {gTitle(g, lang)}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-2 line-clamp-2">
                  {gDesc(g, lang)}
                </p>
                <span className="text-sm text-stone-500 dark:text-stone-500">{t.minutes(g.minutes)}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center reveal">
          <Link href="/guias" className="btn btn--ghost">
            {t.all}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
