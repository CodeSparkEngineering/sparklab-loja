'use client';

import { getWhatsAppLink } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'catálogo local',
    text: 'Temos peças que já desenhámos e testámos até à exaustão. Prontas a serem tuas com um clique.',
    seeCatalog: 'Ver catálogo',
    whatsapp: 'Tirar dúvidas no WhatsApp',
    waMsg: 'Olá! Gostaria de conversar sobre uma impressão 3D.',
  },
  en: {
    eyebrow: 'local catalog',
    text: "We have pieces we've designed and tested to exhaustion. Ready to be yours in one click.",
    seeCatalog: 'View catalog',
    whatsapp: 'Ask us on WhatsApp',
    waMsg: "Hello! I'd like to talk about a 3D print.",
  },
} as const;

export default function CtaFinal() {
  const { lang } = useLang();
  const t = L[lang];

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(getWhatsAppLink(t.waMsg), '_blank', 'noopener');
  };

  return (
    <section className="cta" id="cta">
      <div className="container">
        <div className="cta__banner reveal">
          <div className="cta__text">
            <span className="eyebrow--hand" style={{ color: '#1a0d04' }}>{t.eyebrow}</span>
            {lang === 'pt' ? (
              <h2 className="h2">Preferes não esperar?<br />Espreita o que já temos.</h2>
            ) : (
              <h2 className="h2">Rather not wait?<br />Check what we already have.</h2>
            )}
            <p>{t.text}</p>
          </div>
          <div className="cta__actions">
            <a href="#catalogo" className="btn btn--dark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              {t.seeCatalog}
            </a>
            <a href="#" className="btn btn--outline-dark" onClick={handleContact}>
              <WhatsAppIcon size={18} />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
