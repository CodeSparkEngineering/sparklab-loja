'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageContext';

const TEXTS = {
  pt: {
    eyebrow: 'como funcionamos',
    ariaTabs: 'Etapas do processo',
    steps: [
      { short: 'Envia a tua ideia', title: 'Mostra-nos a tua ideia (ou o teu modelo 3D)', text: 'Viste algo na nossa montra que gostaste? Ou tens um ficheiro 3D (.stl ou .obj) à espera de ganhar vida? Envia-nos e avaliamos a viabilidade da impressão.' },
      { short: 'Afinamos contigo', title: 'Afinamos os detalhes contigo', text: 'Cor, tamanho, material e acabamento. Definimos tudo em conjunto, pelo WhatsApp ou e-mail, para que a peça fique exatamente como precisas. Orçamento claro, sem surpresas.' },
      { short: 'Produzimos e enviamos', title: 'Imprimimos, revemos e enviamos', text: 'Imprimimos a peça na nossa Bambu Lab P1S, fazemos os retoques finais e embalamos com segurança. Segue via CTT registado, com seguimento até à tua morada.' },
    ],
  },
  en: {
    eyebrow: 'how we work',
    ariaTabs: 'Process steps',
    steps: [
      { short: 'Send your idea', title: 'Show us your idea (or your 3D model)', text: 'Saw something you liked in our shop? Or got a 3D file (.stl or .obj) waiting to come to life? Send it over and we assess print feasibility.' },
      { short: 'We fine-tune together', title: 'We fine-tune the details with you', text: 'Color, size, material and finish. We define everything together, over WhatsApp or e-mail, so the piece turns out exactly as you need. Clear quote, no surprises.' },
      { short: 'We produce and ship', title: 'We print, review and ship', text: 'We print your piece on our Bambu Lab P1S, do the final touch-ups and pack it safely. It ships via registered CTT mail, tracked to your door.' },
    ],
  },
} as const;

const STEPS = [
  {
    n: '01',
    art: (
      <div className="tl-art">
        <span className="art-file">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          .STL
        </span>
        <span className="art-file">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          .OBJ
        </span>
        <span className="art-file" style={{ color: 'var(--blue)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          Catálogo
        </span>
      </div>
    ),
  },
  {
    n: '02',
    art: (
      <div className="tl-art">
        <span className="art-swatch" style={{ background: '#d97757' }} title="Laranja" />
        <span className="art-swatch" style={{ background: '#6a9bcc' }} title="Azul" />
        <span className="art-swatch" style={{ background: '#788c5d' }} title="Verde" />
        <span className="art-swatch" style={{ background: '#2a2a27' }} title="Preto" />
        <span className="art-swatch" style={{ background: '#e8e6dc', border: '1px solid rgba(0,0,0,.1)' }} title="Branco" />
        <span className="art-swatch" style={{ background: '#c4a0d0' }} title="Rosa" />
      </div>
    ),
  },
  {
    n: '03',
    art: (
      <div className="tl-art">
        <span className="art-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10H3M16 2l5 8-5 8M8 2L3 10l5 8" />
          </svg>
          <ArtBadgeShip />
        </span>
        <span className="art-badge" style={{ background: 'rgba(59,130,246,.08)', borderColor: 'rgba(59,130,246,.2)', color: 'var(--blue)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <ArtBadgeSafe />
        </span>
      </div>
    ),
  },
];

const AUTO_MS = 6000;

function ArtBadgeShip() {
  const { lang } = useLang();
  return <>{lang === 'pt' ? 'Envio CTT registado' : 'Registered CTT shipping'}</>;
}

function ArtBadgeSafe() {
  const { lang } = useLang();
  return <>{lang === 'pt' ? 'Embalagem segura' : 'Secure packaging'}</>;
}

export default function ComoFunciona() {
  const { lang } = useLang();
  const t = TEXTS[lang];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Avanço automático entre passos (pausa ao interagir / fora do ecrã).
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, AUTO_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true); // assim que o cliente interage, deixamos de avançar sozinhos
  };

  const progress = ((active + 1) / STEPS.length) * 100;

  return (
    <section className="section section--alt" id="como-funciona">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>{t.eyebrow}</span>
          {lang === 'pt' ? (
            <h2 className="h2">O percurso da tua ideia<br />até à tua <span className="hand-underline">porta</span>.</h2>
          ) : (
            <h2 className="h2">Your idea&apos;s journey<br />to your <span className="hand-underline">door</span>.</h2>
          )}
        </div>

        <div
          className="stepper reveal"
          onMouseEnter={() => setPaused(true)}
          onFocusCapture={() => setPaused(true)}
        >
          {/* Navegação — nós clicáveis com barra de progresso */}
          <div className="stepper__nav" role="tablist" aria-label={t.ariaTabs}>
            <div className="stepper__track" aria-hidden="true">
              <div className="stepper__fill" style={{ width: `${progress}%` }} />
            </div>
            {STEPS.map((s, i) => {
              const state = i === active ? 'is-active' : i < active ? 'is-done' : '';
              return (
                <button
                  key={s.n}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`step-panel-${i}`}
                  className={`stepper__node ${state}`}
                  onClick={() => select(i)}
                >
                  <span className="stepper__dot">
                    {i < active ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      s.n
                    )}
                  </span>
                  <span className="stepper__label">{t.steps[i].short}</span>
                </button>
              );
            })}
          </div>

          {/* Painel do passo ativo */}
          <div className="stepper__panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id={`step-panel-${active}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="stepper__panel-num">{STEPS[active].n}</span>
                <h3>{t.steps[active].title}</h3>
                <p>{t.steps[active].text}</p>
                {STEPS[active].art}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
