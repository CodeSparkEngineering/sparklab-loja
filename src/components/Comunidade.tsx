'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';

const PERKS = [
  { icon: '📦', title: 'STL prontos a imprimir', desc: 'Sem suportes, já testados' },
  { icon: '🎨', title: 'Modelos do catálogo', desc: 'As peças que vês na loja' },
  { icon: '💬', title: 'Atendimento direto', desc: 'Tira dúvidas no WhatsApp' },
  { icon: '⚡', title: 'Envio rápido', desc: 'Recebes o ficheiro no chat' },
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
          <span className="eyebrow eyebrow--orange">
            <span className="dot"></span> Ficheiros 3D
          </span>
          <h2 className="h2">Queres os nossos ficheiros STL?</h2>
          <p className="cmt-sub">
            Vendemos os STL das nossas peças sob encomenda. Fala connosco no
            WhatsApp e enviamos o ficheiro e o preço na hora.
          </p>
        </div>

        <div className="cmt-card">
          <div className="cmt-glow" aria-hidden="true"></div>

          <div className="cmt-icon" aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>

          <ul className="cmt-perks">
            {PERKS.map((p) => (
              <li key={p.title} className="cmt-perk">
                <span className="cmt-perk-emoji">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#"
            onClick={handleContact}
            className="cmt-cta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" /></svg>
            Pedir STL no WhatsApp
          </a>

          <p className="cmt-foot">Resposta em minutos</p>
        </div>
      </div>
    </section>
  );
}
