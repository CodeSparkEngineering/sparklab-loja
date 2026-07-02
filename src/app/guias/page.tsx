import type { Metadata } from 'next';
import { GUIAS } from '@/data/guias';
import { SITE_URL } from '@/data/site';
import GuiasListagem from '@/components/guias/GuiasListagem';

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

export default function GuiasPage() {
  return (
    <main className="min-h-screen pt-16 pb-24 bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema).replace(/</g, '\\u003c') }}
      />
      <GuiasListagem />
    </main>
  );
}
