'use client';

import Link from 'next/link';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    title: 'Página não encontrada',
    text: 'A peça que procuras não está aqui — mas temos muitas outras a ganhar forma na oficina. Espreita o catálogo!',
    home: 'Voltar ao início',
    catalog: 'Ver catálogo',
  },
  en: {
    title: 'Page not found',
    text: "The piece you're looking for isn't here — but we have plenty more taking shape in the workshop. Have a look at the catalog!",
    home: 'Back to home',
    catalog: 'View catalog',
  },
} as const;

export default function NotFound() {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="text-center max-w-md">
        <span className="text-8xl font-bold text-stone-200 dark:text-stone-800 select-none">404</span>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-4 mb-3">
          {t.title}
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
          {t.text}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn btn--primary">
            {t.home}
          </Link>
          <Link href="/#catalogo" className="btn btn--ghost">
            {t.catalog}
          </Link>
        </div>
      </div>
    </main>
  );
}
