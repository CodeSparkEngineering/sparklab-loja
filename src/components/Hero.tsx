"use client";

import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import { Marquee } from './ui/marquee';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__layout">
        {/* ── LEFT: editorial content ── */}
        <div className="hero__left hero__text-block">
          <div className="hero__eyebrow">
            <span className="hero__badge-handwritten">
              na nossa oficina 3D
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero__h1"
          >
            Trazemos as tuas<br />
            ideias para o <span className="hero__accent">mundo real</span>.
          </motion.h1>

          <p className="hero__desc">
            Desde peças exclusivas a engenhocas de garagem. Imprimimos cada detalhe com a paixão de quem cria à mão e enviamos para ti, em qualquer parte de Portugal.
          </p>

          <div className="hero__ctas">
            <a href="#orcamento" className="btn btn--primary btn--artisan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Fala connosco sobre o teu projeto
            </a>
            <a href="#catalogo" className="btn btn--ghost">
              Espreitar a montra
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hero__stats-loose">
            <div className="hero__stat-item">
              <span className="hero__stat-big">+150</span>
              <span className="hero__stat-small">peças criadas</span>
            </div>
            <span className="hero__stat-sep">·</span>
            <div className="hero__stat-item">
              <span className="hero__stat-big">4.9<span className="hero__star">★</span></span>
              <span className="hero__stat-small">de quem recebeu</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: objeto 3D interativo ── */}
        <div className="hero__right" aria-hidden="true">
          <Hero3D />
        </div>
      </div>

      {/* Bottom ticker using 21st.dev Marquee */}
      <div className="hero__ticker border-y border-stone-200 bg-stone-100 py-4" aria-hidden="true">
        <Marquee className="[--duration:30s] [--gap:3rem]">
          {['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'PC'].map((m, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-medium tracking-wider text-stone-600 uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" /> {m}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

