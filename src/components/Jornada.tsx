'use client';

import { useEffect, useRef, useState } from 'react';

const BEATS = [
  { n: '01', big: 'A tua ideia.', sub: 'Envia um ficheiro 3D ou descreve o que imaginas.' },
  { n: '02', big: 'Impressa em 3D.', sub: 'Bambu Lab P1S, com acabamento profissional.' },
  { n: '03', big: 'Na tua mão.', sub: 'Entregue em casa, em todo o Portugal.' },
];

export default function Jornada() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0); // progresso 0..1 dentro da secção fixada

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setP(total > 0 ? scrolled / total : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(BEATS.length - 1, Math.floor(p * BEATS.length));

  return (
    <section className="pin" ref={ref} aria-label="Da ideia à peça">
      <div className="pin__sticky">
        <span className="pin__eyebrow">A nossa promessa</span>

        {BEATS.map((b, i) => (
          <div
            key={b.n}
            className={`pin__beat ${i === active ? 'is-active' : i < active ? 'is-past' : ''}`}
            aria-hidden={i !== active}
          >
            <span className="pin__num">{b.n}</span>
            <h2 className="pin__big">{b.big}</h2>
            <p className="pin__sub">{b.sub}</p>
          </div>
        ))}

        <div className="pin__dots" aria-hidden="true">
          {BEATS.map((b, i) => (
            <span key={b.n} className={`pin__dot ${i <= active ? 'is-on' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
