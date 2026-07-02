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
  },
  {
    slug: 'pla-petg-abs-asa-tpu-pc-qual-escolher',
    title: 'PLA, PETG, ABS, ASA, TPU ou PC: que material escolher?',
    description:
      'Guia prático dos 6 materiais com que imprimimos: para que serve cada um, resistência, comportamento ao sol e ao calor, e qual escolher para a tua peça.',
    datePublished: '2026-07-01',
    minutes: 7,
    emoji: '🧵',
  },
];

export function getGuiaBySlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
