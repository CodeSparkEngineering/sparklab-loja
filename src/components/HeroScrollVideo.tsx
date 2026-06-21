'use client';

import { useEffect, useRef } from 'react';

interface HeroScrollVideoProps {
  /** Caminho do vídeo dentro de /public. Default: /videos/hero.mp4 */
  src?: string;
  /** Imagem mostrada antes do vídeo carregar (opcional). */
  poster?: string;
  /**
   * Quantas "alturas de viewport" de scroll percorrem o vídeo inteiro.
   * 1 = o vídeo termina depois de rolar uma tela. Default 1.
   */
  scrollRange?: number;
}

/**
 * HeroScrollVideo — vídeo controlado pelo scroll ("scroll trigger").
 *
 * O vídeo não toca sozinho: a posição do scroll controla o frame.
 * Rolar para baixo avança o vídeo; rolar para cima retrocede.
 * Ocupa todo o espaço do container pai (ex.: a coluna direita do Hero).
 *
 * - Respeita prefers-reduced-motion (fica no primeiro frame).
 * - Suaviza o scrub com lerp do currentTime.
 * - Remove os listeners no unmount.
 */
export default function HeroScrollVideo({
  src = '/videos/hero.mp4',
  poster,
  scrollRange = 1,
}: HeroScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const clamp = (n: number) => Math.max(0, Math.min(1, n));

    let duration = 0;
    let targetTime = 0;
    let raf = 0;
    let running = false;

    // Progresso 0 → 1 com base em quanto a página já rolou desde o topo.
    const computeTarget = () => {
      const vh = window.innerHeight || 1;
      const range = vh * Math.max(scrollRange, 0.0001);
      const progress = clamp(window.scrollY / range);
      targetTime = progress * duration;
    };

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      computeTarget();
      // Posiciona no frame inicial correto já no load.
      try {
        video.currentTime = targetTime;
      } catch {
        /* seek pode falhar antes de metadata em alguns browsers */
      }
    };

    // Loop de suavização: aproxima currentTime do targetTime com lerp.
    const tick = () => {
      const current = video.currentTime;
      const diff = targetTime - current;

      if (Math.abs(diff) > 0.01) {
        try {
          video.currentTime = current + diff * 0.15;
        } catch {
          /* ignora seek inválido */
        }
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const startTick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (duration <= 0) return;
      computeTarget();
      startTick();
    };

    if (video.readyState >= 1) onMeta();
    video.addEventListener('loadedmetadata', onMeta);

    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollRange]);

  return (
    <div className="hero__scroll-video relative mx-auto aspect-[3/2] w-full max-w-[540px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
