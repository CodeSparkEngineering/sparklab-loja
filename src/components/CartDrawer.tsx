'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatEUR } from '@/data/products';

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
      }
      window.location.href = data.url; // redireciona para o Stripe Checkout
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
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
        aria-label="Carrinho de compras"
      >
        <header className="cart__head">
          <h2 className="cart__title">
            O teu carrinho{count > 0 ? ` · ${count}` : ''}
          </h2>
          <button
            type="button"
            className="cart__close"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <span className="cart__empty-icon" aria-hidden="true">🛒</span>
            <p>O teu carrinho ainda está vazio. Vamos enchê-lo de coisas fixes?</p>
            <button type="button" className="btn btn--ghost btn--sm" onClick={closeCart}>
              Explorar a loja
            </button>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map(({ id, product, qty, customizations }) => (
                <li key={id} className="cart__item">
                  <div className={`cart__thumb cart__thumb--${product.tone}`}>
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    ) : (
                      <span className="cart__thumb-icon">{product.icon}</span>
                    )}
                  </div>

                  <div className="cart__item-body">
                    <span className="cart__item-name">{product.name}</span>
                    
                    {/* Exibir opções de personalização se existirem */}
                    {customizations && Object.keys(customizations).length > 0 && (
                      <div className="flex flex-col gap-0.5 mt-1 mb-2">
                        {Object.entries(customizations).map(([key, value]) => {
                          const optionDef = product.customizations?.find(c => c.id === key);
                          return (
                            <span key={key} className="text-xs text-stone-500">
                              <span className="font-medium text-stone-700">{optionDef?.label || key}:</span> {value}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <span className="cart__item-price">{formatEUR(product.price)}</span>

                    <div className="cart__qty">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => setQty(id, qty - 1)}
                      >
                        −
                      </button>
                      <span>{qty}</span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => setQty(id, qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart__item-right">
                    <span className="cart__item-line-total">
                      {formatEUR(product.price * qty)}
                    </span>
                    <button
                      type="button"
                      className="cart__remove"
                      onClick={() => remove(id)}
                      aria-label={`Remover ${product.name}`}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart__foot">
              <div className="cart__ship">
                {shipRemaining > 0 ? (
                  <p className="cart__ship-text">
                    Faltam <strong>{formatEUR(shipRemaining)}</strong> para teres <span>envio grátis</span> 🚚
                  </p>
                ) : (
                  <p className="cart__ship-text cart__ship-text--done">
                    🎉 Boa! Tens <strong>envio grátis</strong>.
                  </p>
                )}
                <div className="cart__ship-bar">
                  <span style={{ width: `${shipProgress * 100}%` }} />
                </div>
              </div>

              {error && <p className="cart__error">{error}</p>}
              <div className="cart__subtotal">
                <span>Subtotal</span>
                <strong>{formatEUR(subtotal)}</strong>
              </div>
              <p className="cart__note">Portes e impostos calculados no checkout.</p>
              <button
                type="button"
                className="btn btn--primary cart__checkout"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'A redirecionar…' : 'Avançar com a encomenda'}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
