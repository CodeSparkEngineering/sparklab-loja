'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { Check } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'ficheiros 3D',
    title: 'Gostavas de imprimir as nossas peças em casa?',
    sub: 'Se já tens a tua própria impressora, podes comprar os nossos modelos originais (.STL). Fala connosco e partilhamos a paixão.',
    points: [
      'Modelos prontos a imprimir, sem suportes',
      'As mesmas peças que vês no nosso catálogo',
      'Recebes o ficheiro direto no WhatsApp',
    ],
    cta: 'Pedir STL no WhatsApp',
    foot: 'Resposta em minutos · licença de uso pessoal',
    waMsg: 'Olá! Tenho interesse nos ficheiros STL das vossas peças. 🐙',
  },
  en: {
    eyebrow: '3D files',
    title: 'Want to print our pieces at home?',
    sub: `If you already own a printer, you can buy our original models (.STL). Talk to us and let's share the passion.`,
    points: [
      'Print-ready models, no supports needed',
      'The same pieces you see in our catalog',
      'You get the file straight on WhatsApp',
    ],
    cta: 'Request STL on WhatsApp',
    foot: 'Replies in minutes · personal use license',
    waMsg: "Hello! I'm interested in the STL files of your pieces. 🐙",
  },
} as const;

export default function Comunidade() {
  const { lang } = useLang();
  const t = L[lang];

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink(t.waMsg), '_blank', 'noopener');
  };

  return (
    <section className="section comunidade-section" id="comunidade">
      <div className="container">
        <div className="cmt-head">
          <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="cmt-sub">{t.sub}</p>
        </div>

        <div className="stl-card">
          <ul className="stl-card__points">
            {t.points.map((p) => (
              <li key={p}>
                <Check size={18} strokeWidth={2.6} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <a href="#" onClick={handleContact} className="stl-card__btn">
            <WhatsAppIcon size={20} />
            {t.cta}
          </a>

          <p className="stl-card__foot">{t.foot}</p>
        </div>
      </div>
    </section>
  );
}
