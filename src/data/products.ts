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
  /** Material de impressão (default: 'PLA'). Usado no schema Product. */
  material?: string;
  /**
   * Arquivo STL associado (apenas para produtos digitais).
   * `file` = nome do arquivo dentro da pasta privada `private-stl/`.
   * `downloadName` = nome que o cliente verá ao baixar.
   */
  stl?: { file: string; downloadName: string };
};

export const PRODUCTS: Product[] = [
  { id: 'miniatura-bananao', name: 'Bananão', nameEn: 'Big Banana', desc: 'Peça exclusiva impressa em PLA de alta qualidade.', descEn: 'Exclusive collectible printed in high-quality PLA.', price: 30, tag: 'Colecionável', tone: 'orange', icon: '🍌', images: ['/images/bananao.jpg', '/images/bananao-2.jpg', '/images/bananao-3.jpg'] },
  { id: 'miniatura-canarinho', name: 'Canarinho Furioso', nameEn: 'Furious Canary', desc: 'Mascote da Seleção Brasileira impresso em PLA.', descEn: 'Brazilian national team mascot printed in PLA.', price: 30, tag: 'Colecionável', tone: 'olive', icon: '🦜', images: ['/images/canarinho-front.jpg', '/images/canarinho.jpg', '/images/canarinho-2.jpg'] },
  { id: 'miniatura-mascote-canada', name: 'Mascote do Canadá', nameEn: 'Canada Mascot', desc: 'Mascote oficial impresso em PLA de alta qualidade.', descEn: 'Official mascot printed in high-quality PLA.', price: 30, tag: 'Colecionável', tone: 'orange', icon: '🦌', images: ['/images/mascote-canada-1.jpg', '/images/mascote-canada-2.jpg', '/images/mascote-canada-3.jpg'] },
  { id: 'miniatura-aguia-america', name: 'Águia América', nameEn: 'America Eagle', desc: 'Mascote da Copa impresso em PLA de alta resolução.', descEn: 'World Cup mascot printed in high-resolution PLA.', price: 30, tag: 'Colecionável', tone: 'blue', icon: '🦅', images: ['/images/aguia-america-1.jpg', '/images/aguia-america-2.jpg', '/images/aguia-america-3.jpg'] },
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
  {
    id: 'porta-latas-monster',
    name: 'Porta-Latas Monster',
    nameEn: 'Monster Can Holder',
    desc: 'Porta-latas 3D exclusivo Monster Energy. Personalizável com o teu nome! Inclui tampa e porta-chaves.',
    descEn: 'Exclusive Monster Energy 3D can holder. Customizable with your name! Includes lid and keychain.',
    price: 15,
    tag: 'Acessório',
    tone: 'blue',
    icon: '🥤',
    images: [
      '/images/porta-latas-monster-3.jpg',
      '/images/porta-latas-monster-2.jpg',
      '/images/porta-latas-monster-1.jpg',
      '/images/porta-latas-monster-4.jpg',
      '/images/porta-latas-monster-5.jpg',
      '/images/porta-latas-monster-6.jpg'
    ],
    customizations: [
      {
        id: 'nome',
        label: 'Nome a gravar (opcional)',
        labelEn: 'Name to engrave (optional)',
        type: 'text',
        maxLength: 12
      }
    ]
  },
  { id: 'trofeu-quimono', name: 'Troféu Quimono Personalizado', nameEn: 'Personalized Gi Trophy', desc: 'Troféu de artes marciais com um mini-quimono de aspeto realista sobre pódio, e uma placa com o nome de quem o merece. Escolhes a cor do fato e a cor da faixa (branca, azul, roxa, castanha ou preta). A lembrança perfeita para graduações de jiu-jitsu, judo ou karaté — para o teu atleta ou para a turma toda.', descEn: "A martial-arts trophy with a realistic-looking mini gi on a pedestal, and a nameplate for whoever earned it. You choose the gi color and the belt color (white, blue, purple, brown or black). The perfect keepsake for jiu-jitsu, judo or karate gradings — for your athlete or the whole class.", price: 25, tag: 'Colecionável', tone: 'slate', icon: '🥋', images: ['/images/trofeu-quimono-1.jpg', '/images/trofeu-quimono-2.jpg', '/images/trofeu-quimono-3.jpg'], customizations: [ { id: 'nome', label: 'Nome na placa (ex: JOÃO SILVA)', labelEn: 'Name on the plate (e.g. JOÃO SILVA)', type: 'text', maxLength: 18 }, { id: 'fato', label: 'Cor do fato (ex: branco, preto, azul)', labelEn: 'Gi color (e.g. white, black, blue)', type: 'text', maxLength: 20 }, { id: 'faixa', label: 'Cor da faixa (branca, azul, roxa, castanha, preta)', labelEn: 'Belt color (white, blue, purple, brown, black)', type: 'text', maxLength: 20 } ] },
  { id: 'suporte-comando-neon', name: 'Suporte de Comando PS5 — Neon Vice', nameEn: 'PS5 Controller Stand — Neon Vice', desc: 'Suporte de comando PS5 com atitude de cidade neon dos anos 80: palmeiras verdes, base preta com detalhes cor-de-rosa e uma placa "Wanted" que personalizas com a tua gamertag. Uma peça de secretária que dá logo nas vistas. Ideal para gamers.', descEn: 'A PS5 controller stand with full 80s neon-city attitude: green palm trees, a black base with pink accents and a "Wanted" plate you personalize with your gamertag. A desk piece that stands out right away. Perfect for gamers.', price: 40, tag: 'Acessório', tone: 'purple', icon: '🎮', images: ['/images/suporte-comando-ps5-1.webp', '/images/suporte-comando-ps5-2.webp', '/images/suporte-comando-ps5-3.webp'], customizations: [ { id: 'gamertag', label: 'Gamertag para a placa (ex: NIGHT_RIDER)', labelEn: 'Gamertag for the plate (e.g. NIGHT_RIDER)', type: 'text', maxLength: 16 } ] },
  { id: 'porta-latas-ratinha-rosa', name: 'Porta-Latas Ratinha Rosa', nameEn: 'Pink Mouse Can Holder', desc: 'Porta-latas 3D em formato de mini-galão, todo cor-de-rosa e cheio de estilo: laço amovível no topo, pendente e torneira decorativa. Metes a lata dentro e bebes com o visual mais fofo da mesa. Personalizável com o teu nome.', descEn: 'A 3D can holder shaped like a mini cooler jug, all pink and full of style: removable bow on top, charm and a decorative tap. Pop your can inside and sip with the cutest look on the table. Customizable with your name.', price: 20, tag: 'Acessório', tone: 'purple', icon: '🥤', images: ['/images/porta-latas-ratinha-rosa-1.jpg', '/images/porta-latas-ratinha-rosa-2.jpg'], customizations: [ { id: 'nome', label: 'Nome a gravar (opcional)', labelEn: 'Name to engrave (optional)', type: 'text', maxLength: 12 } ] },
  { id: 'porta-latas-monster-black', name: 'Porta-Latas Monster (Preto)', nameEn: 'Monster Can Holder (Black)', desc: 'Versão em preto e verde. Porta-latas térmico 3D Monster Energy. Inclui tampa e porta-chaves.', descEn: 'Black and green edition. Insulated Monster Energy 3D can holder. Includes lid and keychain.', price: 15, tag: 'Acessório', tone: 'green', icon: '🥤', images: ['/images/porta-latas-monster-black-5.jpg', '/images/porta-latas-monster-black-1.jpg', '/images/porta-latas-monster-black-2.jpg', '/images/porta-latas-monster-black-3.jpg', '/images/porta-latas-monster-black-4.jpg', '/images/porta-latas-monster-black-6.jpg'] },
  { id: 'caixa-copa-brasil', name: 'Caixa Copa Brasil', nameEn: 'Brazil World Cup Box', desc: 'Caixinha temática do Brasil impressa em 3D. Perfeita para guardar os teus objetos com estilo.', descEn: 'Brazil-themed 3D printed box. Perfect for storing your bits and pieces in style.', price: 15, tag: 'Colecionável', tone: 'olive', icon: '📦', images: ['/images/caixa-copa-brasil-1.jpg', '/images/caixa-copa-brasil-3.jpg', '/images/caixa-copa-brasil-2.jpg'] },
  { id: 'caixa-copa-rosa', name: 'Caixa Copa Brasil (Rosa)', nameEn: 'Brazil World Cup Box (Pink)', desc: 'Edição em tons de rosa e roxo da caixinha temática do Brasil. Perfeita para guardar os teus objetos com estilo.', descEn: 'Pink and purple edition of the Brazil-themed box. Perfect for storing your bits and pieces in style.', price: 15, tag: 'Colecionável', tone: 'purple', icon: '📦', images: ['/images/caixa-copa-rosa-1.jpg', '/images/caixa-copa-rosa-2.jpg', '/images/caixa-copa-rosa-3.jpg'] },
  { id: 'caixa-copa-eua', name: 'Caixa Copa EUA', nameEn: 'USA World Cup Box', desc: 'Caixinha temática dos Estados Unidos impressa em 3D. Excelente para guardar os teus objetos.', descEn: 'USA-themed 3D printed box. Great for keeping your belongings safe.', price: 15, tag: 'Colecionável', tone: 'red', icon: '📦', images: ['/images/caixa-copa-eua-1.jpg', '/images/caixa-copa-eua-2.jpg', '/images/caixa-copa-eua-3.jpg'] },
  { id: 'caixa-copa-canada', name: 'Caixa Copa Canadá', nameEn: 'Canada World Cup Box', desc: 'Caixinha temática do Canadá impressa em 3D com a folha de bordo. Excelente para guardar pequenos objetos.', descEn: 'Canada-themed 3D printed box featuring the maple leaf. Great for storing small items.', price: 15, tag: 'Colecionável', tone: 'orange', icon: '📦', images: ['/images/caixa-copa-canada-1.jpg', '/images/caixa-copa-canada-3.jpg', '/images/caixa-copa-canada-2.jpg'] },
  { id: 'chaveiro-gym', name: 'Porta-Chaves Peso de Ginásio', nameEn: 'Gym Weight Plate Keychain', desc: 'Porta-chaves em formato de disco de 20kg impresso em 3D. O presente ideal para quem não falta a um treino!', descEn: '3D printed keychain shaped like a 20kg weight plate. The perfect gift for anyone who never skips a workout!', price: 3, tag: 'Porta-Chaves', tone: 'slate', icon: '🏋️', images: ['/images/chaveiro-gym.jpg'] },
  { id: 'chaveiro-hexagono', name: 'Porta-Chaves Hexágono Fidget', nameEn: 'Fidget Hexagon Keychain', desc: 'Porta-chaves interativo impresso em filamento bicolor metalizado. Divertido para mexer!', descEn: 'Interactive keychain printed in metallic dual-color filament. Fun to fidget with!', price: 3, tag: 'Porta-Chaves', tone: 'indigo', icon: '🔑', images: ['/images/chaveiro-hexagono.jpg'] },
  { id: 'chaveiro-capivara', name: 'Porta-Chaves Capivara Articulada', nameEn: 'Articulated Capybara Keychain', desc: 'O animal mais adorável da internet, agora em porta-chaves! Impresso com filamento bicolor para um efeito incrível e é totalmente articulado.', descEn: "The internet's most adorable animal, now as a keychain! Printed in dual-color filament for a stunning effect, and fully articulated.", price: 3, tag: 'Porta-Chaves', tone: 'purple', icon: '🐾', images: ['/images/chaveiro-capivara-1.jpg', '/images/chaveiro-capivara-2.jpg', '/images/chaveiro-capivara-3.jpg'] },
  { id: 'chaveiro-polvo', name: 'Porta-Chaves Polvo Articulado (Brasil)', nameEn: 'Articulated Octopus Keychain (Brazil)', desc: 'Porta-chaves de um polvo verde totalmente articulado com a temática do Brasil. Divertido, mexe os tentáculos e é impresso em 3D!', descEn: 'Fully articulated green octopus keychain with a Brazil theme. Fun, with wiggly tentacles, and 3D printed!', price: 3, tag: 'Porta-Chaves', tone: 'green', icon: '🐙', images: ['/images/chaveiro-polvo-1.jpg', '/images/chaveiro-polvo-2.jpg'] },
  {
    id: 'porta-latas-benfica',
    name: 'Caneca Benfica',
    nameEn: 'Benfica Mug',
    desc: 'A caneca perfeita para os verdadeiros adeptos do Glorioso! Com as cores e a mística do Benfica, e totalmente personalizável com o teu nome.',
    descEn: "The perfect mug for true Benfica supporters! Featuring the club's colors and spirit, fully customizable with your name.",
    price: 20,
    tag: 'Canecas',
    tone: 'red',
    icon: '🦅',
    images: ['/images/porta-latas-benfica-1.jpg', '/images/porta-latas-benfica-2.jpg', '/images/porta-latas-benfica-3.jpg'],
    customizations: [
      {
        id: 'nome_frontal',
        label: 'Nome frontal (ex: ISRAEL)',
        labelEn: 'Front name (e.g. ISRAEL)',
        type: 'text',
        maxLength: 15,
        required: true
      },
      {
        id: 'nome_pega',
        label: 'Nome na pega (ex: ISRAEL VIEIRA)',
        labelEn: 'Handle name (e.g. ISRAEL VIEIRA)',
        type: 'text',
        maxLength: 20,
        required: true
      }
    ]
  },
  { id: 'chaveiro-menino', name: 'Porta-Chaves Menino Brasil', nameEn: 'Brazil Boy Keychain', desc: 'Porta-chaves de menino com a camisola 10 do Brasil. Impresso em 3D com várias cores!', descEn: "Keychain of a boy wearing Brazil's number 10 shirt. 3D printed in multiple colors!", price: 4, tag: 'Porta-Chaves', tone: 'yellow', icon: '👦', images: ['/images/chaveiro-menino.jpg'] },
  { id: 'chaveiro-taca', name: 'Porta-Chaves Taça do Mundo', nameEn: 'World Cup Trophy Keychain', desc: 'Porta-chaves em formato de Taça do Mundo impressa em 3D. Leva a glória para todo o lado!', descEn: '3D printed World Cup trophy keychain. Carry the glory everywhere you go!', price: 3, tag: 'Porta-Chaves', tone: 'yellow', icon: '🏆', images: ['/images/chaveiro-taca.jpg'] },
  { id: 'chaveiro-camisa-ronaldo', name: 'Porta-Chaves Camisola Ronaldo', nameEn: 'Ronaldo Shirt Keychain', desc: 'Porta-chaves com a mítica camisola 7 de Portugal. Para os verdadeiros fãs!', descEn: "Keychain featuring Portugal's legendary number 7 shirt. For true fans!", price: 3, tag: 'Porta-Chaves', tone: 'red', icon: '👕', images: ['/images/chaveiro-camisa-ronaldo.jpg'] },
  { id: 'chaveiro-spinner-brasil', name: 'Porta-Chaves Spinner Brasil', nameEn: 'Brazil Spinner Keychain', desc: 'Porta-chaves interativo com a bandeira do Brasil que gira! Divertido e perfeito para aliviar o stress.', descEn: 'Interactive keychain with a spinning Brazilian flag! Fun and perfect for stress relief.', price: 3, tag: 'Porta-Chaves', tone: 'green', icon: '🌀', images: ['/images/chaveiro-spinner-brasil.jpg'] },
  { id: 'porta-chaves-tecla-fidget', name: 'Porta-Chaves Tecla Fidget', nameEn: 'Keycap Fidget Keychain', desc: 'Uma tecla de teclado mecânico em porta-chaves que faz clique — o fidget perfeito para quem vive no código. Escolhe o teu modelo: Claude, Gemini ou Codex. Carrega e clica sempre que precisares de foco (ou de aliviar o stress).', descEn: 'A mechanical-keyboard keycap keychain that clicks — the perfect fidget for anyone who lives in the code. Pick your model: Claude, Gemini or Codex. Press and click whenever you need focus (or to de-stress).', price: 4, tag: 'Porta-Chaves', tone: 'slate', icon: '⌨️', images: ['/images/porta-chaves-tecla-fidget-1.jpg', '/images/porta-chaves-tecla-fidget-2.jpg', '/images/porta-chaves-tecla-fidget-3.jpg', '/images/porta-chaves-tecla-fidget-4.jpg'], customizations: [ { id: 'modelo', label: 'Qual queres? (Claude, Gemini ou Codex)', labelEn: 'Which one? (Claude, Gemini or Codex)', type: 'text', maxLength: 20 } ] },
  { id: 'chaveiro-mini-caneca', name: 'Porta-Chaves Mini Caneca Fidget', nameEn: 'Mini Mug Fidget Keychain', desc: 'Mini-caneca de café em porta-chaves com clique fidget — carrega no topo e faz aquele clique viciante e anti-stress. Super fofa, com o topo à escolha: marshmallows, coração, coelho, chantilly ou latte art. O detalhe perfeito para mochilas e chaves.', descEn: 'A mini coffee-mug fidget keychain that clicks — press the top for that addictive, stress-busting click. Super cute, with your topping of choice: marshmallows, heart, bunny, whipped cream or latte art. The perfect detail for backpacks and keys.', price: 4, tag: 'Porta-Chaves', tone: 'purple', icon: '☕', images: ['/images/porta-chaves-mini-caneca-1.jpg', '/images/porta-chaves-mini-caneca-2.jpg', '/images/porta-chaves-mini-caneca-3.jpg', '/images/porta-chaves-mini-caneca-4.jpg'], customizations: [ { id: 'topo', label: 'Topo à escolha (ex: marshmallows, coração, coelho, chantilly, latte art)', labelEn: 'Topping of choice (e.g. marshmallows, heart, bunny, whipped cream, latte art)', type: 'text', maxLength: 40 } ] },
  { id: 'caneca-brasil', name: 'Caneca Seleção Brasil', nameEn: 'Brazil National Team Mug', desc: 'Caneca com a temática da Seleção do Brasil. Perfeita para os fãs da Canarinha.', descEn: 'Brazilian national team themed mug. Perfect for Seleção fans.', price: 20, tag: 'Canecas', tone: 'yellow', icon: '☕', images: ['/images/caneca-brasil-1.jpg', '/images/caneca-brasil-2.jpg', '/images/caneca-brasil-3.jpg'] },
  { id: 'caneca-palmeiras', name: 'Caneca Palmeiras', nameEn: 'Palmeiras Mug', desc: 'Caneca "Verdão" para os adeptos do Palmeiras, com o escudo e as cores alviverdes. Personalizável com o teu nome.', descEn: '"Verdão" mug for Palmeiras supporters, featuring the club crest and green-and-white colors. Customizable with your name.', price: 20, tag: 'Canecas', tone: 'green', icon: '☕', images: ['/images/caneca-palmeiras-1.jpg'], customizations: [ { id: 'nome', label: 'Nome a gravar (ex: ISRAEL)', labelEn: 'Name to engrave (e.g. ISRAEL)', type: 'text', maxLength: 12 } ] },
  { id: 'caneca-vasco', name: 'Caneca Vasco', nameEn: 'Vasco Mug', desc: 'Caneca "Gigante da Colina" para os Vascaínos, com o escudo clássico em preto e branco. Personalizável com o teu nome.', descEn: '"Gigante da Colina" mug for Vasco fans, featuring the classic black-and-white crest. Customizable with your name.', price: 20, tag: 'Canecas', tone: 'slate', icon: '☕', images: ['/images/caneca-vasco-1.jpg'], customizations: [ { id: 'nome', label: 'Nome a gravar (ex: ISRAEL)', labelEn: 'Name to engrave (e.g. ISRAEL)', type: 'text', maxLength: 12 } ] },
  { id: 'caneca-corinthians', name: 'Caneca Corinthians', nameEn: 'Corinthians Mug', desc: 'Caneca "Timão" para a Fiel, com o escudo do Corinthians em preto, branco e vermelho. Personalizável com o teu nome.', descEn: '"Timão" mug for the Corinthians faithful, featuring the crest in black, white and red. Customizable with your name.', price: 20, tag: 'Canecas', tone: 'slate', icon: '☕', images: ['/images/caneca-corinthians-1.jpg'], customizations: [ { id: 'nome', label: 'Nome a gravar (ex: ISRAEL)', labelEn: 'Name to engrave (e.g. ISRAEL)', type: 'text', maxLength: 12 } ] },
];

export const PRODUCT_TAGS = ['Todos', ...Array.from(new Set(PRODUCTS.map((p) => p.tag)))];

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
