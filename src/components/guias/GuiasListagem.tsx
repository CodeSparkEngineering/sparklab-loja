'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GUIAS, gTitle, gDesc } from '@/data/guias';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'da nossa oficina para ti',
    title: 'Guias de impressão 3D',
    intro:
      'Respostas honestas às perguntas que nos fazem todos os dias no WhatsApp — escritas por quem opera as impressoras, não por marketing.',
    minutes: (n: number) => `${n} min de leitura`,
    dateLocale: 'pt-PT',
  },
  en: {
    eyebrow: 'from our workshop to you',
    title: '3D printing guides',
    intro:
      'Honest answers to the questions we get every day on WhatsApp — written by the people who run the printers, not by marketing.',
    minutes: (n: number) => `${n} min read`,
    dateLocale: 'en-GB',
  },
} as const;

export default function GuiasListagem() {
  const { lang } = useLang();
  const t = L[lang];

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(t.dateLocale, { dateStyle: 'long' }).format(
      new Date(`${iso}T12:00:00Z`)
    );

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="mb-12">
        <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>
          {t.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          {t.intro}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {GUIAS.map((g) => (
          <Link
            key={g.slug}
            href={`/guias/${g.slug}`}
            className="group card p-8 flex flex-col sm:flex-row gap-6 items-start hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors"
          >
            {g.image ? (
              <div className="shrink-0 relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                <Image
                  src={g.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
            ) : (
              <span className="text-4xl shrink-0" aria-hidden="true">{g.emoji}</span>
            )}
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">
                {gTitle(g, lang)}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                {gDesc(g, lang)}
              </p>
              <span className="text-sm text-stone-500 dark:text-stone-500">
                {formatDate(g.dateModified ?? g.datePublished)} · {t.minutes(g.minutes)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
