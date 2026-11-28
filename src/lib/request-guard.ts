import { SITE_URL } from '@/data/site';

/**
 * Guardas partilhadas pelas rotas /api/*: origem permitida + limite de pedidos.
 */

/** Só os nossos domínios (mais o próprio host em dev e em previews da Vercel). */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (
    origin === SITE_URL ||
    origin === 'https://sparklab3d.pt' ||
    origin === 'https://sparklab-loja.vercel.app' // URL antiga da Vercel, ainda ativa
  ) {
    return true;
  }
  const mesmoHost =
    process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview';
  return mesmoHost && origin === new URL(request.url).origin;
}

/** IP do visitante. Na Vercel estes cabeçalhos são postos pela plataforma. */
export function clientIp(request: Request): string {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = request.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'desconhecido';
}

/**
 * Limite de pedidos por IP, em memória (janela fixa).
 *
 * ATENÇÃO: a memória é POR INSTÂNCIA da função. A Vercel reutiliza instâncias
 * (Fluid Compute), por isso isto trava o abuso simples — um script a martelar
 * a rota — mas não é uma garantia global: com várias instâncias ativas, o
 * limite efetivo é maior. A defesa completa é uma regra de Rate Limit na
 * Firewall da Vercel sobre /api/*; isto é a camada que vive no código.
 */
const baldes = new Map<string, { n: number; reset: number }>();

export function rateLimit(
  request: Request,
  nome: string,
  max: number,
  janelaMs: number
): { ok: boolean; retryAfter: number } {
  const agora = Date.now();

  // Limpeza ocasional para o Map não crescer sem fim numa instância longa.
  if (baldes.size > 5000) {
    for (const [k, b] of baldes) if (b.reset <= agora) baldes.delete(k);
  }

  const chave = `${nome}:${clientIp(request)}`;
  const balde = baldes.get(chave);
  if (!balde || balde.reset <= agora) {
    baldes.set(chave, { n: 1, reset: agora + janelaMs });
    return { ok: true, retryAfter: 0 };
  }
  balde.n += 1;
  return {
    ok: balde.n <= max,
    retryAfter: Math.ceil((balde.reset - agora) / 1000),
  };
}
