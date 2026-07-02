import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIAS } from '@/data/guias';
import { SITE_URL } from '@/data/site';

export const metadata: Metadata = {
  title: 'Guias de impressão 3D',
  description:
    'Guias práticos sobre impressão 3D em Portugal: quanto custa, que materiais escolher, que ficheiros enviar e muito mais — escritos por quem imprime todos os dias.',
  alternates: { canonical: '/guias' },
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Guias de impressão 3D — SparkLab',
  url: `${SITE_URL}/guias`,
  inLanguage: 'pt-PT',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  hasPart: GUIAS.map((g) => ({
    '@type': 'Article',
    headline: g.title,
    url: `${SITE_URL}/guias/${g.slug}`,
    datePublished: g.datePublished,
  })),
};

function formatDatePt(iso: string): string {
  return new Intl.DateTimeFormat('pt-PT', { dateStyle: 'long' }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}

export default function GuiasPage() {
  return (
    <main className="min-h-screen pt-16 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema).replace(/</g, '\\u003c') }}
      />
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>
            da nossa oficina para ti
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
            Guias de impressão 3D
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
            Respostas honestas às perguntas que nos fazem todos os dias no WhatsApp —
            escritas por quem opera as impressoras, não por marketing.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {GUIAS.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="group card p-8 flex flex-col sm:flex-row gap-5 items-start hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors"
            >
              <span className="text-4xl shrink-0" aria-hidden="true">{g.emoji}</span>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">
                  {g.title}
                </h2>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                  {g.description}
                </p>
                <span className="text-sm text-stone-500 dark:text-stone-500">
                  {formatDatePt(g.dateModified ?? g.datePublished)} · {g.minutes} min de leitura
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
