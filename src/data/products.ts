// Fonte ÚNICA de verdade dos produtos do catálogo.
// Usada tanto pela UI (catálogo/carrinho) quanto pelo servidor (checkout).
// IMPORTANTE: o preço autoritativo vem daqui no servidor — nunca confie
// no preço enviado pelo cliente.


export type CustomizationOption = {
  id: string;
  label: string;
  /** Tradução inglesa do label (toggle PT/EN do site). */
  labelEn?: string;
  type: 'color' | 'text';
  options?: string[]; // Para type 'color'
  maxLength?: number; // Para type 'text'
  /** true = o cliente TEM de preencher antes de adicionar ao carrinho. */
  required?: boolean;
};

export type Product = {
  id: string;
  name: string;
  /** Tradução inglesa do nome (toggle PT/EN do site). */
  nameEn?: string;
  desc: string;
  /** Tradução inglesa da descrição (toggle PT/EN do site). */
  descEn?: string;
  /** Preço em EUR (inteiro). Convertido para cêntimos no checkout. */
  price: number;
  tag: string;
  tone: 'green' | 'blue' | 'olive' | 'purple' | 'red' | 'orange' | 'slate' | 'indigo' | 'yellow';
  icon: string;
  images?: string[];
  customizations?: CustomizationOption[];
  /** true = arquivo digital (STL) entregue por download, sem envio físico. */
  digital?: boolean;
  /**
   * true = produto NÃO listado no catálogo/sitemap/destaques (fica "por
   * publicar"). A página /produto/<id> continua a funcionar por link direto.
   * Usado para produtos ainda sem foto — remover a flag quando a foto existir.
   */
  hidden?: boolean;
  /** Material de impressão (default: 'PLA'). Usado no schema Product. */
  material?: string;
  /**
   * Arquivo STL associado (apenas para produtos digitais).
   * `file` = nome do arquivo dentro da pasta privada `private-stl/`.
   * `downloadName` = nome que o cliente verá ao baixar.
   */
  stl?: { file: string; downloadName: string };
};

