/**
 * Registry dos guias (/guias). Cada artigo vive em app/guias/<slug>/page.mdx;
 * esta lista alimenta a página de listagem, o sitemap e os links internos.
 * Ao publicar um guia novo: adicionar aqui + criar o page.mdx correspondente.
 */

export type Guia = {
  slug: string;
  title: string;
  description: string;
  /** ISO yyyy-mm-dd */
  datePublished: string;
  dateModified?: string;
  /** tempo de leitura estimado, em minutos */
  minutes: number;
  emoji: string;
  image?: string;
};

export const GUIAS: Guia[] = [
  {
    slug: 'quanto-custa-impressao-3d-portugal',
    title: 'Quanto custa uma impressão 3D em Portugal?',
    description:
      'O que determina o preço de uma peça impressa em 3D — material, tempo de máquina, acabamento e modelação — com exemplos reais de preços do nosso catálogo.',
    datePublished: '2026-07-01',
    minutes: 6,
    emoji: '💶',
    image: '/images/3d_cost_guide.webp',
  },
  {
    slug: 'pla-petg-abs-asa-tpu-pc-qual-escolher',
    title: 'PLA, PETG, ABS, ASA, TPU ou PC: que material escolher?',
    description:
      'Guia prático dos 6 materiais com que imprimimos: para que serve cada um, resistência, comportamento ao sol e ao calor, e qual escolher para a tua peça.',
    datePublished: '2026-07-01',
    minutes: 7,
    emoji: '🧵',
    image: '/images/3d_materials_guide.webp',
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}

/** Guias ordenados do mais recente para o mais antigo. */
export function guiasRecentes(limit?: number): Guia[] {
  const sorted = [...GUIAS].sort((a, b) =>
    (b.dateModified ?? b.datePublished).localeCompare(a.dateModified ?? a.datePublished)
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Metadata completa de um artigo a partir do registry — título, descrição,
 * canonical e imagem própria na partilha (WhatsApp/Instagram/Twitter).
 * Uso no page.mdx:  export const metadata = guiaMetadata('slug');
 * (URLs relativos resolvem contra o metadataBase definido no root layout.)
 */
export function guiaMetadata(slug: string) {
  const g = getGuiaBySlug(slug);
  if (!g) return { title: 'Guia não encontrado' };

  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guias/${g.slug}` },
    openGraph: {
      type: 'article' as const,
      title: `${g.title} · SparkLab`,
      description: g.description,
      url: `/guias/${g.slug}`,
      publishedTime: g.datePublished,
      modifiedTime: g.dateModified ?? g.datePublished,
      ...(g.image ? { images: [{ url: g.image, alt: g.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: g.title,
      description: g.description,
      ...(g.image ? { images: [g.image] } : {}),
    },
  };
}
