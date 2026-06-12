"use client";

import { motion } from 'framer-motion';
import Hero3D from './Hero3D';
import { ShimmerButton } from './ui/shimmer-button';
import { Marquee } from './ui/marquee';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__layout">
        {/* ── LEFT: editorial content ── */}
        <div className="hero__left hero__text-block">
          <div className="hero__eyebrow">
            <span className="hero__badge">
              <span className="hero__badge-dot" />
              Impressão 3D sob encomenda
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero__h1"
          >
            Damos vida<br />
            às tuas{' '}
            <span className="hero__accent">ideias</span>.
          </motion.h1>

          <p className="hero__desc">
            Desde peças decorativas exclusivas a protótipos precisos.
            Imprimimos com carinho e qualidade, e entregamos
            diretamente em tua casa com todo o cuidado.
          </p>

          <div className="hero__ctas">
            <a href="#orcamento" className="inline-block">
              <ShimmerButton className="text-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Orçamento sem compromisso
              </ShimmerButton>
            </a>
            <a href="#catalogo" className="btn btn--ghost">
              Explorar a loja
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">+<span data-counter="150">150</span></span>
              <span className="hero__stat-label">peças entregues</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-num">4.9<span className="hero__star">★</span></span>
              <span className="hero__stat-label">avaliação</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: objeto 3D interativo ── */}
        <div className="hero__right" aria-hidden="true">
          <Hero3D />
        </div>
      </div>

      {/* Bottom ticker using 21st.dev Marquee */}
      <div className="hero__ticker border-y border-white/5 bg-white/5 py-4" aria-hidden="true">
        <Marquee className="[--duration:30s] [--gap:3rem]">
          {['PLA', 'PETG', 'ABS', 'TPU', 'ASA', 'PETG-CF', 'PA', 'PC', 'Bambu Lab', 'PVA', 'Resina 8K', 'SLA'].map((m, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" /> {m}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
