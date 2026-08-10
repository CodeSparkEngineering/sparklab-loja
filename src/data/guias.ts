/**
 * Registry dos guias (/guias). Cada artigo vive em app/guias/<slug>/page.mdx;
 * esta lista alimenta a página de listagem, o sitemap e os links internos.
 * Ao publicar um guia novo: adicionar aqui + criar o page.mdx correspondente.
 */

export type Guia = {
  slug: string;
  title: string;
  /** Tradução inglesa do título (toggle PT/EN do site). */
  titleEn?: string;
  description: string;
  /** Tradução inglesa da descrição (toggle PT/EN do site). */
  descriptionEn?: string;
  /** ISO yyyy-mm-dd */
  datePublished: string;
  dateModified?: string;
  /** tempo de leitura estimado, em minutos */
  minutes: number;
  emoji: string;
  image?: string;
};

export function gTitle(g: Guia, lang: 'pt' | 'en'): string {
  return lang === 'en' && g.titleEn ? g.titleEn : g.title;
}

export function gDesc(g: Guia, lang: 'pt' | 'en'): string {
  return lang === 'en' && g.descriptionEn ? g.descriptionEn : g.description;
}

export const GUIAS: Guia[] = [
  {
    slug: 'quanto-custa-impressao-3d-portugal',
    title: 'Quanto custa uma impressão 3D em Portugal?',
    titleEn: 'How much does 3D printing cost in Portugal?',
    description:
      'O que determina o preço de uma peça impressa em 3D — material, tempo de máquina, acabamento e modelação — com exemplos reais de preços do nosso catálogo.',
    descriptionEn:
      'What determines the price of a 3D-printed piece — material, machine time, finishing and modeling — with real price examples from our catalog.',
    datePublished: '2026-07-01',
    minutes: 6,
    emoji: '💶',
    image: '/images/3d_cost_guide.webp',
  },
  {
    slug: 'pla-petg-abs-asa-tpu-pc-qual-escolher',
    title: 'PLA, PETG, ABS, ASA, TPU ou PC: que material escolher?',
    titleEn: 'PLA, PETG, ABS, ASA, TPU or PC: which material to choose?',
    description:
      'Guia prático dos 6 materiais com que imprimimos: para que serve cada um, resistência, comportamento ao sol e ao calor, e qual escolher para a tua peça.',
    descriptionEn:
      'A practical guide to the 6 materials we print with: what each one is for, strength, behavior in sun and heat, and which to pick for your piece.',
    datePublished: '2026-07-01',
    minutes: 7,
    emoji: '🧵',
    image: '/images/3d_materials_guide.webp',
  },
  {
    slug: 'impressao-3d-refrigeracao-inteligencia-artificial',
    title: 'Como a Impressão 3D está a salvar os Data Centers de IA',
    titleEn: 'How 3D printing is saving AI data centers',
    description: 'O boom da Inteligência Artificial trouxe um grande problema de aquecimento. A solução? Placas de cobre de refrigeração líquida impressas em 3D com geometrias complexas.',
    descriptionEn: 'The AI boom brought a massive heat problem. The solution? Liquid-cooling copper cold plates 3D-printed with complex internal geometries.',
    datePublished: '2026-07-02',
    minutes: 5,
    emoji: '🤖',
    image: '/images/ai_cooling_3d.webp',
  },
  {
    slug: 'impressao-3d-pecas-funcionais-2026',
    title: 'Impressão 3D em 2026: já não é só decoração, são peças que se usam',
    titleEn: '3D printing in 2026: not just decoration — parts you actually use',
    description:
      'O grande salto de 2026: a impressão 3D FDM deixou de ser só protótipos e decoração e passou a produzir peças funcionais e de substituição que aguentam o uso real. O que mudou — e o que significa para ti.',
    descriptionEn:
      'The big 2026 shift: FDM 3D printing moved beyond prototypes and decoration to make functional, replacement parts that hold up to real use. What changed — and what it means for you.',
    datePublished: '2026-07-19',
    minutes: 5,
    emoji: '🛠️',
    image: '/images/impressao-3d-pecas-funcionais-2026.webp',
  },
  {
    slug: 'mercado-impressao-3d-2026',
    title: 'O mercado da impressão 3D em 2026: as máquinas de secretária passaram a mandar',
    titleEn: 'The 3D printing market in 2026: desktop machines took the lead',
    description:
      'Os números do primeiro trimestre de 2026 mostram um mercado a crescer 32% — mas o mais surpreendente é onde: as impressoras acessíveis já valem mais do que todas as outras categorias somadas. O que isso significa para quem quer uma peça impressa.',
    descriptionEn:
      'Q1 2026 figures show a market growing 32% — but the surprise is where: affordable desktop printers now out-earn every other price band combined. What that means for anyone who just wants a part printed.',
    datePublished: '2026-07-22',
    minutes: 6,
    emoji: '📈',
    image: '/images/mercado-impressao-3d-2026.webp',
  },
  {
    slug: 'prendas-personalizadas-impressao-3d',
    title: 'Prendas personalizadas em impressão 3D: ideias que não se compram em loja',
    titleEn: "Personalized 3D-printed gifts: ideas you can't buy in a store",
    description:
      'Caneca com o nome, porta-latas do clube, figura do hobby preferido: ideias reais de prendas impressas em 3D para aniversários, Natal, Dia do Pai e da Mãe — com preços do nosso catálogo e prazos honestos.',
    descriptionEn:
      "A mug with their name, a can holder in their team's colors, a figure of their favorite hobby: real 3D-printed gift ideas for birthdays, Christmas, Father's and Mother's Day — with our catalog prices and honest timelines.",
    datePublished: '2026-07-24',
    minutes: 5,
    emoji: '🎁',
    image: '/images/prendas-personalizadas-impressao-3d.webp',
  },
  {
    slug: 'impressao-3d-para-empresas',
    title: 'Impressão 3D para empresas: protótipos, gabaris e pequenas séries',
    titleEn: '3D printing for businesses: prototypes, jigs and small batches',
    description:
      'Como as empresas usam a impressão 3D FDM para validar protótipos, fabricar gabaris e ferramentas de linha, e produzir pequenas séries — sem moldes caros, sem quantidade mínima e com fatura. Inclui um caso real português.',
    descriptionEn:
      'How businesses use FDM 3D printing to validate prototypes, make jigs and line tooling, and run small batches — no expensive molds, no minimum order, and with a proper invoice. Includes a real Portuguese case study.',
    datePublished: '2026-07-30',
    minutes: 7,
    emoji: '🏭',
    image: '/images/impressao-3d-para-empresas.webp',
  },
  {
    slug: 'pecas-de-substituicao-impressao-3d',
    title: 'Reparar em vez de comprar: peças de substituição impressas em 3D',
    titleEn: 'Repair instead of replacing: 3D-printed spare parts',
    description:
      'Desde 31 de julho de 2026, o Direito à Reparação é lei em toda a UE. Quando a peça de plástico já não se vende — puxadores, dobradiças, engrenagens, clips — nós reproduzimo-la em impressão 3D a partir de uma foto e das medidas. Como funciona, que materiais usamos e quanto custa.',
    descriptionEn:
      "Since 31 July 2026, the Right to Repair is law across the EU. When the plastic part is no longer sold — knobs, hinges, gears, clips — we reproduce it with 3D printing from a photo and measurements. How it works, which materials we use and what it costs.",
    datePublished: '2026-08-04',
    minutes: 6,
    emoji: '🔧',
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
