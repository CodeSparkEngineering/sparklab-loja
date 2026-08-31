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
    stepLabel: 'Passo',
    steps: [
      { title: 'Envia a tua ideia', desc: 'Ficheiro 3D ou só a descrição. Sem ficheiro? Nós tratamos da modelação.' },
      { title: 'Recebe o orçamento', desc: 'Preço e prazo em até 2 horas úteis, no WhatsApp — sem compromisso.' },
      { title: 'Produzimos e enviamos', desc: 'Impresso nas nossas Bambu Lab P1S e enviado via CTT registado, para todo o Portugal.' },
    ],
    nextFoot: 'Orçamento gratuito · Sem compromisso',
    quote: 'Excelente trabalho! Ficou muito bem feito, com atenção aos detalhes e um acabamento impecável. Recomendo sem dúvida!',
    quoteName: 'Caroliny Alves',
    quoteSource: 'Avaliação no Google',
    quoteAria: 'Ver as nossas avaliações no Google',
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'Quanto custa uma impressão 3D em Portugal?', a: 'Depende do tamanho, do material e do tempo de impressão da peça. Por isso o orçamento é gratuito e sem compromisso — envia a tua ideia ou ficheiro e recebes o preço exato em até 2 horas úteis.' },
      { q: 'Não tenho um ficheiro 3D. Conseguem ajudar?', a: 'Sim. Se não tens ficheiro STL, descreve a ideia (ou envia uma foto ou desenho) e a nossa equipa trata da modelação 3D por ti.' },
      { q: 'Que ficheiros posso enviar?', a: 'Aceitamos STL, OBJ, 3MF e STEP. Não tens ficheiro 3D? Anexa uma foto ou desenho da ideia (JPG, PNG, PDF) diretamente no formulário.' },
      { q: 'Como posso pagar?', a: 'Depois de aprovares o orçamento, podes pagar por cartão (Stripe) ou MB WAY. Pagamento seguro, sempre.' },
      { q: 'Fazem envio para todo o país?', a: 'Sim, enviamos para todo o Portugal via CTT registado com seguimento. Envio grátis a partir de 40 €.' },
    ],
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
    stepLabel: 'Step',
    steps: [
      { title: 'Send your idea', desc: 'A 3D file or just a description. No file? We handle the modeling.' },
      { title: 'Get your quote', desc: 'Price and timeline within 2 business hours, on WhatsApp — no strings attached.' },
      { title: 'We produce and ship', desc: 'Printed on our Bambu Lab P1S machines and shipped via registered CTT, across Portugal.' },
    ],
    nextFoot: 'Free quote · No strings attached',
    quote: 'Excellent work! It turned out really well, with attention to detail and a flawless finish. I recommend it without a doubt!',
    quoteName: 'Caroliny Alves',
    quoteSource: 'Google review',
    quoteAria: 'See our Google reviews',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'How much does 3D printing cost in Portugal?', a: "It depends on the size, material and print time of the piece. That's why the quote is free and non-binding — send your idea or file and get the exact price within 2 business hours." },
      { q: "I don't have a 3D file. Can you help?", a: "Yes. If you don't have an STL file, describe the idea (or send a photo or sketch) and our team handles the 3D modeling for you." },
      { q: 'What files can I send?', a: 'We accept STL, OBJ, 3MF and STEP. No 3D file? Attach a photo or sketch of the idea (JPG, PNG, PDF) directly in the form.' },
      { q: 'How can I pay?', a: 'After you approve the quote, you can pay by card (Stripe) or MB WAY. Secure payment, always.' },
      { q: 'Do you ship across the country?', a: 'Yes, we ship across Portugal via registered CTT mail with tracking. Free shipping over €40.' },
    ],
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

  // FAQPage sempre em PT (canónico do site), emitido no SSR e citável pela IA.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: L.pt.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    // `dark` força o aspeto escuro nesta landing (o vídeo é escuro): o
    // formulário partilhado e os cartões seguem, independentemente do tema.
    <main className="dark relative min-h-screen pt-28 pb-20">
      {/* Véu por cima do vídeo GLOBAL do site (BackgroundScrollVideo, no
          layout) — o main é transparente de propósito para o deixar ver; o
          gradiente garante a leitura do texto branco. O vídeo já chega
          pré-escurecido pelo scrim do próprio componente. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-stone-950/50 via-stone-950/40 to-stone-950/85 sm:from-stone-950/75 sm:via-stone-950/65 sm:to-stone-950/90" />

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
              className="-my-2 inline-flex items-center gap-1.5 py-2 font-medium hover:text-orange-300"
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
            {/* O que acontece a seguir — timeline com ícones e ligação entre passos */}
            <div className="rounded-2xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur-md">
              <h2 className="mb-5 text-xs font-bold uppercase tracking-wide text-stone-400">
                {t.nextTitle}
              </h2>
              <ol>
                {t.steps.map((step, i) => (
                  <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Linha que liga os passos (não no último) */}
                    {i < t.steps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[19px] top-11 bottom-0 w-px bg-gradient-to-b from-orange-500/60 to-orange-500/10"
                      />
                    )}
                    {/* Ícone do passo, com halo da marca */}
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_4px_16px_-4px_rgba(249,115,22,.55)] ring-1 ring-white/20">
                      {i === 0 && (
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      )}
                      {i === 1 && (
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                      )}
                      {i === 2 && (
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                      )}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                        {t.stepLabel} {i + 1}
                      </span>
                      <h3 className="mt-0.5 text-sm font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-stone-300">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-white/10 pt-3 text-center text-xs font-medium text-stone-400">
                ✓ {t.nextFoot}
              </p>
            </div>

            {/* Depoimento real (5★, Google) — cartão clicável para o perfil Google */}
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.quoteAria}
              className="group block rounded-2xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur-md transition hover:border-orange-400/40 hover:bg-stone-900/80"
            >
              <figure>
                <Stars />
                <blockquote className="mt-2 text-sm leading-relaxed text-stone-100">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-3 flex items-center gap-1.5 text-xs text-stone-400">
                  <GoogleMark size={13} />
                  <strong className="font-semibold text-stone-200">{t.quoteName}</strong>
                  <span aria-hidden="true">·</span>
                  <span className="transition-colors group-hover:text-orange-300">{t.quoteSource}</span>
                  <svg className="ml-auto h-3.5 w-3.5 shrink-0 text-stone-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                </figcaption>
              </figure>
            </a>

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

        {/* FAQ — responde às objeções no momento da decisão + FAQPage schema */}
        <section className="mx-auto mt-16 max-w-2xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
          />
          <h2 className="mb-6 text-center text-2xl font-bold text-white">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faq.map((item, i) => (
              <details key={i} className="group overflow-hidden rounded-xl border border-white/10 bg-stone-900/70 backdrop-blur-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-stone-100 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg className="h-5 w-5 shrink-0 text-orange-400 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-stone-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/#catalogo" className="inline-block px-4 py-3 text-sm text-stone-300 underline underline-offset-2 hover:text-orange-300">
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
