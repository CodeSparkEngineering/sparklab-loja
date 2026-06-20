'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';
import { Check } from 'lucide-react';

const POINTS = [
  'Modelos prontos a imprimir, sem suportes',
  'As mesmas peças que vês no nosso catálogo',
  'Recebes o ficheiro direto no WhatsApp',
];

const WHATSAPP_MSG = 'Olá! Tenho interesse nos ficheiros STL das vossas peças. 🐙';

export default function Comunidade() {
  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink(WHATSAPP_MSG), '_blank', 'noopener');
  };

  return (
    <section className="section comunidade-section" id="comunidade">
      <div className="container">
        <div className="cmt-head">
          <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>ficheiros 3D</span>
          <h2 className="h2">Gostavas de imprimir as nossas peças em casa?</h2>
          <p className="cmt-sub">
            Se já tens a tua própria impressora, podes comprar os nossos modelos
            originais (.STL). Fala connosco e partilhamos a paixão.
          </p>
        </div>

        <div className="stl-card">
          <ul className="stl-card__points">
            {POINTS.map((p) => (
              <li key={p}>
                <Check size={18} strokeWidth={2.6} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <a href="#" onClick={handleContact} className="stl-card__btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" /></svg>
            Pedir STL no WhatsApp
          </a>

          <p className="stl-card__foot">Resposta em minutos · licença de uso pessoal</p>
        </div>
      </div>
    </section>
  );
}
