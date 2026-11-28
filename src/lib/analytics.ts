/**
 * Eventos de e-commerce do GA4 (add_to_cart → begin_checkout → purchase).
 * Dão o funil completo, incluindo quem abandona ANTES de chegar à Stripe.
 * Se o gtag não existir (sem consentimento ou bloqueado), não faz nada.
 */
type GaItem = { item_id: string; item_name: string; price: number; quantity: number };

export function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag('event', name, { currency: 'EUR', ...params });
  } catch {
    // nunca partir a loja por causa de analytics
  }
}

export type { GaItem };
