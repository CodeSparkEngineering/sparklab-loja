'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatEUR, unitPriceFor, WHOLESALE_MIN_QTY, type Product } from '@/data/products';
import { useLang, pName, cLabel } from '@/i18n/LanguageContext';

const L = {
  pt: {
    chooseColor: 'Escolhe uma cor…',
    placeholder: (max?: number) => `Ex: O teu nome${max ? ` (máx. ${max} letras)` : ''}`,
    errColor: 'Escolhe uma cor para continuar.',
    errText: 'Preenche este campo para continuar.',
    qty: 'Quantidade:',
    qtyMinus: 'Diminuir quantidade',
    qtyPlus: 'Aumentar quantidade',
    wholesaleApplied: (unit: string) => `${unit}/un. · −15% atacado aplicado 🎉`,
    wholesaleHint: (n: number) => `Faltam ${n} un. para −15% de atacado`,
    add: 'Adicionar ao meu carrinho 🛒',
    addedLong: '✓ Adicionado ao carrinho!',
    addShort: 'Adicionar ao carrinho',
    addedShort: '✓ Adicionado!',
    srAdded: 'Produto adicionado ao carrinho.',
  },
  en: {
    chooseColor: 'Pick a color…',
    placeholder: (max?: number) => `E.g. your name${max ? ` (max ${max} letters)` : ''}`,
    errColor: 'Pick a color to continue.',
    errText: 'Fill in this field to continue.',
    qty: 'Quantity:',
    qtyMinus: 'Decrease quantity',
    qtyPlus: 'Increase quantity',
    wholesaleApplied: (unit: string) => `${unit}/unit · −15% wholesale applied 🎉`,
    wholesaleHint: (n: number) => `${n} more unit${n > 1 ? 's' : ''} for the −15% wholesale discount`,
    add: 'Add to my cart 🛒',
    addedLong: '✓ Added to cart!',
    addShort: 'Add to cart',
    addedShort: '✓ Added!',
    srAdded: 'Product added to cart.',
  },
} as const;

