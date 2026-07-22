'use client';

/**
 * Componentes partilhados dos artigos /guias (bilíngues PT/EN).
 * Cada page.mdx usa:
 *   <GuiaTopo slug="..." />           no início
 *   <GuiaLang lang="pt"> … </GuiaLang> conteúdo português
 *   <GuiaLang lang="en"> … </GuiaLang> conteúdo inglês
 *   <GuiaRodape slug="..." />         no fim
 *
 * Os JSON-LD ficam sempre em PT (o SEO canónico do site é português) e são
 * emitidos no SSR — componentes client também renderizam no servidor.
 */

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getGuiaBySlug, guiasRecentes, gTitle } from '@/data/guias';
import { SITE_URL } from '@/data/site';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { useLang, type Lang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    all: 'Todos os guias',
    minutes: (n: number) => `${n} min de leitura`,
    shareText: 'Achaste útil? Partilha com um amigo.',
    shareBtn: 'Partilhar no WhatsApp',
    ctaTitle: 'Tens uma peça em mente?',
    ctaText:
      'Envia o ficheiro (ou só a ideia) e recebe um orçamento sem compromisso — respondemos em até 2 horas úteis no WhatsApp.',
    ctaBtn: 'Pedir orçamento grátis',
    related: 'Lê também',
    dateLocale: 'pt-PT',
  },
  en: {
    all: 'All guides',
    minutes: (n: number) => `${n} min read`,
    shareText: 'Found this useful? Share it with a friend.',
    shareBtn: 'Share on WhatsApp',
    ctaTitle: 'Got a piece in mind?',
    ctaText:
      "Send us the file (or just the idea) and get a quote with no strings attached — we reply within 2 business hours on WhatsApp.",
    ctaBtn: 'Get a free quote',
    related: 'Read next',
    dateLocale: 'en-GB',
  },
} as const;

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}

/** Mostra os filhos apenas quando o idioma ativo corresponde. */
export function GuiaLang({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const { lang: current } = useLang();
  return current === lang ? <>{children}</> : null;
}

/** Breadcrumb + meta do artigo + JSON-LD (Article e BreadcrumbList, em PT). */
export function GuiaTopo({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = L[lang];
  const guia = getGuiaBySlug(slug);
  if (!guia) return null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guia.title,
    description: guia.description,
    ...(guia.image ? { image: [`${SITE_URL}${guia.image}`] } : {}),
    datePublished: guia.datePublished,
    dateModified: guia.dateModified ?? guia.datePublished,
    inLanguage: 'pt-PT',
    mainEntityOfPage: `${SITE_URL}/guias/${guia.slug}`,
    author: {
      '@type': 'Person',
      name: 'Israel',
      url: 'https://www.skills.google/public_profiles/19f1e48a-2c56-4997-9529-1f921169eead',
      jobTitle: 'Especialista em Impressão 3D e Cloud'
    },
    publisher: { '@id': `${SITE_URL}/#business` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guias', item: `${SITE_URL}/guias` },
      { '@type': 'ListItem', position: 3, name: guia.title, item: `${SITE_URL}/guias/${guia.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <Link
        href="/guias"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.all}
      </Link>
      <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400 mb-4">
        <span>{formatDate(guia.dateModified ?? guia.datePublished, t.dateLocale)}</span>
        <span aria-hidden="true">·</span>
        <span>{t.minutes(guia.minutes)}</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
          Por Israel
        </span>
      </div>
    </>
  );
}

/**
 * Rodapé completo do artigo: partilha no WhatsApp + CTA de orçamento +
 * "Lê também" (registry-driven — artigos futuros aparecem sozinhos).
 */
export function GuiaRodape({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = L[lang];
  const guia = getGuiaBySlug(slug);
  const relacionados = guiasRecentes().filter((g) => g.slug !== slug).slice(0, 2);

  const shareText = guia
    ? `${gTitle(guia, lang)}\n${SITE_URL}/guias/${guia.slug}`
    : `${SITE_URL}/guias`;
  const shareHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <>
      {/* Partilha — em Portugal, partilhar É o WhatsApp */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 px-6 py-5">
        <p className="text-stone-700 dark:text-stone-300 font-medium m-0">
          {t.shareText}
        </p>
        <a
          href={shareHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fbd5a] text-white font-semibold text-sm px-5 py-2.5 transition-colors shrink-0"
        >
          <WhatsAppIcon size={18} />
          {t.shareBtn}
        </a>
      </div>

      <GuiaCta />

      {relacionados.length > 0 && (
        <section className="mt-12" aria-label={t.related}>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-5">
            {t.related}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relacionados.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group card p-5 flex gap-4 items-center hover:border-orange-300 dark:hover:border-orange-500/40 transition-colors"
              >
                {g.image ? (
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800">
                    <Image src={g.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                ) : (
                  <span className="text-3xl shrink-0" aria-hidden="true">{g.emoji}</span>
                )}
                <div>
                  <span className="block font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                    {gTitle(g, lang)}
                  </span>
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {t.minutes(g.minutes)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/** CTA no fim de cada artigo → formulário de orçamento. */
export function GuiaCta() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <aside className="mt-12 rounded-3xl border border-orange-200 dark:border-orange-500/25 bg-orange-50 dark:bg-orange-500/10 p-8 text-center">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        {t.ctaTitle}
      </h2>
      <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md mx-auto">
        {t.ctaText}
      </p>
      <Link href="/#orcamento" className="btn btn--primary">
        {t.ctaBtn}
      </Link>
    </aside>
  );
}
