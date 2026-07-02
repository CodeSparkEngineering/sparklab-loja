'use client';

import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    stars: '5 estrelas',
    eyebrow: 'o que dizem de nós',
    headingLine1: 'Quem já recebeu,',
    headingPre: 'voltou a ',
    headingWord: 'pedir',
    quotes: [
      {
        text: 'Pedi miniaturas para o meu jogo de tabuleiro e a qualidade surpreendeu. Detalhes minúsculos perfeitos e a entrega foi mais rápida do que prometido.',
        name: 'Mariana Freitas',
        role: 'Designer de jogos · Lisboa',
      },
      {
        text: 'Precisava de uma peça de substituição que o fabricante já não vendia. Enviei o desenho e, em dois dias, estava a funcionar como nova.',
        name: 'Rafael Monteiro',
        role: 'Engenheiro mecânico · Porto',
      },
      {
        text: 'A luminária com foto da minha filha ficou linda. Atendimento no WhatsApp foi atencioso e ajudaram-me a escolher a melhor imagem.',
        name: 'Camila Duarte',
        role: 'Cliente desde 2024 · Braga',
      },
    ],
  },
  en: {
    stars: '5 stars',
    eyebrow: 'what people say',
    headingLine1: 'Those who ordered once,',
    headingPre: 'ordered ',
    headingWord: 'again',
    quotes: [
      {
        text: 'I ordered miniatures for my board game and the quality blew me away. Tiny details came out perfect and delivery was faster than promised.',
        name: 'Mariana Freitas',
        role: 'Game designer · Lisbon',
      },
      {
        text: 'I needed a replacement part the manufacturer no longer sold. I sent them the drawing and, within two days, it was working like new.',
        name: 'Rafael Monteiro',
        role: 'Mechanical engineer · Porto',
      },
      {
        text: "The lamp with my daughter's photo turned out beautiful. The WhatsApp support was attentive and helped me pick the best image.",
        name: 'Camila Duarte',
        role: 'Customer since 2024 · Braga',
      },
    ],
  },
} as const;

const StarsSVG = ({ label }: { label: string }) => (
  <div className="stars" aria-label={label}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function Depoimentos() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <section className="section section--alt" id="depoimentos">
      <div className="container">
        <div className="section__head reveal" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <span className="eyebrow--hand" style={{ color: 'var(--blue)' }}>{t.eyebrow}</span>
          <h2 className="h2">{t.headingLine1}<br />{t.headingPre}<span className="hand-underline">{t.headingWord}</span>.</h2>
        </div>

        <div className="grid grid--3 testimonials">
          {t.quotes.map((quote) => (
            <figure className="quote reveal" key={quote.name}>
              <StarsSVG label={t.stars} />
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              <figcaption>
                <div>
                  <strong>{quote.name}</strong>
                  <small>{quote.role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
