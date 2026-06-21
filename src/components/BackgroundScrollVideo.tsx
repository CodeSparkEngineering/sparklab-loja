'use client';

import { useEffect, useRef } from 'react';

interface BackgroundScrollVideoProps {
  /** Caminho do vídeo dentro de /public. Default: /videos/hero.mp4 */
  src?: string;
  /** Opacidade do scrim (0–1) por cima do vídeo, para legibilidade do texto. */
  scrimOpacity?: number;
}

/**
 * BackgroundScrollVideo — vídeo de fundo FIXO no site inteiro, controlado pelo
 * scroll total da página ("scroll trigger").
 *
 * O vídeo fica fixo na viewport (atrás de todo o conteúdo) e o frame avança
 * conforme o progresso de scroll da página: topo = primeiro frame,
 * rodapé = último frame. Rolar para cima retrocede.
 *
 * - Respeita prefers-reduced-motion (fica no primeiro frame).
 * - Suaviza o scrub com lerp do currentTime.
 * - Remove os listeners no unmount.
 */
export default function BackgroundScrollVideo({
  src = '/videos/hero.mp4',
  scrimOpacity = 0.6,
}: BackgroundScrollVideoProps) {
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

    // Progresso 0 → 1 com base no scroll de TODA a página.
    const computeTarget = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? clamp(window.scrollY / max) : 0;
      targetTime = progress * duration;
    };

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      computeTarget();
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
  }, []);

  return (
    <div className="bg-scroll-video" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
      />
      <div
        className="bg-scroll-video__scrim"
        style={{ opacity: scrimOpacity }}
      />
    </div>
  );
}
