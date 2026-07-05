'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PRODUCTS, getProductById, unitPriceFor, WHOLESALE_MIN_QTY, type Product } from '@/data/products';

export type CartLine = { 
  id: string; 
  productId: string;
  qty: number;
  customizations?: Record<string, string>;
};

export type CartItem = {
  id: string;
  product: Product;
  qty: number;
  customizations?: Record<string, string>;
  /** Preço unitário efetivo (com desconto de atacado se 10+ do mesmo produto). */
  unitPrice: number;
  /** true quando o desconto de atacado (−15%) está aplicado a esta linha. */
  wholesale: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (productId: string, qty?: number, customizations?: Record<string, string>) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = 'sparklab-cart-v1';

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    
    return parsed
      .filter((l) => l && typeof l.productId === 'string' && getProductById(l.productId))
      .map((l) => ({ 
        id: l.id || l.productId, // Fallback for old carts
        productId: l.productId, 
        qty: Math.max(1, Math.floor(Number(l.qty) || 1)),
        customizations: l.customizations
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hidratação do carrinho a partir do localStorage (indisponível no SSR):
    // padrão correto, feito só após o mount. setState-em-effect é intencional.
    /* eslint-disable react-hooks/set-state-in-effect */
    setLines(readStorage());
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignorar se storage cheio
    }
  }, [lines, hydrated]);

  const add = useCallback((productId: string, qty = 1, customizations?: Record<string, string>) => {
    if (!getProductById(productId)) return;
    
    // Create a deterministic ID for this specific variation
    const lineId = customizations && Object.keys(customizations).length > 0
      ? `${productId}-${JSON.stringify(customizations)}`
      : productId;

    setLines((prev) => {
      const existing = prev.find((l) => l.id === lineId);
      if (existing) {
        return prev.map((l) => (l.id === lineId ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id: lineId, productId, qty, customizations }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.floor(qty) } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo<CartItem[]>(() => {
    // Atacado: 10+ unidades do MESMO produto (variantes contam juntas) = −15%.
    const qtyByProduct: Record<string, number> = {};
    for (const l of lines) {
      qtyByProduct[l.productId] = (qtyByProduct[l.productId] ?? 0) + l.qty;
    }

    const result: CartItem[] = [];
    for (const l of lines) {
      const product = getProductById(l.productId);
      if (product) {
        const totalOfProduct = qtyByProduct[l.productId] ?? l.qty;
        result.push({
          id: l.id,
          product,
          qty: l.qty,
          customizations: l.customizations,
          unitPrice: unitPriceFor(product.price, totalOfProduct),
          wholesale: totalOfProduct >= WHOLESALE_MIN_QTY,
        });
      }
    }
    return result;
  }, [lines]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      items,
      count,
      subtotal,
      isOpen,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
    }),
    [lines, items, count, subtotal, isOpen, add, remove, setQty, clear, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>');
  return ctx;
}

// Reexport útil para evitar import extra em componentes.
export { PRODUCTS };
