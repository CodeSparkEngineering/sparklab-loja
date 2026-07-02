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
