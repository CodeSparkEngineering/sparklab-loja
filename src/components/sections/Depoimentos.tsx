'use client';

import { useLang } from '@/i18n/LanguageContext';
import { GoogleMark } from '@/components/brand-marks';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from '@/data/site';

const L = {
  pt: {
    stars: '5 estrelas',
    eyebrow: 'o que dizem de nós',
    seeReviews: 'Ver avaliações no Google',
    leaveReview: 'Deixa a tua avaliação',
    headingLine1: 'Quem já recebeu,',
    headingPre: 'voltou a ',
    headingWord: 'pedir',
    quotes: [
      {
        text: 'Eu recomendo muito este serviço. Pedi o meu com todos esses detalhes e ficou perfeito. Excelente serviço. Parabéns, amei.',
        name: 'Flavio Rodrigues',
        role: 'Avaliação no Google',
        google: true,
      },
      {
        text: 'Vendedor é atencioso e rápido com a encomenda.',
        name: 'Alex Souza',
        role: 'Avaliação no Google',
        google: true,
      },
      {
        text: 'Excelente trabalho! Ficou muito bem feito, com atenção aos detalhes e um acabamento impecável. Dá para ver o profissionalismo e o cuidado em cada etapa. Recomendo sem dúvida!',
        name: 'Caroliny Alves',
        role: 'Avaliação no Google',
        google: true,
      },
    ],
  },
  en: {
    stars: '5 stars',
    eyebrow: 'what people say',
    seeReviews: 'See our Google reviews',
    leaveReview: 'Leave your review',
    headingLine1: 'Those who ordered once,',
    headingPre: 'ordered ',
    headingWord: 'again',
    quotes: [
      {
        text: 'I highly recommend this service. I ordered mine with all those details and it came out perfect. Excellent service. Congratulations, I loved it.',
        name: 'Flavio Rodrigues',
        role: 'Google review',
        google: true,
      },
      {
        text: 'The seller is attentive and quick with the order.',
        name: 'Alex Souza',
        role: 'Google review',
        google: true,
      },
      {
        text: 'Excellent work! It turned out really well, with attention to detail and a flawless finish. You can see the professionalism and the care at every step. I recommend it without a doubt!',
        name: 'Caroliny Alves',
        role: 'Google review',
        google: true,
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
                  <small className={quote.google ? 'quote__source' : undefined}>
                    {quote.google && <GoogleMark size={13} />}
                    {quote.role}
                  </small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Avaliações reais no Perfil de Empresa do Google (SparkLab3D). */}
        <div className="reviews-cta reveal">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            <GoogleMark />
            {t.seeReviews}
          </a>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            ⭐ {t.leaveReview}
          </a>
        </div>
      </div>
    </section>
  );
}