// A ordem das secções na página segue a ordem em que cada `tag` aparece aqui.
// Regra do catálogo: os articulados/fidgets partilham a secção "Articulados";
// TODOS os outros produtos têm cada um a SUA própria secção (não agrupar).
export const PRODUCTS: Product[] = [
  // ─────────────────────────── ARTICULADOS ───────────────────────────
  {
    id: 'dragao-articulado',
    name: 'Dragão Articulado',
    nameEn: 'Articulated Dragon',
    desc: 'Dragão articulado impresso em 3D, totalmente flexível — o corpo comprido ondula segmento a segmento, como um dragão vivo, com escamas em relevo, espinhos ao longo das costas, chifres e patas com garras. Print-in-place, sem colas nem montagem. Peça de destaque na secretária ou estante e um fidget anti-stress irresistível. Escolhe a tua cor.',
    descEn: 'A fully flexible 3D-printed articulated dragon — the long body ripples segment by segment, like a living dragon, with raised scales, a spined back, horns and clawed feet. Print-in-place, no glue or assembly. A statement desk or shelf piece and an irresistible anti-stress fidget. Pick your color.',
    price: 10.00,
    tag: 'Articulados',
    tone: 'blue',
    icon: '🐉',
    images: [
      '/images/dragao-articulado-1.webp',
      '/images/dragao-articulado-2.webp',
      '/images/dragao-articulado-3.webp'
    ],
    customizations: [
      { id: 'cor', label: 'Cor à escolha (ex: azul, verde, roxo, dourado)', labelEn: 'Color of choice (e.g. blue, green, purple, gold)', type: 'text', maxLength: 30 }
    ]
  },
  {
    id: 'polvo-articulado',
    hidden: true, // por publicar — falta foto
    name: 'Polvo Articulado',
    nameEn: 'Flexi Octopus (Articulated)',
    desc: 'Polvo articulado impresso em 3D com oito tentáculos que se enrolam e ondulam. Print-in-place, sem colas nem montagem. Fidget anti-stress super satisfatório, brinquedo ou peça de secretária. Escolhe a tua cor.',
    descEn: 'A 3D-printed articulated octopus with eight tentacles that curl and ripple. Print-in-place, no glue or assembly. A super-satisfying anti-stress fidget, toy or desk piece. Pick your color.',
    price: 9.90,
    tag: 'Articulados',
    tone: 'red',
    icon: '🐙',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (ex: laranja, roxo, azul)', labelEn: 'Color of choice (e.g. orange, purple, blue)', type: 'text', maxLength: 30 }
    ]
  },
  {
    id: 'dinossauro-articulado',
    hidden: true, // por publicar — falta foto
    name: 'Dinossauro Articulado',
    nameEn: 'Articulated Dinosaur',
    desc: 'Dinossauro articulado impresso em 3D, totalmente flexível — o corpo e a cauda mexem segmento a segmento. Print-in-place, sem colas nem montagem. Divertido, anti-stress e ótimo como prenda para miúdos e graúdos. Escolhe a tua cor.',
    descEn: 'A fully flexible 3D-printed articulated dinosaur — the body and tail move segment by segment. Print-in-place, no glue or assembly. Fun, anti-stress and a great gift for kids and grown-ups alike. Pick your color.',
    price: 12.90,
    tag: 'Articulados',
    tone: 'olive',
    icon: '🦕',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (ex: verde, azul, laranja)', labelEn: 'Color of choice (e.g. green, blue, orange)', type: 'text', maxLength: 30 }
    ]
  },
  {
    id: 'tubarao-articulado',
    name: 'Tubarão Articulado',
    nameEn: 'Articulated Shark',
    desc: 'Tubarão totalmente flexível impresso em 3D — cada segmento mexe e ondula como um tubarão a nadar. Feito peça a peça, sem colas nem montagem. Ótimo como fidget anti-stress, brinquedo ou peça de secretária. Escolhe a tua cor.',
    descEn: 'A fully flexible 3D-printed shark — every segment moves and ripples like a swimming shark. Made in one piece, no glue or assembly. Great as an anti-stress fidget, a toy or a desk piece. Pick your color.',
    price: 4.5,
    tag: 'Articulados',
    tone: 'indigo',
    icon: '🦈',
    images: [
      '/images/tubarao-articulado-1.webp',
      '/images/tubarao-articulado-2.webp',
      '/images/tubarao-articulado-3.webp',
      '/images/tubarao-articulado-4.webp'
    ],
    customizations: [
      {
        id: 'cor',
        label: 'Cor à escolha (verde, vermelho, azul, laranja, roxo/azul)',
        labelEn: 'Color of choice (green, red, blue, orange, purple/blue)',
        type: 'text',
        maxLength: 30
      }
    ]
  },
  {
    id: 'panda-vermelho-articulado',
    name: 'Panda Vermelho Articulado',
    nameEn: 'Articulated Red Panda',
    desc: 'Panda vermelho articulado impresso em 3D, totalmente flexível — a cauda às riscas laranja e castanho ondula segmento a segmento e as patas mexem. Print-in-place, sem colas nem montagem. Fofo, anti-stress e ótimo como prenda ou peça de secretária.',
    descEn: 'A fully flexible 3D-printed articulated red panda — the orange-and-brown striped tail ripples segment by segment and the paws move. Print-in-place, no glue or assembly. Cute, anti-stress and great as a gift or a desk piece.',
    price: 7.90,
    tag: 'Articulados',
    tone: 'orange',
    icon: '🐾',
    images: [
      '/images/panda-vermelho-articulado-1.webp',
      '/images/panda-vermelho-articulado-2.webp'
    ]
  },
  {
    id: 'spinner-espiral',
    name: 'Spinner Espiral',
    nameEn: 'Spiral Spinner',
    desc: 'Spinner espiral hipnótico impresso em 3D — gira o eixo central e as camadas em estrela cascateiam num vórtice hipnotizante. Print-in-place, sem colas nem montagem. Fidget anti-stress e peça de secretária que prende o olhar. Escolhe a tua cor.',
    descEn: 'A hypnotic 3D-printed spiral spinner — spin the central axis and the star-shaped layers cascade into a mesmerizing vortex. Print-in-place, no glue or assembly. An anti-stress fidget and an eye-catching desk piece. Pick your color.',
    price: 4.95,
    tag: 'Articulados',
    tone: 'purple',
    icon: '🌀',
    images: [
      '/images/spinner-espiral-1.webp',
      '/images/spinner-espiral-2.webp',
      '/images/spinner-espiral-3.webp',
      '/images/spinner-espiral-4.webp',
      '/images/spinner-espiral-5.webp'
    ],
    customizations: [
      {
        id: 'cor',
        label: 'Cor à escolha (verde, amarelo, rosa, azul/roxo)',
        labelEn: 'Color of choice (green, yellow, pink, blue/purple)',
        type: 'text',
        maxLength: 30
      }
    ]
  },
  {
    id: 'spinner-bola-espiral',
    name: 'Spinner Bola Espiral',
    nameEn: 'Spiral Ball Spinner',
    desc: 'Bola espiral hipnótica com textura de picos, impressa em 3D peça a peça (print-in-place). Em repouso é uma bola espinhosa; giras e as camadas abrem-se num vórtice em leque. Fidget anti-stress super satisfatório e peça de secretária. Escolhe a tua cor.',
    descEn: 'A hypnotic spiky-textured spiral ball, 3D-printed in one piece (print-in-place). At rest it is a spiky sphere; spin it and the layers fan open into a vortex. A super-satisfying anti-stress fidget and desk piece. Pick your color.',
    price: 5.90,
    tag: 'Articulados',
    tone: 'orange',
    icon: '🌀',
    images: [
      '/images/spinner-bola-espiral-1.webp',
      '/images/spinner-bola-espiral-2.webp',
      '/images/spinner-bola-espiral-3.webp',
      '/images/spinner-bola-espiral-4.webp',
      '/images/spinner-bola-espiral-5.webp'
    ],
    customizations: [
      {
        id: 'cor',
        label: 'Cor à escolha (ex: rosa, laranja, verde)',
        labelEn: 'Color of choice (e.g. pink, orange, green)',
        type: 'text',
        maxLength: 30
      }
    ]
  },

  // ────────────────────────── SUPORTE DE TELEMÓVEL ──────────────────────────
  {
    id: 'suporte-celular',
    hidden: true, // por publicar — falta foto
    name: 'Suporte de Telemóvel',
    nameEn: '3D Phone Stand',
    desc: 'Suporte de telemóvel impresso em 3D, estável e com o ângulo perfeito para veres vídeos, chamadas ou receitas na secretária ou na cozinha. Compatível com qualquer telemóvel, com ou sem capa. Escolhe a tua cor.',
    descEn: 'A 3D-printed phone stand, stable and at the perfect angle to watch videos, take calls or follow recipes on your desk or in the kitchen. Fits any phone, with or without a case. Pick your color.',
    price: 9.90,
    tag: 'Suporte de Telemóvel',
    tone: 'blue',
    icon: '📱',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },

  // ──────────────────────────────── DOCK MAGSAFE ────────────────────────────────
  {
    id: 'dock-magsafe-organizador',
    hidden: true, // por publicar — falta foto
    name: 'Dock MagSafe',
    nameEn: 'MagSafe Dock',
    desc: 'Base de carregamento MagSafe impressa em 3D — encaixa o teu carregador MagSafe e carrega o telemóvel na vertical, sempre à vista e no ângulo certo. (Carregador não incluído.) Escolhe a tua cor.',
    descEn: 'A 3D-printed MagSafe charging dock — slot in your MagSafe charger and charge your phone upright, always in view and at the right angle. (Charger not included.) Pick your color.',
    price: 24.90,
    tag: 'Dock MagSafe',
    tone: 'green',
    icon: '🔋',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },

  // ─────────────────────────── SUPORTE DE HEADSET ───────────────────────────
  {
    id: 'organizador-modular-headset',
    hidden: true, // por publicar — falta foto
    name: 'Suporte de Headset',
    nameEn: 'Headset Stand',
    desc: 'Suporte de headset impresso em 3D para o teu setup gaming — pendura os auscultadores em destaque e mantém a secretária arrumada e livre de cabos emaranhados. Escolhe a tua cor.',
    descEn: 'A 3D-printed headset stand for your gaming setup — hang your headphones on display and keep your desk tidy and free of tangled cables. Pick your color.',
    price: 24.90,
    tag: 'Suporte de Headset',
    tone: 'purple',
    icon: '🎧',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },

  // ─────────────────────────── COMANDO PS5/XBOX ───────────────────────────
  {
    id: 'suporte-controle-ps5-xbox',
    hidden: true, // por publicar — falta foto
    name: 'Suporte de Comando PS5/Xbox Personalizado',
    nameEn: 'Personalized PS5/Xbox Controller Stand',
    desc: 'Suporte de comando impresso em 3D para PS5 ou Xbox, com placa personalizável com o teu nome ou gamertag. Mantém o comando arrumado e em destaque na secretária ou no setup gaming. Escolhe a consola e a cor.',
    descEn: 'A 3D-printed controller stand for PS5 or Xbox, with a plate you personalize with your name or gamertag. Keeps your controller tidy and on display on your desk or gaming setup. Choose your console and color.',
    price: 19.90,
    tag: 'Comando PS5/Xbox',
    tone: 'blue',
    icon: '🎮',
    customizations: [
      { id: 'consola', label: 'Consola (PS5 ou Xbox)', labelEn: 'Console (PS5 or Xbox)', type: 'text', maxLength: 10, required: true },
      { id: 'nome', label: 'Nome/gamertag para a placa (opcional)', labelEn: 'Name/gamertag for the plate (optional)', type: 'text', maxLength: 16 }
    ]
  },

  // ──────────────────────────── COMANDO NEON VICE ────────────────────────────
  { id: 'suporte-comando-neon', name: 'Suporte de Comando PS5 — Neon Vice', nameEn: 'PS5 Controller Stand — Neon Vice', desc: 'Suporte de comando PS5 com atitude de cidade neon dos anos 80: palmeiras verdes, base preta com detalhes cor-de-rosa e uma placa "Wanted" que personalizas com a tua gamertag. Uma peça de secretária que dá logo nas vistas. Ideal para gamers.', descEn: 'A PS5 controller stand with full 80s neon-city attitude: green palm trees, a black base with pink accents and a "Wanted" plate you personalize with your gamertag. A desk piece that stands out right away. Perfect for gamers.', price: 40, tag: 'Comando Neon', tone: 'purple', icon: '🎮', images: ['/images/suporte-comando-ps5-1.webp', '/images/suporte-comando-ps5-2.webp', '/images/suporte-comando-ps5-3.webp'], customizations: [ { id: 'gamertag', label: 'Gamertag para a placa (ex: NIGHT_RIDER)', labelEn: 'Gamertag for the plate (e.g. NIGHT_RIDER)', type: 'text', maxLength: 16 } ] },

  // ─────────────────────────── ORGANIZADOR DE MESA ───────────────────────────
  {
    id: 'organizador-mesa-suporte-celular',
    hidden: true, // por publicar — falta foto
    name: 'Organizador de Mesa',
    nameEn: 'Desk Organizer',
    desc: 'Organizador de secretária impresso em 3D — arruma canetas, clips, post-its e pequenos objetos com vários compartimentos. Mesa mais limpa, prática e com estilo. Escolhe a tua cor.',
    descEn: 'A 3D-printed desk organizer — keep pens, clips, sticky notes and small items tidy across several compartments. A cleaner, more practical desk with style. Pick your color.',
    price: 19.90,
    tag: 'Organizador de Mesa',
    tone: 'slate',
    icon: '🗂️',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },

  // ─────────────────────────────── PORTA-PINCÉIS ───────────────────────────────
  {
    id: 'porta-pinceis-organizador',
    hidden: true, // por publicar — falta foto
    name: 'Porta-Pincéis Multifuncional',
    nameEn: 'Multi-purpose Brush & Pen Holder',
    desc: 'Organizador multifuncional impresso em 3D — perfeito para pincéis de maquilhagem, canetas, lápis ou ferramentas. Vários compartimentos para manter tudo à mão e a mesa arrumada. Escolhe a tua cor.',
    descEn: 'A 3D-printed multi-purpose organizer — perfect for makeup brushes, pens, pencils or tools. Several compartments to keep everything at hand and your desk tidy. Pick your color.',
    price: 12.90,
    tag: 'Porta-Pincéis',
    tone: 'red',
    icon: '🖌️',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },

  // ─────────────────────────── CANDEEIRO DRAGÃO ───────────────────────────
  {
    id: 'candeeiro-dragao',
    name: 'Candeeiro Dragão',
    nameEn: 'Dragon Flame Lamp',
    desc: 'Candeeiro decorativo de um dragão a cuspir fogo — a chama é o próprio abajur translúcido, que acende com a luz LED incluída (a pilhas, sem calor nem fios) e enche a divisão com um brilho quente alaranjado. Peça de exposição impressa em 3D nas nossas Bambu Lab, com asas abertas e detalhe nas escamas. Perfeita para gamers, fãs de fantasia, mesa de cabeceira ou secretária.',
    descEn: 'A decorative lamp of a fire-breathing dragon — the flame itself is the translucent shade, lit by the included LED light (battery-powered, no heat, no wires), filling the room with a warm orange glow. A statement piece 3D-printed on our Bambu Lab machines, with spread wings and detailed scales. Perfect for gamers, fantasy fans, a bedside table or a desk.',
    price: 44.90,
    tag: 'Candeeiro Dragão',
    tone: 'red',
    icon: '🐉',
    images: [
      '/images/candeeiro-dragao-1.webp',
      '/images/candeeiro-dragao-2.webp',
      '/images/candeeiro-dragao-3.webp'
    ]
  },

  // ─────────────────────────── CANDEEIRO RAPOSA ───────────────────────────
  {
    id: 'candeeiro-raposa',
    name: 'Candeeiro Raposa',
    nameEn: 'Fox Lantern Lamp',
    desc: 'Candeeiro decorativo de uma raposa em estilo de blocos que segura uma lanterna acesa. A luz vem de uma vela LED incluída (chama artificial, sem calor nem fios, a pilhas) e dá um brilho quente e aconchegante — perfeito como luz de presença na mesa de cabeceira, secretária ou quarto das crianças. Impresso a várias cores nas nossas Bambu Lab.',
    descEn: "A decorative lamp of a blocky-style fox holding a lit lantern. The light comes from an included LED tea light (flameless, no heat, battery-powered) for a warm, cozy glow — perfect as a night light on a bedside table, desk or a kids' room. Printed in multiple colors on our Bambu Lab printers.",
    price: 49.90,
    tag: 'Candeeiro Raposa',
    tone: 'orange',
    icon: '🦊',
    images: [
      '/images/candeeiro-raposa-1.webp',
      '/images/candeeiro-raposa-2.webp',
      '/images/candeeiro-raposa-3.webp',
      '/images/candeeiro-raposa-4.webp',
      '/images/candeeiro-raposa-5.webp'
    ]
  },

  // ─────────────────────────── VASO GEOMÉTRICO ───────────────────────────
  {
    id: 'vaso-geometrico',
    hidden: true, // por publicar — falta foto
    name: 'Vaso Geométrico',
    nameEn: 'Geometric Planter',
    desc: 'Vaso/cachepot geométrico impresso em 3D — linhas facetadas modernas que dão vida a suculentas, plantas pequenas ou até canetas. Peça decorativa para a secretária, prateleira ou parapeito. Escolhe a tua cor.',
    descEn: 'A 3D-printed geometric planter/pot — modern faceted lines that bring succulents, small plants or even pens to life. A decorative piece for the desk, shelf or windowsill. Pick your color.',
    price: 14.90,
    tag: 'Vaso Geométrico',
    tone: 'green',
    icon: '🪴',
    customizations: [
      { id: 'cor', label: 'Cor à escolha (opcional)', labelEn: 'Color of choice (optional)', type: 'text', maxLength: 30 }
    ]
  },
];

