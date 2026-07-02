/**
 * Componentes partilhados dos artigos /guias (Server Components).
 * Cada page.mdx usa: <GuiaTopo slug="..." /> no início e <GuiaCta /> no fim.
 */

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getGuiaBySlug } from '@/data/guias';
import { SITE_URL } from '@/data/site';

function formatDatePt(iso: string): string {
  return new Intl.DateTimeFormat('pt-PT', { dateStyle: 'long' }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}

/** Breadcrumb + meta do artigo + JSON-LD (Article e BreadcrumbList). */
export function GuiaTopo({ slug }: { slug: string }) {
  const guia = getGuiaBySlug(slug);
  if (!guia) return null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guia.title,
    description: guia.description,
    datePublished: guia.datePublished,
    dateModified: guia.dateModified ?? guia.datePublished,
    inLanguage: 'pt-PT',
    mainEntityOfPage: `${SITE_URL}/guias/${guia.slug}`,
    author: { '@id': `${SITE_URL}/#business` },
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
        Todos os guias
      </Link>
      <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400 mb-4">
        <span>{formatDatePt(guia.dateModified ?? guia.datePublished)}</span>
        <span aria-hidden="true">·</span>
        <span>{guia.minutes} min de leitura</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
          SparkLab
        </span>
      </div>
    </>
  );
}

/** CTA no fim de cada artigo → formulário de orçamento. */
export function GuiaCta() {
  return (
    <aside className="mt-12 rounded-3xl border border-orange-200 dark:border-orange-500/25 bg-orange-50 dark:bg-orange-500/10 p-8 text-center">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        Tens uma peça em mente?
      </h2>
      <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md mx-auto">
        Envia o ficheiro (ou só a ideia) e recebe um orçamento sem compromisso —
        respondemos em até 2 horas úteis no WhatsApp.
      </p>
      <Link href="/#orcamento" className="btn btn--primary">
        Pedir orçamento grátis
      </Link>
    </aside>
  );
}
