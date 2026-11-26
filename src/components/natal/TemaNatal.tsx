'use client';

import { useEffect, type CSSProperties } from 'react';
import { faseNatal } from '@/data/natal';
import { useAgora } from './useAgora';

/**
 * Tema de Natal do site: a neve + o interruptor de fim de campanha.
 *
 * As cores vêm de `data-season="natal"` no <html> (posto no layout, por isso
 * já chega certo no primeiro paint). Aqui só se DESLIGA: passado o Natal,
 * tira o atributo e a neve, e o site volta ao laranja sem novo deploy.
 */

// Flocos determinísticos (sem Math.random): o HTML do servidor e o do cliente
// têm de ser iguais. Os números primos espalham posições e ritmos.
const FLOCOS = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 37 + 11) % 100, // % da largura
  s: 4 + ((i * 7) % 6), // 4–9 px
  d: 11 + ((i * 5) % 9), // 11–19 s de queda
  delay: -((i * 13) % 19), // negativo: já vêm a meio da queda
  drift: ((i * 29) % 60) - 30, // -30…30 px de deriva lateral
  o: 0.6 + ((i * 3) % 4) / 10, // 0,6–0,9
}));

export default function TemaNatal() {
  const agora = useAgora();
  const terminada = agora !== null && faseNatal(agora) === 'terminada';

  useEffect(() => {
    if (terminada) delete document.documentElement.dataset.season;
  }, [terminada]);

  if (terminada) return null;

  return (
    <div className="neve" aria-hidden="true">
      {FLOCOS.map((f, i) => (
        <span
          key={i}
          className="neve__floco"
          style={
            {
              '--x': `${f.x}%`,
              '--s': `${f.s}px`,
              '--d': `${f.d}s`,
              '--delay': `${f.delay}s`,
              '--drift': `${f.drift}px`,
              '--o': f.o,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
