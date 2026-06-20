'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

export default function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const handleMinus = () => setQuantity(q => Math.max(1, q - 1));
  const handlePlus = () => setQuantity(q => q + 1);

  const handleAdd = () => {
    add(product.id, quantity, customizations);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleCustomizationChange = (id: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col gap-4 mt-8 border-t border-stone-200 pt-8">
      {product.customizations && product.customizations.length > 0 && (
        <div className="flex flex-col gap-6 mb-4">
          {product.customizations.map(opt => (
            <div key={opt.id} className="flex flex-col gap-2">
              <label htmlFor={opt.id} className="text-sm text-stone-700 dark:text-zinc-300 font-semibold">{opt.label}</label>
              {opt.type === 'color' && opt.options ? (
                <select 
                  id={opt.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-orange-500"
                  value={customizations[opt.id] || ''}
                  onChange={(e) => handleCustomizationChange(opt.id, e.target.value)}
                >
                  <option value="" disabled>Escolhe uma cor...</option>
                  {opt.options.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  id={opt.id}
                  maxLength={opt.maxLength}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-400 dark:focus:ring-orange-500 placeholder-stone-400 dark:placeholder-stone-500"
                  placeholder={`Ex: O teu nome (Max ${opt.maxLength} letras)`}
                  value={customizations[opt.id] || ''}
                  onChange={(e) => handleCustomizationChange(opt.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="text-sm uppercase tracking-widest text-stone-700 dark:text-zinc-300 font-semibold">Quantidade:</span>
        <div className="flex items-center border border-stone-200 dark:border-stone-800 rounded-full overflow-hidden bg-white dark:bg-stone-900 shadow-sm">
          <button type="button" onClick={handleMinus} className="px-4 py-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-xl font-medium w-12 text-center text-stone-800 dark:text-stone-200">-</button>
          <span className="font-semibold text-lg w-8 text-center text-stone-800 dark:text-stone-200">{quantity}</span>
          <button type="button" onClick={handlePlus} className="px-4 py-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-xl font-medium w-12 text-center text-stone-800 dark:text-stone-200">+</button>
        </div>
      </div>
      
      <button
        type="button"
        onClick={handleAdd}
        className={`btn w-full max-w-md mt-4 text-lg py-4 transition-colors ${added ? 'btn--added' : 'btn--primary'}`}
      >
        {added ? '✓ Adicionado ao carrinho!' : 'Adicionar ao meu carrinho 🛒'}
      </button>
    </div>
  );
}
