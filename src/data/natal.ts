// Campanha de Natal — tudo o que muda de ano para ano vive AQUI.
// A secção da home (components/sections/Natal.tsx) lê estas datas e peças.

import { VISIBLE_PRODUCTS, type Product } from '@/data/products';

/**
 * Datas da campanha (hora local do visitante).
 *
 * - `ultimoDia`: último dia para encomendar com entrega antes do Natal.
 *   É uma PROMESSA ao cliente — confirmar todos os anos contra a fila de
 *   impressão e os prazos dos CTT antes de publicar.
 * - `fim`: a partir deste dia a secção deixa de aparecer sozinha.
 */
export const NATAL = {
  ano: 2026,
  ultimoDia: new Date(2026, 11, 15, 23, 59, 59), // 15 de dezembro
  fim: new Date(2026, 11, 25, 0, 0, 0), // 25 de dezembro
} as const;

export type FaseNatal = 'a-tempo' | 'ultima-hora' | 'terminada';

export function faseNatal(agora: Date): FaseNatal {
  if (agora >= NATAL.fim) return 'terminada';
  return agora <= NATAL.ultimoDia ? 'a-tempo' : 'ultima-hora';
}

/** Dias que faltam até ao último dia de encomenda (0 = é hoje). */
export function diasAteUltimoDia(agora: Date): number {
  const MS_DIA = 24 * 60 * 60 * 1000;
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const alvo = new Date(
    NATAL.ultimoDia.getFullYear(),
    NATAL.ultimoDia.getMonth(),
    NATAL.ultimoDia.getDate()
  );
  return Math.max(0, Math.round((alvo.getTime() - hoje.getTime()) / MS_DIA));
}

/**
 * Peças em destaque na faixa de Natal da home, pela ordem em que aparecem.
 * São produtos normais do catálogo (src/data/products.ts): o preço, as fotos,
 * a página e o checkout vêm de lá — aqui só se escolhe quais e a ordem.
 * Ids que não existam (ou escondidos) ficam de fora sem partir a página.
 */
export type GrupoNatal = 'arvore' | 'decoracao' | 'mesa' | 'oferecer';

/** Ordem dos filtros da faixa (os rótulos PT/EN vivem em Natal.tsx). */
export const GRUPOS_NATAL: GrupoNatal[] = ['arvore', 'decoracao', 'mesa', 'oferecer'];

/** id do produto → grupo do filtro. A ordem das chaves é a ordem dos cartões. */
const DESTAQUES_NATAL: Record<string, GrupoNatal> = {
  'enfeite-patinha-pet': 'arvore',
  'letreiro-feliz-natal': 'decoracao',
  // Só teste (sem licença de venda) — em produção não existem e saem sozinhos.
  'enfeite-camisola-rena-nome': 'arvore',
  'porta-panetone-pai-natal': 'mesa',
  'enfeite-feliz-natal-laco': 'arvore',
  'ursinho-tricotado-natal': 'decoracao',
  'pai-natal-tricotado': 'decoracao',
  'suporte-doces-pai-natal': 'mesa',
  'bota-pai-natal-porta-talheres': 'mesa',
};

export function grupoNatal(id: string): GrupoNatal {
  return DESTAQUES_NATAL[id] ?? 'decoracao';
}

export const PECAS_NATAL: Product[] = Object.keys(DESTAQUES_NATAL).map((id) =>
  VISIBLE_PRODUCTS.find((p) => p.id === id)
).filter((p): p is Product => Boolean(p?.images?.[0]));
