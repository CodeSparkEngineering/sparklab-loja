'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';

export default function CtaFinal() {
  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink('Olá! Gostaria de conversar sobre uma impressão 3D.'), '_blank', 'noopener');
  };

  return (
    <section className="cta" id="cta">
      <div className="container">
        <div className="cta__banner reveal">
          <div className="cta__text">
            <span className="eyebrow eyebrow--orange"><span className="dot"></span> Pronto para imprimir</span>
            <h2 className="h2">Tem um projeto em mente?<br />Vamos tirar do papel.</h2>
            <p>Envie seu arquivo ou descreva a ideia pelo WhatsApp. Respondemos em minutos com orçamento e prazo.</p>
          </div>
          <div className="cta__actions">
            <a href="#" className="btn btn--whatsapp" onClick={handleContact}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5 0-.1-.3-.2-.6-.4z" /></svg>
              Falar no WhatsApp
            </a>
            <a href="#catalogo" className="btn btn--outline-light">Ver catálogo</a>
          </div>
        </div>
      </div>
    </section>
  );
}
