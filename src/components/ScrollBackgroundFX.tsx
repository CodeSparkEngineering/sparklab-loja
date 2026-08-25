'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollBackgroundFX — camada de fundo decorativa (malha técnica + brilhos da
 * marca) que vive ENTRE o Hero e o Footer, conduzida pelo SCROLL com anime.js.
 *
 * Como funciona: criamos animações anime.js pausadas (`autoplay: false`) e
 * fazemos `seek()` do seu progresso a partir de um handler de scroll próprio.
 * O progresso 0→1 mapeia a passagem da região do meio pelo ecrã (0 = topo da
 * região a entrar por baixo · 1 = fundo da região a sair por cima), com
 * suavização (lerp) para um "lag" premium. Assim a camada faz fade-in na
 * entrada, mantém-se, e faz fade-out ao aproximar-se do rodapé, enquanto os
 * brilhos derivam/escalam em parallax.
 *
 * (Optámos por conduzir o progresso à mão em vez do `onScroll` do anime.js
 * porque, neste layout, o `<html>` tem altura fixa — padrão flex do rodapé —
 * e a auto-deteção de container/target do observador não resolve de forma
 * fiável. O `seek` manual é determinístico e independente disso.)
 *
 * Layering: `.sbfx__bg` é `position: fixed; z-index:-1`, logo fica ACIMA do
 * vídeo de fundo (também -1, mas mais cedo no DOM) e ATRÁS do conteúdo. O
 * wrapper `.sbfx` cria um stacking context (z-index:0, SEM transform) para
 * prender a camada — o filho `fixed` continua preso ao viewport.
 *
 * Respeita `prefers-reduced-motion`: sem parallax, a camada fica estática
 * e discreta.
 */
export default function ScrollBackgroundFX({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Sem movimento: revela a camada de forma estática e discreta.
    if (reduceMotion) {
      const bg = wrap.querySelector<HTMLElement>('.sbfx__bg');
      if (bg) bg.style.opacity = '0.55';
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    // Import dinâmico: anime.js só entra no bundle do cliente e é carregado
    // quando esta secção monta (não pesa no chunk inicial / LCP).
    import('animejs')
      .then(({ animate }) => {
        const root = wrapRef.current;
        if (cancelled || !root) return;

        const q = (sel: string) => root.querySelector<HTMLElement>(sel);
        const bg = q('.sbfx__bg');
        if (!bg) return;

        const DUR = 1000;
        const make = (
          el: HTMLElement | null,
          params: Record<string, unknown>
        ) =>
          el
            ? animate(el, { ...params, duration: DUR, ease: 'linear', autoplay: false })
            : null;

        const anims = [
          // Camada inteira: fade-in · mantém · fade-out.
          make(bg, { opacity: [0, 1, 1, 0] }),
          // Malha técnica (aceno ao CAD/3D): parallax vertical + leve zoom.
          make(q('.sbfx__grid'), { translateY: ['-3%', '3%'], scale: [1, 1.08] }),
        ].filter(Boolean) as Array<{
          seek: (t: number) => void;
          duration: number;
          revert: () => void;
        }>;

        const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

        let current = 0;
        let target = 0;
        let raf = 0;
        let running = false;

        const computeTarget = () => {
          const r = root.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          // 0 quando o topo da região está no fundo do ecrã (r.top == vh);
          // 1 quando o fundo da região está no topo do ecrã (r.top == -height).
          target = clamp01((vh - r.top) / (vh + r.height));
        };

        const apply = (p: number) => {
          for (const a of anims) a.seek(a.duration * p);
        };

        const tick = () => {
          current += (target - current) * 0.12; // suavização (lag premium)
          if (Math.abs(target - current) < 0.0004) {
            current = target;
            running = false;
          }
          apply(current);
          if (running) raf = requestAnimationFrame(tick);
        };

        const onScrollOrResize = () => {
          computeTarget();
          if (!running) {
            running = true;
            raf = requestAnimationFrame(tick);
          }
        };

        // Estado inicial sem "salto" (sincroniza current = target).
        computeTarget();
        current = target;
        apply(current);

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize, { passive: true });

        cleanup = () => {
          window.removeEventListener('scroll', onScrollOrResize);
          window.removeEventListener('resize', onScrollOrResize);
          cancelAnimationFrame(raf);
          anims.forEach((a) => a.revert());
        };
      })
      .catch(() => {
        /* anime.js indisponível: a camada fica invisível, sem quebrar a página */
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={wrapRef} className="sbfx">
      <div className="sbfx__bg" aria-hidden="true">
        <div className="sbfx__grid" />
      </div>
      {children}
    </div>
  );
}
