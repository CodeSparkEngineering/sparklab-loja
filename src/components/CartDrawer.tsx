'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatEUR } from '@/data/products';
import { useLang, pName, cLabel } from '@/i18n/LanguageContext';
import { StripeMark } from '@/components/brand-marks';

const L = {
  pt: {
    title: 'O teu carrinho',
    close: 'Fechar carrinho',
    emptyText: 'O teu carrinho está vazio. Explora o catálogo para começar.',
    emptyCta: 'Explorar a loja',
    qtyMinus: 'Diminuir quantidade',
    qtyPlus: 'Aumentar quantidade',
    removeItem: (name: string) => `Remover ${name}`,
    remove: 'Remover',
    shipRemaining: (v: string) => <>Faltam <strong>{v}</strong> para teres <span>envio grátis</span> 🚚</>,
    shipDone: <>🎉 Boa! Tens <strong>envio grátis</strong>.</>,
    subtotal: 'Subtotal',
    wholesale: '−15% atacado',
    note: 'Portes calculados no checkout. Envio via CTT registado, com seguimento.',
    checkout: 'Avançar com a encomenda',
    checkoutLoading: 'A redirecionar…',
    securePay: 'Pagamento seguro via',
    errPayment: 'Não foi possível iniciar o pagamento. Tenta de novo — se continuar, fala connosco no WhatsApp.',
    errUnknown: 'Algo correu mal. Tenta de novo ou fala connosco no WhatsApp.',
  },
  en: {
    title: 'Your cart',
    close: 'Close cart',
    emptyText: 'Your cart is empty. Browse the catalog to get started.',
    emptyCta: 'Browse the shop',
    qtyMinus: 'Decrease quantity',
    qtyPlus: 'Increase quantity',
    removeItem: (name: string) => `Remove ${name}`,
    remove: 'Remove',
    shipRemaining: (v: string) => <>You&apos;re <strong>{v}</strong> away from <span>free shipping</span> 🚚</>,
    shipDone: <>🎉 Nice! You&apos;ve got <strong>free shipping</strong>.</>,
    subtotal: 'Subtotal',
    wholesale: '−15% wholesale',
    note: 'Shipping calculated at checkout. Sent via registered CTT mail, with tracking.',
    checkout: 'Proceed to checkout',
    checkoutLoading: 'Redirecting…',
    securePay: 'Secure payment via',
    errPayment: 'We couldn\'t start the payment. Please try again — if it persists, message us on WhatsApp.',
    errUnknown: 'Something went wrong. Please try again or message us on WhatsApp.',
  },
} as const;

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { lang } = useLang();
  const t = L[lang];

  // Incentivo de envio grátis (limite de 40€ — igual ao do checkout).
  const FREE_SHIP = 40;
  const shipRemaining = Math.max(0, FREE_SHIP - subtotal);
  const shipProgress = Math.min(1, subtotal / FREE_SHIP);

  // Fecha com ESC e trava o scroll do body quando aberto.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((it) => ({ id: it.product.id, qty: it.qty, customizations: it.customizations })),
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || t.errPayment);
      }
      window.location.href = data.url; // redireciona para o Stripe Checkout
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errUnknown);
      setLoading(false);
    }
  };

  return (
    <div className={`cart ${isOpen ? 'cart--open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart__overlay" onClick={closeCart} />

      <aside
        className="cart__panel"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
      >
        <header className="cart__head">
          <h2 className="cart__title">
            {t.title}{count > 0 ? ` · ${count}` : ''}
          </h2>
          <button
            type="button"
            className="cart__close"
            onClick={closeCart}
            aria-label={t.close}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <span className="cart__empty-icon" aria-hidden="true">🛒</span>
            <p>{t.emptyText}</p>
            <button type="button" className="btn btn--ghost btn--sm" onClick={closeCart}>
              {t.emptyCta}
            </button>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map(({ id, product, qty, customizations, unitPrice, wholesale }) => {
                const name = pName(product, lang);
                return (
                <li key={id} className="cart__item">
                  <div className={`cart__thumb cart__thumb--${product.tone}`}>
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={name}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    ) : (
                      <span className="cart__thumb-icon">{product.icon}</span>
                    )}
                  </div>

                  <div className="cart__item-body">
                    <span className="cart__item-name">{name}</span>

                    {/* Exibir opções de personalização se existirem */}
                    {customizations && Object.keys(customizations).length > 0 && (
                      <div className="flex flex-col gap-0.5 mt-1 mb-2">
                        {Object.entries(customizations).map(([key, value]) => {
                          const optionDef = product.customizations?.find(c => c.id === key);
                          return (
                            <span key={key} className="text-xs text-stone-500">
                              <span className="font-medium text-stone-700">{optionDef ? cLabel(optionDef, lang) : key}:</span> {value}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <span className="cart__item-price">
                      {wholesale ? (
                        <>
                          <s className="opacity-60 mr-1.5">{formatEUR(product.price)}</s>
                          {formatEUR(unitPrice)}
                          <span className="ml-1.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 text-[11px] font-bold px-2 py-0.5 whitespace-nowrap">
                            {t.wholesale}
                          </span>
                        </>
                      ) : (
                        formatEUR(unitPrice)
                      )}
                    </span>

                    <div className="cart__qty">
                      <button
                        type="button"
                        aria-label={t.qtyMinus}
                        onClick={() => setQty(id, qty - 1)}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        aria-label={t.qtyPlus}
                        onClick={() => setQty(id, qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart__item-right">
                    <span className="cart__item-line-total">
                      {formatEUR(unitPrice * qty)}
                    </span>
                    <button
                      type="button"
                      className="cart__remove"
                      onClick={() => remove(id)}
                      aria-label={t.removeItem(name)}
                    >
                      {t.remove}
                    </button>
                  </div>
                </li>
                );
              })}
            </ul>

            <footer className="cart__foot">
              <div className="cart__ship">
                {shipRemaining > 0 ? (
                  <p className="cart__ship-text">
                    {t.shipRemaining(formatEUR(shipRemaining))}
                  </p>
                ) : (
                  <p className="cart__ship-text cart__ship-text--done">
                    {t.shipDone}
                  </p>
                )}
                <div className="cart__ship-bar">
                  <span style={{ width: `${shipProgress * 100}%` }} />
                </div>
              </div>

              {error && <p className="cart__error" role="alert">{error}</p>}
              <div className="cart__subtotal">
                <span>{t.subtotal}</span>
                <strong>{formatEUR(subtotal)}</strong>
              </div>
              <p className="cart__note">{t.note}</p>
              <button
                type="button"
                className="btn btn--primary cart__checkout"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? t.checkoutLoading : t.checkout}
              </button>
              <p className="cart__secure">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t.securePay} <StripeMark />
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
