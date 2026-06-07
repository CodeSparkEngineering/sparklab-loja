'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

/** Limpa o carrinho ao montar (usado na página de sucesso após o pagamento). */
export default function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
