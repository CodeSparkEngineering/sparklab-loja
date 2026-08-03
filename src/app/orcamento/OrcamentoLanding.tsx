'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/i18n/LanguageContext';
import QuoteForm from '@/components/QuoteForm';
import { StripeMark, GoogleMark, MBWayMark } from '@/components/brand-marks';
import { GOOGLE_PROFILE_URL } from '@/data/site';

const L = {
  pt: {
    // Título literal que repete a pesquisa do anúncio (intent match).
    h1: 'Orçamento de impressão 3D em Portugal',
    sub: 'Envia o teu ficheiro 3D — ou só a ideia — e recebe o preço e o prazo, sem compromisso.',
    reply: 'Resposta em até 2 horas úteis no WhatsApp',
    tRating: '5,0 no Google',
    tPieces: '+150 peças criadas',
    tShip: 'Envio CTT registado',
    tPay: 'Pagamento seguro',
    home: 'Ver o catálogo',
    nextTitle: 'O que acontece a seguir',
    steps: [
      'Envias o teu ficheiro 3D — ou só a descrição da ideia. Sem ficheiro? Nós tratamos da modelação.',
      'Respondemos em até 2 horas úteis no WhatsApp, com o preço e o prazo — sem compromisso.',
      'Aprovas e produzimos nas nossas Bambu Lab P1S, com envio CTT registado para todo o Portugal.',
    ],
    quote: 'Excelente trabalho! Ficou muito bem feito, com atenção aos detalhes e um acabamento impecável. Recomendo sem dúvida!',
    quoteName: 'Caroliny Alves',
    quoteSource: 'Avaliação no Google',
  },
  en: {
    h1: '3D printing quote in Portugal',
    sub: 'Send us your 3D file — or just the idea — and get the price and timeline, no strings attached.',
    reply: 'We reply within 2 business hours on WhatsApp',
    tRating: '5.0 on Google',
    tPieces: '+150 pieces made',
    tShip: 'Registered CTT shipping',
    tPay: 'Secure payment',
    home: 'View the catalog',
    nextTitle: 'What happens next',
    steps: [
      'You send your 3D file — or just describe the idea. No file? We handle the modeling.',
      'We reply within 2 business hours on WhatsApp with the price and timeline — no strings attached.',
      'You approve and we produce on our Bambu Lab P1S printers, shipped via registered CTT across Portugal.',
    ],
    quote: 'Excellent work! It turned out really well, with attention to detail and a flawless finish. I recommend it without a doubt!',
    quoteName: 'Caroliny Alves',
    quoteSource: 'Google review',
  },
} as const;

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" role="img" aria-label="5/5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function OrcamentoLanding() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    // `dark` força o aspeto escuro nesta landing (o vídeo é escuro): o
    // formulário partilhado e os cartões seguem, independentemente do tema.
    <main className="dark relative min-h-screen bg-stone-950 pt-28 pb-20">
      {/* Fundo em vídeo — impressão 3D em grande plano, escurecido para leitura.
          Leve (~160 KB), mudo, em loop; o poster pinta de imediato. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/orcamento-bg-poster.webp"
        >
          <source src="/videos/orcamento-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/72 to-stone-950/90" />
      </div>

      {/* Logo no canto superior esquerdo — marca + regresso à página inicial */}
      <Link
        href="/"
        aria-label="SparkLab — página inicial"
        className="logo absolute left-4 top-6 z-20 sm:left-6 sm:top-7 [&_span]:!text-white"
      >
        <Image src="/logo.jpg" alt="SparkLab" width={32} height={32} className="logo__mark" />
        <span>Spark<em>Lab</em></span>
      </Link>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        {/* Título literal (intent match) + subtítulo + promessa + credibilidade */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,.5)]">
            {t.h1}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-stone-200 [text-shadow:0_1px_10px_rgba(0,0,0,.5)]">
            {t.sub}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-semibold text-green-200 ring-1 ring-green-400/30 backdrop-blur-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7h-.01c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.2-5.1c0 5.4-4.4 9.8-9.8 9.8z" /></svg>
            {t.reply}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-stone-200">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium hover:text-orange-300"
            >
              <GoogleMark size={15} />
              <span className="text-amber-400">★</span> {t.tRating}
            </a>
            <span className="inline-flex items-center gap-1.5 font-medium">🖨️ {t.tPieces}</span>
          </div>
        </div>

        {/* Desktop: 2 colunas (formulário + persuasão). Mobile: empilha com o
            formulário PRIMEIRO (form-first para o tráfego dos anúncios). */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
          {/* Formulário */}
          <div>
            <QuoteForm aside={false} />
          </div>

          {/* Painel de persuasão */}
          <aside className="space-y-5 lg:sticky lg:top-28">
            {/* O que acontece a seguir */}
            <div className="rounded-2xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur-md">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-stone-400">
                {t.nextTitle}
              </h2>
              <ol className="space-y-4">
                {t.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-stone-200">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Depoimento real (5★, Google) */}
            <figure className="rounded-2xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur-md">
              <Stars />
              <blockquote className="mt-2 text-sm leading-relaxed text-stone-100">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-1.5 text-xs text-stone-400">
                <GoogleMark size={13} />
                <strong className="font-semibold text-stone-200">{t.quoteName}</strong>
                <span aria-hidden="true">·</span> {t.quoteSource}
              </figcaption>
            </figure>

            {/* Garantias de transação */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-sm text-stone-200">
              <span className="inline-flex items-center gap-1.5 font-medium">🚚 {t.tShip}</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                {t.tPay} <StripeMark /> <MBWayMark />
              </span>
            </div>
          </aside>
        </div>

        <div className="mt-10 text-center">
          <Link href="/#catalogo" className="text-sm text-stone-300 underline underline-offset-2 hover:text-orange-300">
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
