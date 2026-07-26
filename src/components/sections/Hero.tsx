"use client";

import { motion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageContext';
import { GOOGLE_PROFILE_URL } from '@/data/site';

const L = {
  pt: {
    badge: 'na nossa oficina 3D',
    h1a: 'Trazemos as tuas',
    h1b: 'ideias para o ',
    h1accent: 'mundo real',
    desc: 'Desde peças exclusivas a engenhocas de garagem. Imprimimos cada detalhe com a paixão de quem cria à mão e enviamos para ti, em qualquer parte de Portugal.',
    ctaPrimary: 'Fala connosco sobre o teu projeto',
    ctaGhost: 'Espreitar a montra',
    statPieces: 'peças criadas',
    statRating: 'no Google',
    statRatingValue: '5,0',
  },
  en: {
    badge: 'inside our 3D workshop',
    h1a: 'We bring your',
    h1b: 'ideas into the ',
    h1accent: 'real world',
    desc: 'From one-of-a-kind pieces to garage gadgets. We print every detail with handmade passion and ship to you anywhere in Portugal.',
    ctaPrimary: 'Talk to us about your project',
    ctaGhost: 'Browse the shop',
    statPieces: 'pieces created',
    statRating: 'on Google',
    statRatingValue: '5.0',
  },
} as const;

export default function Hero() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <section className="hero relative" id="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__layout">
        {/* ── LEFT: editorial content ── */}
        <div className="hero__left hero__text-block">
          <div className="hero__eyebrow">
            <span className="hero__badge-handwritten">
              {t.badge}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero__h1"
          >
            {t.h1a}<br />
            {t.h1b}<span className="hero__accent">{t.h1accent}</span>.
          </motion.h1>

          <p className="hero__desc">
            {t.desc}
          </p>

          <div className="hero__ctas">
            <a href="#orcamento" className="btn btn--primary btn--artisan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {t.ctaPrimary}
            </a>
            <a href="#catalogo" className="btn btn--ghost">
              {t.ctaGhost}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hero__stats-loose">
            <div className="hero__stat-item">
              <span className="hero__stat-big">+150</span>
              <span className="hero__stat-small">{t.statPieces}</span>
            </div>
            <span className="hero__stat-sep">·</span>
            {/* Avaliação real do Perfil de Empresa — clicável, verificável. */}
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__stat-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span className="hero__stat-big">{t.statRatingValue}<span className="hero__star">★</span></span>
              <span className="hero__stat-small">{t.statRating}</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: vazio — o vídeo de fundo fixo (BackgroundScrollVideo)
              aparece atrás de todo o site, incluindo aqui. ── */}
        <div className="hero__right" aria-hidden="true" />
      </div>

      {/* Materiais (linha fixa, sem repetição) */}
      <div className="hero__ticker border-y border-stone-200 dark:border-white/5 bg-stone-100 dark:bg-white/5 py-4" aria-hidden="true">
        <div className="container flex flex-wrap items-center justify-center sm:justify-between gap-x-7 gap-y-3">
          {['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'PC'].map((m) => (
            <span key={m} className="flex items-center gap-2.5 text-sm font-medium tracking-wider text-stone-600 dark:text-stone-300 uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" /> {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
