'use client';

import { useEffect, useRef } from 'react';

interface BackgroundScrollVideoProps {
  /** Caminho do vídeo dentro de /public. Default: /videos/hero.mp4 */
  src?: string;
  /** Opacidade do scrim (0–1) por cima do vídeo, para legibilidade do texto. */
  scrimOpacity?: number;
}

/**
 * BackgroundScrollVideo — vídeo de fundo FIXO no site inteiro.
 *
 * • Desktop (pointer fino): controlado pelo SCROLL — o frame avança conforme
 *   o progresso de scroll da página (topo = início, rodapé = fim).
 * • Telemóvel/tablet (pointer grosso): o scroll-scrub de vídeo não funciona
 *   (o iOS nem renderiza frames sem `play()`), por isso o vídeo simplesmente
 *   REPRODUZ EM LOOP como fundo ambiente — assim aparece sempre.
 * • Respeita prefers-reduced-motion (sem movimento automático).
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
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // ── Telemóvel/tablet: reproduzir em loop (fundo ambiente) ──
    if (isTouch) {
      video.loop = true;
      video.muted = true;
      if (reduceMotion) return; // sem autoplay para quem pediu menos movimento
      const play = () => {
        video.play().catch(() => {
          /* alguns browsers só deixam reproduzir após interação */
        });
      };
      if (video.readyState >= 2) play();
      else video.addEventListener('canplay', play, { once: true });
      // tenta de novo no primeiro toque, caso o autoplay tenha sido bloqueado
      const onFirstTouch = () => play();
      window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
      return () => {
        video.removeEventListener('canplay', play);
        window.removeEventListener('touchstart', onFirstTouch);
      };
    }

    // ── Desktop: scroll-scrub via currentTime ──
    const clamp = (n: number) => Math.max(0, Math.min(1, n));

    let duration = 0;
    let targetTime = 0;
    let raf = 0;
    let running = false;

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
        /* seek pode falhar antes de metadata */
      }
    };

    const tick = () => {
      const current = video.currentTime;
      const diff = targetTime - current;
      if (Math.abs(diff) > 0.01) {
        try {
          video.currentTime = current + diff * 0.15;
        } catch {
          /* ignora */
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
  }, [src]);

  return (
    <div className="bg-scroll-video" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        poster="/videos/hero-poster.jpg"
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
