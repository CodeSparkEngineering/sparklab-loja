'use client';

import { useEffect, useState } from 'react';

/**
 * Data atual, só no cliente (null até hidratar).
 *
 * As páginas são estáticas: ler o relógio durante o render congelava o dia do
 * build e dava hydration mismatch. Quem usa isto decide o que mostrar enquanto
 * é null (o estado "ainda em campanha" é o seguro).
 */
export function useAgora(): Date | null {
  const [agora, setAgora] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgora(new Date());
  }, []);
  return agora;
}