/**
 * Produtos LISTADOS no site (catálogo, destaques, sitemap). Exclui os marcados
 * `hidden` (ex.: ainda sem foto). A página /produto/<id> continua a funcionar
 * por link direto mesmo para os escondidos — só não aparecem nas listagens.
 */
export const VISIBLE_PRODUCTS = PRODUCTS.filter((p) => !p.hidden);

// Categorias derivadas só dos produtos visíveis (evita pills de categorias
// que ficariam vazias por só terem produtos escondidos).
export const PRODUCT_TAGS = ['Todos', ...Array.from(new Set(VISIBLE_PRODUCTS.map((p) => p.tag)))];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
}

/**
 * Atacado: 10+ unidades da MESMA peça = 15% de desconto automático.
 * Variantes personalizadas do mesmo produto (nomes diferentes) contam juntas
 * — a eficiência de produção vem de imprimir a mesma peça em lote.
 * Regra usada pelo servidor (checkout Stripe) E pelo carrinho (UI).
 */
export const WHOLESALE_MIN_QTY = 10;
export const WHOLESALE_DISCOUNT = 0.15;

/** Preço unitário efetivo dado o total de unidades do mesmo produto. */
export function unitPriceFor(price: number, qtyOfSameProduct: number): number {
  return qtyOfSameProduct >= WHOLESALE_MIN_QTY
    ? price * (1 - WHOLESALE_DISCOUNT)
    : price;
}
