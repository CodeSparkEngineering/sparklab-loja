'use client';

import { useLang } from '@/i18n/LanguageContext';

type Fonte = { label: string; url?: string };

/**
 * Lista de fontes no fim do artigo — sempre que se citam números de terceiros
 * (preços de mercado, quotas, projeções), a fonte deve aparecer. Reforça a
 * credibilidade (E-E-A-T) e a citabilidade por motores de resposta.
 *
 * Coloca-se DEPOIS dos dois <GuiaLang> (o cabeçalho troca PT/EN sozinho):
 *   <GuiaFontes pt={[{ label: '…', url: '…' }]} en={[…]} />
 *
 * Números próprios da SparkLab (preços do catálogo, experiência de oficina) são
 * dados de primeira mão e NÃO precisam de fonte externa.
 */
export function GuiaFontes({ pt, en }: { pt: Fonte[]; en: Fonte[] }) {
  const { lang } = useLang();
  const heading = lang === 'en' ? 'Sources' : 'Fontes';
  const items = lang === 'en' && en.length ? en : pt;

  return (
    <section
      className="mt-12 border-t border-stone-200 dark:border-white/10 pt-6"
      aria-label={heading}
    >
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        {heading}
      </h2>
      <ul className="space-y-1.5 text-sm text-stone-500 dark:text-stone-400">
        {items.map((f, i) => (
          <li key={i}>
            {f.url ? (
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline underline-offset-2 hover:text-orange-600 dark:hover:text-orange-400"
              >
                {f.label}
              </a>
            ) : (
              f.label
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
