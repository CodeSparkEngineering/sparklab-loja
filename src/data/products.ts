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
  /**
   * Autor do modelo, quando a licença obriga a dar crédito (CC BY / CC BY-SA).
   * Mostrado na página do produto — NÃO remover enquanto a peça estiver à venda.
   */
  credit?: { autor: string; licenca: 'CC BY' | 'CC BY-SA'; fonte: string };
  /**
   * Modelo cuja licença NÃO permite vender impressões (falta autorização
   * escrita do autor). Só existe em desenvolvimento, para testar: em produção
   * o produto é retirado de PRODUCTS — sem cartão, sem página, sem checkout.
   * Apagar a flag só depois de ter a autorização.
   */
  semLicencaVenda?: boolean;
  /**
   * Preço de conjunto: a partir de `qty` unidades do mesmo produto (somando
   * todas as variantes — ex.: nomes diferentes), cada uma passa a `unitPrice`.
   * Ex.: 3,50 € cada, 3 por 9 € → { qty: 3, unitPrice: 3 }.
   */
  pack?: { qty: number; unitPrice: number };
};

/**
 * NICHOS do catálogo — a separação por que o cliente navega ("isto é para
 * mim?"), NÃO uma etiqueta por produto. Cada produto aponta para o seu nicho
 * através de `tag`, que TEM de coincidir com o `label` de um nicho aqui.
 *
 * Porquê: antes cada produto tinha a sua própria "categoria" (Candeeiro
 * Dragão, Comando Neon, …), o que dava filtros de 1 produto — inútil para
 * navegar e mau para o SEO. Agora agrupam-se por intenção de compra.
 *
 * A ordem desta lista é a ordem das secções no catálogo.
 */
export type Niche = {
  /** slug estável — âncora #catalogo-<slug> e scroll-spy da navegação */
  slug: string;
  /** rótulo PT — tem de bater certo com o `tag` dos produtos do nicho */
  label: string;
  labelEn: string;
  /** uma linha curta, por baixo do título da secção */
  desc: string;
  descEn: string;
};

export const NICHES: Niche[] = [
  {
    slug: 'articulados',
    label: 'Articulados',
    labelEn: 'Articulated',
    desc: 'Cada segmento mexe. Impressos numa peça só, sem colas.',
    descEn: 'Every segment moves. Printed in one piece, no glue.',
  },
  {
    slug: 'fidgets',
    label: 'Fidgets',
    labelEn: 'Fidgets',
    desc: 'Giram, clicam, acalmam.',
    descEn: 'They spin, they click, they calm.',
  },
  {
    slug: 'luminarias',
    label: 'Luminárias',
    labelEn: 'Lamps',
    desc: 'Luz LED quente. Peças de exposição que acendem.',
    descEn: 'Warm LED light. Statement pieces that light up.',
  },
  {
    slug: 'secretaria',
    label: 'Secretária',
    labelEn: 'Desk',
    desc: 'Suportes e organizadores. Menos desarrumação, mais espaço para trabalhar.',
    descEn: 'Stands and organizers. Less clutter, more room to work.',
  },
  {
    slug: 'setup-gamer',
    label: 'Setup Gamer',
    labelEn: 'Gaming Setup',
    desc: 'O teu canto de jogo, arrumado e com o teu nome.',
    descEn: 'Your gaming corner, tidy and with your name on it.',
  },
  {
    slug: 'natal',
    label: 'Natal',
    labelEn: 'Christmas',
    desc: 'Enfeites com nome, decoração e mimos para a mesa da consoada.',
    descEn: 'Name ornaments, decorations and treats for the Christmas table.',
  },
];

