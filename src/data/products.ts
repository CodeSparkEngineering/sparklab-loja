// Fonte ÚNICA de verdade dos produtos do catálogo.
// Usada tanto pela UI (catálogo/carrinho) quanto pelo servidor (checkout).
// IMPORTANTE: o preço autoritativo vem daqui no servidor — nunca confie
// no preço enviado pelo cliente.

export type ProductTone = 'orange' | 'blue' | 'olive' | 'sand';

export type CustomizationOption = {
  id: string;
  label: string;
  type: 'color' | 'text';
  options?: string[]; // Para type 'color'
  maxLength?: number; // Para type 'text'
};

export type Product = {
  id: string;
  name: string;
  desc: string;
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
  { id: 'miniatura-bananao', name: 'Bananão', desc: 'Peça exclusiva impressa em PLA de alta qualidade.', price: 30, tag: 'Colecionável', tone: 'orange', icon: '🍌', images: ['/images/bananao.jpg', '/images/bananao-2.jpg', '/images/bananao-3.jpg'] },
  { id: 'miniatura-canarinho', name: 'Canarinho Furioso', desc: 'Mascote da Seleção Brasileira impresso em PLA.', price: 30, tag: 'Colecionável', tone: 'olive', icon: '🦜', images: ['/images/canarinho-front.jpg', '/images/canarinho.jpg', '/images/canarinho-2.jpg'] },
  { id: 'miniatura-mascote-canada', name: 'Mascote do Canadá', desc: 'Mascote oficial impresso em PLA de alta qualidade.', price: 30, tag: 'Colecionável', tone: 'orange', icon: '🦌', images: ['/images/mascote-canada-1.jpg', '/images/mascote-canada-2.jpg', '/images/mascote-canada-3.jpg'] },
  { id: 'miniatura-aguia-america', name: 'Águia América', desc: 'Mascote da Copa impresso em PLA de alta resolução.', price: 30, tag: 'Colecionável', tone: 'blue', icon: '🦅', images: ['/images/aguia-america-1.jpg', '/images/aguia-america-2.jpg', '/images/aguia-america-3.jpg'] },
  {
    id: 'porta-latas-monster',
    name: 'Porta-Latas Monster',
    desc: 'Porta-latas 3D exclusivo Monster Energy. Personalizável com o teu nome! Inclui tampa e porta-chaves.',
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
        type: 'text',
        maxLength: 12
      }
    ]
  },
  { id: 'porta-latas-monster-black', name: 'Porta-Latas Monster (Preto)', desc: 'Versão em preto e verde. Porta-latas térmico 3D Monster Energy. Inclui tampa e porta-chaves.', price: 15, tag: 'Acessório', tone: 'green', icon: '🥤', images: ['/images/porta-latas-monster-black-5.jpg', '/images/porta-latas-monster-black-1.jpg', '/images/porta-latas-monster-black-2.jpg', '/images/porta-latas-monster-black-3.jpg', '/images/porta-latas-monster-black-4.jpg'] },
  { id: 'caixa-copa-brasil', name: 'Caixa Copa Brasil', desc: 'Caixinha temática do Brasil impressa em 3D. Perfeita para guardar os teus objetos com estilo.', price: 15, tag: 'Colecionável', tone: 'olive', icon: '📦', images: ['/images/caixa-copa-brasil-1.jpg', '/images/caixa-copa-brasil-3.jpg', '/images/caixa-copa-brasil-2.jpg'] },
  { id: 'caixa-copa-rosa', name: 'Caixa Copa Brasil (Rosa)', desc: 'Edição em tons de rosa e roxo da caixinha temática do Brasil. Perfeita para guardar os teus objetos com estilo.', price: 15, tag: 'Colecionável', tone: 'purple', icon: '📦', images: ['/images/caixa-copa-rosa-1.jpg', '/images/caixa-copa-rosa-2.jpg', '/images/caixa-copa-rosa-3.jpg'] },
  { id: 'caixa-copa-eua', name: 'Caixa Copa EUA', desc: 'Caixinha temática dos Estados Unidos impressa em 3D. Excelente para guardar os teus objetos.', price: 15, tag: 'Colecionável', tone: 'red', icon: '📦', images: ['/images/caixa-copa-eua-1.jpg', '/images/caixa-copa-eua-2.jpg', '/images/caixa-copa-eua-3.jpg'] },
  { id: 'caixa-copa-canada', name: 'Caixa Copa Canadá', desc: 'Caixinha temática do Canadá impressa em 3D com a folha de bordo. Excelente para guardar pequenos objetos.', price: 15, tag: 'Colecionável', tone: 'orange', icon: '📦', images: ['/images/caixa-copa-canada-1.jpg', '/images/caixa-copa-canada-3.jpg', '/images/caixa-copa-canada-2.jpg'] },
  { id: 'chaveiro-gym', name: 'Porta-Chaves Peso de Ginásio', desc: 'Porta-chaves em formato de disco de 20kg impresso em 3D. O presente ideal para quem não falta a um treino!', price: 3, tag: 'Porta-Chaves', tone: 'slate', icon: '🏋️', images: ['/images/chaveiro-gym.jpg'] },
  { id: 'chaveiro-hexagono', name: 'Porta-Chaves Hexágono Fidget', desc: 'Porta-chaves interativo impresso em filamento bicolor metalizado. Divertido para mexer!', price: 3, tag: 'Porta-Chaves', tone: 'indigo', icon: '🔑', images: ['/images/chaveiro-hexagono.jpg'] },
  { id: 'chaveiro-capivara', name: 'Porta-Chaves Capivara Articulada', desc: 'O animal mais adorável da internet, agora em porta-chaves! Impresso com filamento bicolor para um efeito incrível e é totalmente articulado.', price: 3, tag: 'Porta-Chaves', tone: 'purple', icon: '🐾', images: ['/images/chaveiro-capivara-1.jpg', '/images/chaveiro-capivara-2.jpg', '/images/chaveiro-capivara-3.jpg'] },
  { id: 'chaveiro-polvo', name: 'Porta-Chaves Polvo Articulado (Brasil)', desc: 'Porta-chaves de um polvo verde totalmente articulado com a temática do Brasil. Divertido, mexe os tentáculos e é impresso em 3D!', price: 3, tag: 'Porta-Chaves', tone: 'green', icon: '🐙', images: ['/images/chaveiro-polvo-1.jpg', '/images/chaveiro-polvo-2.jpg'] },
  {
    id: 'porta-latas-benfica',
    name: 'Porta-Latas Benfica',
    desc: 'O porta-latas térmico ideal para os verdadeiros adeptos! Impresso em 3D com as cores e a mística do Glorioso. Totalmente personalizável com o teu nome.',
    price: 20,
    tag: 'Acessório',
    tone: 'red',
    icon: '🦅',
    images: ['/images/porta-latas-benfica-1.jpg', '/images/porta-latas-benfica-2.jpg', '/images/porta-latas-benfica-3.jpg'],
    customizations: [
      {
        id: 'nome_frontal',
        label: 'Nome frontal (ex: ISRAEL)',
        type: 'text',
        maxLength: 15
      },
      {
        id: 'nome_pega',
        label: 'Nome na pega (ex: ISRAEL VIEIRA)',
        type: 'text',
        maxLength: 20
      }
    ]
  },
  { id: 'chaveiro-menino', name: 'Porta-Chaves Menino Brasil', desc: 'Porta-chaves de menino com a camisola 10 do Brasil. Impresso em 3D com várias cores!', price: 4, tag: 'Porta-Chaves', tone: 'yellow', icon: '👦', images: ['/images/chaveiro-menino.jpg'] },
  { id: 'chaveiro-taca', name: 'Porta-Chaves Taça do Mundo', desc: 'Porta-chaves em formato de Taça do Mundo impressa em 3D. Leva a glória para todo o lado!', price: 3, tag: 'Porta-Chaves', tone: 'yellow', icon: '🏆', images: ['/images/chaveiro-taca.jpg'] },
  { id: 'chaveiro-camisa-ronaldo', name: 'Porta-Chaves Camisola Ronaldo', desc: 'Porta-chaves com a mítica camisola 7 de Portugal. Para os verdadeiros fãs!', price: 3, tag: 'Porta-Chaves', tone: 'red', icon: '👕', images: ['/images/chaveiro-camisa-ronaldo.jpg'] },
  { id: 'chaveiro-spinner-brasil', name: 'Porta-Chaves Spinner Brasil', desc: 'Porta-chaves interativo com a bandeira do Brasil que gira! Divertido e perfeito para aliviar o stress.', price: 3, tag: 'Porta-Chaves', tone: 'green', icon: '🌀', images: ['/images/chaveiro-spinner-brasil.jpg'] },
  // ── Canecas (seleções e clubes) — placeholders com emoji até haver fotos ──
  { id: 'caneca-portugal', name: 'Caneca Seleção Portugal', desc: 'Caneca com a temática da Seleção de Portugal. O presente ideal para os adeptos das Quinas.', price: 20, tag: 'Canecas', tone: 'red', icon: '☕' },
  { id: 'caneca-brasil', name: 'Caneca Seleção Brasil', desc: 'Caneca com a temática da Seleção do Brasil. Perfeita para os fãs da Canarinha.', price: 20, tag: 'Canecas', tone: 'yellow', icon: '☕' },
  { id: 'caneca-benfica', name: 'Caneca Benfica', desc: 'Caneca com as cores e a mística do Glorioso. Para os verdadeiros adeptos do Benfica.', price: 20, tag: 'Canecas', tone: 'red', icon: '☕' },
  { id: 'caneca-porto', name: 'Caneca FC Porto', desc: 'Caneca azul e branca para os adeptos do FC Porto. Um presente cheio de paixão portista.', price: 20, tag: 'Canecas', tone: 'blue', icon: '☕' },
  { id: 'caneca-sporting', name: 'Caneca Sporting CP', desc: 'Caneca verde e branca para os adeptos do Sporting. O presente certo para os leoninos.', price: 20, tag: 'Canecas', tone: 'olive', icon: '☕' },
];

export const PRODUCT_TAGS = ['Todos', ...Array.from(new Set(PRODUCTS.map((p) => p.tag)))];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
}
