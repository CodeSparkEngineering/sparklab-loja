'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
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
            <WhatsAppIcon size={20} />
            Pedir STL no WhatsApp
          </a>

          <p className="stl-card__foot">Resposta em minutos · licença de uso pessoal</p>
        </div>
      </div>
    </section>
  );
}