const TODOS_OS_PRODUTOS: Product[] = [
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
    id: 'gelado-caixa',
    name: 'Gelado Caixinha',
    nameEn: 'Ice Cream Trinket Box',
    desc: 'Um gelado de cone que afinal abre: a bola é a tampa e o cone é um pote com espaço lá dentro para anéis, brincos, moedas ou aquele parafuso que não podes perder. As pétalas encaixam com um estalido satisfatório — dá gosto abrir e fechar. Impresso em 3D em duas cores à tua escolha (bola e cone), com a textura do wafer em relevo. Fica bem na mesa de cabeceira, na secretária ou como prenda pequena e diferente.',
    descEn: 'An ice cream cone that actually opens: the scoop is the lid and the cone is a little pot with room inside for rings, earrings, coins or that screw you must not lose. The petals close with a satisfying click — opening and shutting it is half the fun. 3D-printed in two colors of your choice (scoop and cone), with the waffle texture in relief. Great on a bedside table, a desk, or as a small, different gift.',
    price: 9.90,
    tag: 'Fidgets',
    tone: 'red',
    icon: '🍦',
    images: [
      '/images/gelado-caixa-1.webp',
      '/images/gelado-caixa-2.webp',
      '/images/gelado-caixa-3.webp'
    ],
    customizations: [
      {
        id: 'cor_bola',
        label: 'Cor da bola (ex: morango, chocolate, menta, baunilha)',
        labelEn: 'Scoop color (e.g. strawberry, chocolate, mint, vanilla)',
        type: 'text',
        maxLength: 30
      },
      {
        id: 'cor_cone',
        label: 'Cor do cone (ex: creme, amarelo, rosa, verde, azul)',
        labelEn: 'Cone color (e.g. cream, yellow, pink, green, blue)',
        type: 'text',
        maxLength: 30
      }
    ]
  },
  {
    id: 'spinner-espiral',
    name: 'Spinner Espiral',
    nameEn: 'Spiral Spinner',
    desc: 'Spinner espiral hipnótico impresso em 3D — gira o eixo central e as camadas em estrela cascateiam num vórtice hipnotizante. Print-in-place, sem colas nem montagem. Fidget anti-stress e peça de secretária que prende o olhar. Escolhe a tua cor.',
    descEn: 'A hypnotic 3D-printed spiral spinner — spin the central axis and the star-shaped layers cascade into a mesmerizing vortex. Print-in-place, no glue or assembly. An anti-stress fidget and an eye-catching desk piece. Pick your color.',
    price: 4.95,
    tag: 'Fidgets',
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
    tag: 'Fidgets',
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





  // ──────────────────────────── COMANDO NEON VICE ────────────────────────────
  { id: 'suporte-comando-neon', name: 'Suporte de Comando PS5 — Neon Vice', nameEn: 'PS5 Controller Stand — Neon Vice', desc: 'Suporte de comando PS5 com atitude de cidade neon dos anos 80: palmeiras verdes, base preta com detalhes cor-de-rosa e uma placa "Wanted" que personalizas com a tua gamertag. Uma peça de secretária que dá logo nas vistas. Ideal para gamers.', descEn: 'A PS5 controller stand with full 80s neon-city attitude: green palm trees, a black base with pink accents and a "Wanted" plate you personalize with your gamertag. A desk piece that stands out right away. Perfect for gamers.', price: 40, tag: 'Setup Gamer', tone: 'purple', icon: '🎮', images: ['/images/suporte-comando-ps5-1.webp', '/images/suporte-comando-ps5-2.webp', '/images/suporte-comando-ps5-3.webp'], customizations: [ { id: 'gamertag', label: 'Gamertag para a placa (ex: NIGHT_RIDER)', labelEn: 'Gamertag for the plate (e.g. NIGHT_RIDER)', type: 'text', maxLength: 16 } ] },

  // ─────────────────────────── ORGANIZADOR DE MESA ───────────────────────────
  {
    id: 'organizador-mesa-suporte-celular',
    name: 'Organizador de Gavetas',
    nameEn: 'Drawer Organizer',
    desc: 'Organizador modular com bandeja de cinco compartimentos no topo e quatro gavetas que deslizam por baixo — uma larga e três pequenas. Em cima ficam à mão os pincéis, canetas e frascos altos; nas gavetas desaparecem os batons, brincos, clips e tudo o que suja a mesa. Impresso em 3D nas nossas Bambu Lab em duas cores à tua escolha (estrutura e gavetas), com puxadores integrados. Serve na casa de banho, na secretária ou na mesa de cabeceira.',
    descEn: 'A modular organizer with a five-compartment tray on top and four sliding drawers below — one wide, three small. Brushes, pens and tall bottles stay within reach up top; lipsticks, earrings, clips and everything that clutters the desk disappear into the drawers. 3D-printed on our Bambu Lab machines in two colors of your choice (body and drawers), with built-in handles. Works in the bathroom, on a desk or a bedside table.',
    price: 29.90,
    tag: 'Secretária',
    tone: 'blue',
    icon: '🗄️',
    images: [
      '/images/organizador-gavetas-1.webp',
      '/images/organizador-gavetas-2.webp',
      '/images/organizador-gavetas-3.webp',
      '/images/organizador-gavetas-4.webp'
    ],
    customizations: [
      {
        id: 'cor_estrutura',
        label: 'Cor da estrutura (ex: azul, castanho, branco)',
        labelEn: 'Body color (e.g. blue, brown, white)',
        type: 'text',
        maxLength: 30
      },
      {
        id: 'cor_gavetas',
        label: 'Cor das gavetas (ex: branco, rosa, creme)',
        labelEn: 'Drawer color (e.g. white, pink, cream)',
        type: 'text',
        maxLength: 30
      }
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
    tag: 'Luminárias',
    tone: 'red',
    icon: '🐉',
    images: [
      '/images/candeeiro-dragao-1.webp',
      '/images/candeeiro-dragao-2.webp',
      '/images/candeeiro-dragao-3.webp'
    ]
  },

  // ─────────────────────────── CANDEEIRO MONTANHA ───────────────────────────
  {
    id: 'candeeiro-montanha',
    name: 'Candeeiro Montanha',
    nameEn: 'Mountain Lamp',
    desc: 'Candeeiro de mesa com uma cordilheira translúcida e dois barquinhos num lago aos pés dela — acesa, a luz atravessa a rocha e as encostas ganham profundidade, como um vale ao entardecer. Impresso em 3D nas nossas Bambu Lab, com base à escolha em cinzento ou preto. Peça de exposição para a mesa de cabeceira, a entrada ou uma prateleira.',
    descEn: 'A table lamp with a translucent mountain range and two little boats on the lake at its feet — lit, the light passes through the rock and the slopes gain depth, like a valley at dusk. 3D-printed on our Bambu Lab machines, with your choice of grey or black base. A statement piece for a bedside table, a hallway or a shelf.',
    price: 33.00,
    tag: 'Luminárias',
    tone: 'slate',
    icon: '🏔️',
    images: [
      '/images/candeeiro-montanha-1.webp',
      '/images/candeeiro-montanha-2.webp',
      '/images/candeeiro-montanha-3.webp'
    ],
    customizations: [
      {
        id: 'cor_base',
        label: 'Cor da base (cinzento ou preto)',
        labelEn: 'Base color (grey or black)',
        type: 'text',
        maxLength: 20
      }
    ]
  },

  // ─────────────────────────── CANDEEIRO COGUMELO ───────────────────────────
  {
    id: 'candeeiro-cogumelo',
    name: 'Candeeiro Cogumelo',
    nameEn: 'Mushroom Lamp',
    desc: 'Candeeiro de mesa em forma de cogumelo, com chapéu translúcido e base em espiral canelada — quando acende, a luz atravessa as nervuras e desenha um brilho quente e suave na parede. Impresso em 3D nas nossas Bambu Lab, em duas cores à tua escolha (chapéu e base). Liga-se à tomada e traz lâmpada LED incluída. Perfeito na mesa de cabeceira, na secretária ou numa prateleira.',
    descEn: 'A mushroom-shaped table lamp with a translucent cap and a fluted spiral base — when lit, the light passes through the ribs and casts a warm, soft glow on the wall. 3D-printed on our Bambu Lab machines, in two colors of your choice (cap and base). Plugs into the wall and includes an LED bulb. Perfect on a bedside table, a desk or a shelf.',
    price: 35.00,
    tag: 'Luminárias',
    tone: 'purple',
    icon: '🍄',
    images: [
      '/images/candeeiro-cogumelo-1.webp',
      '/images/candeeiro-cogumelo-2.webp',
      '/images/candeeiro-cogumelo-3.webp'
    ],
    customizations: [
      {
        id: 'cor_chapeu',
        label: 'Cor do chapéu (ex: laranja, roxo, verde-água)',
        labelEn: 'Cap color (e.g. orange, purple, teal)',
        type: 'text',
        maxLength: 30
      },
      {
        id: 'cor_base',
        label: 'Cor da base (ex: creme, roxo, amarelo)',
        labelEn: 'Base color (e.g. cream, purple, yellow)',
        type: 'text',
        maxLength: 30
      }
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
    tag: 'Luminárias',
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

  // ─────────────────────────── NATAL ───────────────────────────
  // Modelos do MakerWorld. `credit` é OBRIGATÓRIO nas licenças CC BY e
  // CC BY-SA (aparece na página do produto e nos destaques de Natal).
  // Preços definidos pelo dono a 26/11/2026.
  {
    id: 'enfeite-patinha-pet',
    name: 'Enfeite Patinha com o Nome do Pet',
    nameEn: 'Paw Ornament with Your Pet’s Name',
    desc: 'Enfeite de Natal em forma de patinha, com o nome do teu cão ou gato em relevo, a silhueta dele e dois flocos de neve. Impresso em 3D a duas cores, com fita para pendurar na árvore. Para quem tem um patudo que também é da família — e uma prenda certeira para qualquer dono babado.',
    descEn: 'A paw-shaped Christmas ornament with your dog’s or cat’s name in relief, their silhouette and two snowflakes. 3D-printed in two colors, with a ribbon to hang it on the tree. For anyone whose pet is part of the family — and a sure-fire gift for any proud owner.',
    price: 3.50,
    pack: { qty: 3, unitPrice: 3 }, // 3 por 9 €
    tag: 'Natal',
    tone: 'red',
    icon: '🐾',
    images: [
      '/images/enfeite-patinha-pet-1.webp',
      '/images/enfeite-patinha-pet-2.webp'
    ],
    customizations: [
      { id: 'nome', label: 'Nome do pet', labelEn: 'Pet’s name', type: 'text', maxLength: 12, required: true },
      { id: 'cor', label: 'Cor do fundo (ex: vermelho, verde, azul)', labelEn: 'Background color (e.g. red, green, blue)', type: 'text', maxLength: 30 }
    ],
  },
  {
    id: 'letreiro-feliz-natal',
    name: 'Letreiro Feliz Natal',
    nameEn: '"Feliz Natal" Sign',
    desc: 'Letreiro "Feliz Natal" de pousar, com dois pinheirinhos e letras desenhadas — fica de pé sozinho na prateleira, na lareira, no aparador ou na montra. Impresso em 3D numa só peça, na cor que escolheres. Decoração de Natal em português, que não se encontra nas lojas.',
    descEn: 'A freestanding "Feliz Natal" (Merry Christmas in Portuguese) sign with two little pine trees and hand-drawn lettering — it stands on its own on a shelf, a mantelpiece, a sideboard or a shop window. 3D-printed in one piece, in the color you choose.',
    price: 9.90,
    tag: 'Natal',
    tone: 'red',
    icon: '🎅',
    images: [
      '/images/letreiro-feliz-natal-1.webp',
      '/images/letreiro-feliz-natal-2.webp'
    ],
    customizations: [
      { id: 'cor', label: 'Cor à escolha (ex: vermelho, verde, branco, dourado)', labelEn: 'Color of choice (e.g. red, green, white, gold)', type: 'text', maxLength: 30 }
    ],
    credit: { autor: 'Wilson', licenca: 'CC BY', fonte: 'https://makerworld.com/en/models/3234939' },
  },

  // ───────────── NATAL — SÓ TESTE, SEM LICENÇA DE VENDA ─────────────
  // Licenças MakerWorld "Standard Digital File" / "Exclusive": não permitem
  // vender impressões e as fotos são dos autores. `semLicencaVenda` tira-os
  // de produção. Para publicar um: autorização escrita do autor → apagar a
  // flag → trocar as fotos pelas nossas. Preços definidos a 26/11/2026.
  {
    // Aleksandra's models — https://makerworld.com/en/models/3500858
    id: 'enfeite-camisola-rena-nome',
    name: 'Enfeite Camisola de Natal com Nome',
    nameEn: 'Christmas Sweater Ornament with Name',
    desc: 'Enfeite de Natal em forma de camisola de malha, com renas, flocos de neve e o nome em relevo a branco. Impresso em 3D a duas cores, com fio para pendurar na árvore. Um por cada pessoa lá de casa — e serve de etiqueta de prenda que não vai para o lixo.',
    descEn: 'A Christmas ornament shaped like a knitted sweater, with reindeer, snowflakes and the name in white relief. 3D-printed in two colors, with a string to hang it on the tree. One for each person in the house — and it doubles as a gift tag that never gets thrown away.',
    price: 3.50,
    pack: { qty: 3, unitPrice: 3 }, // 3 por 9 €
    tag: 'Natal',
    tone: 'red',
    icon: '🧶',
    images: [
      '/images/enfeite-camisola-rena-nome-1.webp',
      '/images/enfeite-camisola-rena-nome-2.webp'
    ],
    customizations: [
      { id: 'nome', label: 'Nome', labelEn: 'Name', type: 'text', maxLength: 10, required: true },
      { id: 'cor', label: 'Cor da camisola (ex: vermelho, verde, azul)', labelEn: 'Sweater color (e.g. red, green, blue)', type: 'text', maxLength: 30 }
    ],
    semLicencaVenda: true,
  },
  {
    // MeshBeeLab 3d — https://makerworld.com/en/models/3500578
    id: 'porta-panetone-pai-natal',
    name: 'Porta-Panetone Pai Natal',
    nameEn: 'Santa Panettone Holder',
    desc: 'Base para panetone com o fato do Pai Natal: casaco vermelho, cinto preto com fivela dourada e gola branca. Pousas o panetone embrulhado lá dentro e a prenda fica pronta a oferecer ou a ir para a mesa. Impresso em 3D a várias cores. Depois do Natal guarda-se e volta a servir.',
    descEn: 'A panettone holder dressed as Santa: red coat, black belt with a gold buckle and white trim. Drop the wrapped panettone inside and the gift is ready to give or to go on the table. 3D-printed in several colors. After Christmas, store it and use it again.',
    price: 12.00,
    tag: 'Natal',
    tone: 'red',
    icon: '🎅',
    images: [
      '/images/porta-panetone-pai-natal-1.webp',
      '/images/porta-panetone-pai-natal-2.webp'
    ],
    semLicencaVenda: true,
  },
  {
    // MeshBeeLab 3d — https://makerworld.com/en/models/3297350
    id: 'enfeite-feliz-natal-laco',
    name: 'Enfeite Feliz Natal com Laço',
    nameEn: '"Feliz Natal" Bow Ornament',
    desc: 'Enfeite redondo com "Feliz Natal" em letras brancas, azevinho, estrelas e um laço verde no topo. Impresso em 3D a várias cores. Pendura-se na árvore, num embrulho ou no porta-chaves — e é um mimo barato para juntar a qualquer prenda.',
    descEn: 'A round ornament with "Feliz Natal" (Merry Christmas in Portuguese) in white lettering, holly, stars and a green bow on top. 3D-printed in several colors. Hang it on the tree, on a wrapped gift or on a keyring — a small extra to add to any present.',
    price: 2.50,
    pack: { qty: 5, unitPrice: 2 }, // 5 por 10 €
    tag: 'Natal',
    tone: 'red',
    icon: '🎀',
    images: [
      '/images/enfeite-feliz-natal-laco-1.webp',
      '/images/enfeite-feliz-natal-laco-2.webp'
    ],
    semLicencaVenda: true,
  },
  {
    // Clean Studio — https://makerworld.com/en/models/3535506
    id: 'ursinho-tricotado-natal',
    name: 'Ursinho Tricotado de Natal',
    nameEn: 'Knitted Christmas Teddy Bear',
    desc: 'Ursinho de pé com barrete de Pai Natal e textura de malha — parece tricotado à mão, mas é impresso em 3D. Mãos juntas e olhar de quem pede uma bolacha. Para a prateleira, o quarto dos miúdos ou para acompanhar uma prenda.',
    descEn: 'A standing teddy bear in a Santa hat with a knitted texture — it looks hand-knitted, but it is 3D-printed. Paws together and the look of someone asking for a cookie. For a shelf, a kids’ room or to go along with a gift.',
    price: 18.00,
    tag: 'Natal',
    tone: 'red',
    icon: '🧸',
    images: [
      '/images/ursinho-tricotado-natal-1.webp',
      '/images/ursinho-tricotado-natal-2.webp'
    ],
    semLicencaVenda: true,
  },
  {
    // Smoggy3D — https://makerworld.com/en/models/2103225
    id: 'pai-natal-tricotado',
    name: 'Pai Natal Tricotado',
    nameEn: 'Knitted Santa',
    desc: 'Pai Natal sentado com textura de malha — parece tricotado à mão, mas é impresso em 3D a várias cores. Barrete, barba e botas com o ponto bem marcado. Para a prateleira, a secretária ou o centro da mesa da consoada.',
    descEn: 'A sitting Santa with a knitted texture — it looks hand-knitted, but it is 3D-printed in several colors. Hat, beard and boots with crisp stitches. For a shelf, a desk or the centre of the Christmas table.',
    price: 18.00,
    tag: 'Natal',
    tone: 'red',
    icon: '🎅',
    images: [
      '/images/pai-natal-tricotado-1.webp',
      '/images/pai-natal-tricotado-2.webp'
    ],
    semLicencaVenda: true,
  },
  {
    // Razec Lab — https://makerworld.com/en/models/3548244
    id: 'suporte-doces-pai-natal',
    name: 'Suporte de Doces Pai Natal',
    nameEn: 'Santa Dessert Stand',
    desc: 'Um Pai Natal bem-disposto a segurar o tabuleiro dos doces por cima da cabeça — centro de mesa para a consoada, o lanche de Natal ou a montra. Impresso em 3D, com prato redondo de rebordo para nada escorregar. Em PLA: usa com doces embrulhados, forminhas ou um naperon de papel por baixo.',
    descEn: 'A cheerful Santa holding the dessert tray above his head — a centerpiece for Christmas Eve, a festive tea or a shop window. 3D-printed, with a round rimmed plate so nothing slides off. Made of PLA: use it with wrapped sweets, cupcake cases or a paper doily underneath.',
    price: 20.00,
    tag: 'Natal',
    tone: 'red',
    icon: '🍬',
    images: [
      '/images/suporte-doces-pai-natal-1.webp',
      '/images/suporte-doces-pai-natal-2.webp'
    ],
    semLicencaVenda: true,
  },
  {
    // Razec Lab — https://makerworld.com/en/models/3462716
    id: 'bota-pai-natal-porta-talheres',
    name: 'Bota do Pai Natal Porta-Talheres',
    nameEn: 'Santa Boot Cutlery Holder',
    desc: 'A bota do Pai Natal para pôr na mesa: vermelha, com pelo branco, cinto preto e fivela dourada. Leva os talheres da consoada — e também serve para guardanapos, bengalas doces, canetas ou um raminho de azevinho. Impressa em 3D a várias cores.',
    descEn: 'Santa’s boot for the table: red, with white fur trim, a black belt and a gold buckle. It holds the cutlery for Christmas dinner — and also napkins, candy canes, pens or a sprig of holly. 3D-printed in several colors.',
    price: 13.00,
    tag: 'Natal',
    tone: 'red',
    icon: '🥾',
    images: [
      '/images/bota-pai-natal-porta-talheres-1.webp',
      '/images/bota-pai-natal-porta-talheres-2.webp'
    ],
    semLicencaVenda: true,
  },
];

/**
 * Catálogo efetivo. Em produção saem os modelos sem licença de venda (ver
 * `semLicencaVenda`): não aparecem, não têm página e o checkout recusa-os,
 * porque tudo o resto parte daqui.
 */
export const PRODUCTS: Product[] =
  process.env.NODE_ENV === 'production'
    ? TODOS_OS_PRODUTOS.filter((p) => !p.semLicencaVenda)
    : TODOS_OS_PRODUTOS;

/**
 * Produtos LISTADOS no site (catálogo, destaques, sitemap). Exclui os marcados
 * `hidden` (ex.: ainda sem foto). A página /produto/<id> continua a funcionar
 * por link direto mesmo para os escondidos — só não aparecem nas listagens.
 */
export const VISIBLE_PRODUCTS = PRODUCTS.filter((p) => !p.hidden);

/**
 * Secções do catálogo: cada nicho com os seus produtos, na ordem de NICHES.
 * Nichos sem produtos ficam de fora — nunca se renderiza uma secção vazia.
 *
 * EM DESENVOLVIMENTO mostra também os produtos `hidden` (ainda sem foto),
 * marcados como rascunho, para se acompanhar o roteiro enquanto se adicionam
 * peças. EM PRODUÇÃO só entram os publicáveis — o site ao vivo nunca mostra
 * cartões por acabar.
 */
const PRODUTOS_CATALOGO =
  process.env.NODE_ENV === 'production' ? VISIBLE_PRODUCTS : PRODUCTS;

export const CATALOGO_SECOES = NICHES.map((n) => ({
  ...n,
  products: PRODUTOS_CATALOGO.filter((p) => p.tag === n.label),
})).filter((n) => n.products.length > 0);

// Aviso em dev se algum produto apontar para um nicho que não existe — sem
// isto, um typo no `tag` fazia o produto desaparecer do catálogo em silêncio.
if (process.env.NODE_ENV !== 'production') {
  const labels = new Set(NICHES.map((n) => n.label));
  const orfaos = PRODUCTS.filter((p) => !labels.has(p.tag)).map((p) => `${p.id} → "${p.tag}"`);
  if (orfaos.length) {
    console.warn(`[products] tag sem nicho correspondente:\n  ${orfaos.join('\n  ')}`);
  }
}

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

/**
 * Preço unitário efetivo dado o total de unidades do mesmo produto: o mais
 * baixo entre o preço normal, o de conjunto (`pack`) e o de atacado.
 */
export function unitPriceFor(
  price: number,
  qtyOfSameProduct: number,
  pack?: Product['pack']
): number {
  let unit = price;
  if (pack && qtyOfSameProduct >= pack.qty) unit = Math.min(unit, pack.unitPrice);
  if (qtyOfSameProduct >= WHOLESALE_MIN_QTY) unit = Math.min(unit, price * (1 - WHOLESALE_DISCOUNT));
  return unit;
}
