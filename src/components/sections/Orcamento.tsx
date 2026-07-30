'use client';

import { useLang } from '@/i18n/LanguageContext';
import QuoteForm from '@/components/QuoteForm';

export default function Orcamento() {
  const { lang } = useLang();

  return (
    <section className="section" id="orcamento">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow eyebrow--olive">
            <span className="dot dot--olive"></span> {lang === 'pt' ? 'Orçamento rápido' : 'Quick quote'}
          </span>
          {lang === 'pt' ? (
            <h2 className="h2">Tens um ficheiro?<br />Recebe um orçamento hoje.</h2>
          ) : (
            <h2 className="h2">Got a file?<br />Get a quote today.</h2>
          )}
        </div>

        <QuoteForm />
      </div>
    </section>
  );
}
