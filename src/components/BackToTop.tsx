'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: { label: 'Voltar ao topo' },
  en: { label: 'Back to top' },
} as const;

/**
 * Botão flutuante "voltar ao topo". Aparece depois de ~1 ecrã de scroll e faz
 * scroll suave para o topo (respeita prefers-reduced-motion). Fica em z-90 —
 * por baixo do header (100), da barra sticky do produto (110) e do carrinho
 * (200), para nunca tapar nenhuma acção. À direita, empilha-se ACIMA do botão
 * de telefone flutuante (ver WhatsAppFloat) — daí o bottom elevado.
 */
export default function BackToTop() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={L[lang].label}
      title={L[lang].label}
      className={`fixed z-[90] right-4 sm:right-6 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:bottom-[5.75rem]
        grid place-items-center w-11 h-11 rounded-full
        bg-white/90 dark:bg-stone-900/90 backdrop-blur
        border border-stone-200 dark:border-white/10 shadow-lg
        text-stone-700 dark:text-stone-200
        hover:bg-white dark:hover:bg-stone-800 hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
        transition-all duration-300
        ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
