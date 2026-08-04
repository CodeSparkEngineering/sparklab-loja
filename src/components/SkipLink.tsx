'use client';

import { useLang } from '@/i18n/LanguageContext';

/**
 * "Saltar para o conteúdo" (WCAG 2.4.1) — o primeiro elemento focável da
 * página. Invisível até receber foco por Tab; ao ativar, foca o <main> da
 * página atual (funciona em todas as rotas sem exigir id por página).
 */
export default function SkipLink() {
  const { lang } = useLang();
  const label = lang === 'en' ? 'Skip to main content' : 'Saltar para o conteúdo principal';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector<HTMLElement>('main');
    if (!main) return;
    main.setAttribute('tabindex', '-1'); // torna o main focável (uma vez)
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  };

  return (
    <a
      href="#conteudo"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300]
        focus:rounded-full focus:bg-orange-600 focus:px-5 focus:py-2.5
        focus:text-sm focus:font-bold focus:text-white focus:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-white"
    >
      {label}
    </a>
  );
}
