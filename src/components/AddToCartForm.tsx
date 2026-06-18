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
    <div className="flex flex-col gap-4 mt-8 border-t border-white/10 pt-8">
      {product.customizations && product.customizations.length > 0 && (
        <div className="flex flex-col gap-6 mb-4">
          {product.customizations.map(opt => (
            <div key={opt.id} className="flex flex-col gap-2">
              <label htmlFor={opt.id} className="text-sm text-zinc-400 font-semibold">{opt.label}</label>
              {opt.type === 'color' && opt.options ? (
                <select 
                  id={opt.id}
                  className="bg-white/5 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
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
                  className="bg-white/5 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 placeholder-zinc-600"
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
        <span className="text-sm uppercase tracking-widest text-zinc-400 font-semibold">Quantidade:</span>
        <div className="flex items-center border border-zinc-700 rounded-full overflow-hidden bg-white/5">
          <button type="button" onClick={handleMinus} className="px-4 py-1.5 hover:bg-white/10 transition-colors text-xl font-medium w-12 text-center">-</button>
          <span className="w-8 text-center text-lg font-medium">{quantity}</span>
          <button type="button" onClick={handlePlus} className="px-4 py-1.5 hover:bg-white/10 transition-colors text-xl font-medium w-12 text-center">+</button>
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