export default function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { lang } = useLang();
  const t = L[lang];

  // Refs dos campos de personalização (para focar o primeiro com erro)
  // e do CTA principal (para mostrar a barra fixa quando ele sai do ecrã).
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [ctaVisible, setCtaVisible] = useState(true);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -12px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMinus = () => setQuantity(q => Math.max(1, q - 1));
  const handlePlus = () => setQuantity(q => Math.min(99, q + 1));

  const handleAdd = () => {
    // Personalizações obrigatórias têm de estar preenchidas.
    const missing = (product.customizations ?? []).filter(
      (opt) => opt.required && !customizations[opt.id]?.trim()
    );
    if (missing.length > 0) {
      const next: Record<string, string> = {};
      for (const opt of missing) {
        next[opt.id] = opt.type === 'color' ? t.errColor : t.errText;
      }
      setErrors(next);
      fieldRefs.current[missing[0].id]?.focus();
      return;
    }

    setErrors({});
    add(product.id, quantity, customizations);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleCustomizationChange = (id: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [id]: value }));
    // Limpa o erro do campo assim que o cliente começa a corrigir.
    setErrors(prev => {
      if (!prev[id]) return prev;
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  };

  return (
    <div className="flex flex-col gap-4 mt-8 border-t border-stone-200 pt-8">
      {product.customizations && product.customizations.length > 0 && (
        <div className="flex flex-col gap-6 mb-4">
          {product.customizations.map(opt => (
            <div key={opt.id} className="flex flex-col gap-2">
              <label htmlFor={opt.id} className="text-sm text-stone-700 dark:text-zinc-300 font-semibold">
                {cLabel(opt, lang)}
                {opt.required && <span className="text-orange-500" aria-hidden="true"> *</span>}
              </label>
              {opt.type === 'color' && opt.options ? (
                <select
                  id={opt.id}
                  ref={(el) => { fieldRefs.current[opt.id] = el; }}
                  aria-required={opt.required || undefined}
                  aria-invalid={errors[opt.id] ? true : undefined}
                  aria-describedby={errors[opt.id] ? `${opt.id}-erro` : undefined}
                  className={`bg-white dark:bg-stone-900 border rounded-lg px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 ${errors[opt.id] ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-stone-200 dark:border-stone-800 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-orange-400 dark:focus:ring-orange-500'}`}
                  value={customizations[opt.id] || ''}
                  onChange={(e) => handleCustomizationChange(opt.id, e.target.value)}
                >
                  <option value="" disabled>{t.chooseColor}</option>
                  {opt.options.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id={opt.id}
                  ref={(el) => { fieldRefs.current[opt.id] = el; }}
                  maxLength={opt.maxLength}
                  aria-required={opt.required || undefined}
                  aria-invalid={errors[opt.id] ? true : undefined}
                  aria-describedby={errors[opt.id] ? `${opt.id}-erro` : undefined}
                  className={`bg-white dark:bg-stone-900 border rounded-lg px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 placeholder-stone-400 dark:placeholder-stone-500 ${errors[opt.id] ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-stone-200 dark:border-stone-800 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-orange-400 dark:focus:ring-orange-500'}`}
                  placeholder={t.placeholder(opt.maxLength)}
                  value={customizations[opt.id] || ''}
                  onChange={(e) => handleCustomizationChange(opt.id, e.target.value)}
                />
              )}
              {errors[opt.id] && (
                <p id={`${opt.id}-erro`} className="text-sm text-red-500" role="alert">
                  {errors[opt.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm uppercase tracking-widest text-stone-700 dark:text-zinc-300 font-semibold">{t.qty}</span>
        <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-full overflow-hidden bg-white dark:bg-stone-900 shadow-sm">
          <button type="button" onClick={handleMinus} aria-label={t.qtyMinus} className="px-4 py-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-xl font-medium w-12 text-center text-stone-800 dark:text-stone-200">-</button>
          <span className="font-semibold text-lg w-8 text-center text-stone-800 dark:text-stone-200" aria-live="polite">{quantity}</span>
          <button type="button" onClick={handlePlus} aria-label={t.qtyPlus} className="px-4 py-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-xl font-medium w-12 text-center text-stone-800 dark:text-stone-200">+</button>
        </div>
        {/* Atacado: aplicado a partir de 10 un.; a partir de 7 mostra o incentivo */}
        <span className="text-sm font-medium" aria-live="polite">
          {quantity >= WHOLESALE_MIN_QTY ? (
            <span className="text-green-600 dark:text-green-400">
              {t.wholesaleApplied(formatEUR(unitPriceFor(product.price, quantity)))}
            </span>
          ) : quantity >= 7 ? (
            <span className="text-amber-600 dark:text-amber-400">
              {t.wholesaleHint(WHOLESALE_MIN_QTY - quantity)}
            </span>
          ) : null}
        </span>
      </div>

      <button
        ref={ctaRef}
        type="button"
        onClick={handleAdd}
        className={`btn w-full max-w-md mt-4 text-lg py-4 transition-colors ${added ? 'btn--added' : 'btn--primary'}`}
      >
        {added ? t.addedLong : t.add}
      </button>
      {/* Anúncio para leitores de ecrã quando o produto é adicionado */}
      <span className="sr-only" aria-live="polite">
        {added ? t.srAdded : ''}
      </span>

      {/* Barra fixa (mobile/tablet): aparece quando o CTA principal sai do
          ecrã, para o preço + adicionar estarem sempre à mão. */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-[110] transition-[transform,opacity] duration-300 ${
          !ctaVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        aria-hidden={ctaVisible}
      >
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur border-t border-stone-200 dark:border-white/10 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3">
          <div className="flex flex-col leading-tight min-w-0 shrink">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-zinc-400 truncate">{pName(product, lang)}</span>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100 whitespace-nowrap">{formatEUR(unitPriceFor(product.price, quantity))}</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            tabIndex={ctaVisible ? -1 : 0}
            className={`btn flex-1 py-3 ${added ? 'btn--added' : 'btn--primary'}`}
          >
            {added ? t.addedShort : t.addShort}
          </button>
        </div>
      </div>
    </div>
  );
}
