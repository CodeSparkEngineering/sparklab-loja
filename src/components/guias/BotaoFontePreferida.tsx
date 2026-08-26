'use client';

/**
 * Botão "adicionar como fonte preferida" do Google (Preferred Sources).
 *
 * O que faz: quem clica está a dizer ao Google que quer ver mais SparkLab em
 * Search, Discover, Top Stories, AI Overviews e AI Mode. O Google infere o
 * domínio da própria página — não há ID nenhum a passar.
 *
 * Onde vive: no rodapé dos guias. É lá que está quem acabou de achar o texto
 * útil; na loja seria pedir a coisa errada à pessoa errada.
 *
 * Salvaguarda importante: o script vem de news.google.com e é bloqueado por
 * muitos bloqueadores de anúncios. Por isso a frase só aparece DEPOIS de o
 * Google desenhar mesmo o botão — senão ficava um convite a apontar para um
 * espaço vazio.
 *
 * Requer as entradas de news.google.com na CSP (ver next.config.ts).
 */

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useLang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    label: 'Foi útil? Diz ao Google para te mostrar mais coisas nossas.',
  },
  en: {
    label: 'Was this useful? Tell Google to show you more from us.',
  },
} as const;

export default function BotaoFontePreferida() {
  const { lang } = useLang();
  const slotRef = useRef<HTMLDivElement>(null);
  const [pronto, setPronto] = useState(false);
  const [tema, setTema] = useState<'light' | 'dark'>('dark');

  // O tema é a classe .dark no <html> (ver globals.css).
  useEffect(() => {
    setTema(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  // Só revelamos o bloco quando o Google injetar mesmo o botão no slot.
  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;
    if (el.childElementCount > 0) {
      setPronto(true);
      return;
    }
    const mo = new MutationObserver(() => {
      if (el.childElementCount > 0) {
        setPronto(true);
        mo.disconnect();
      }
    });
    mo.observe(el, { childList: true });
    // Se ao fim de 10s nada apareceu, foi bloqueado — fica tudo invisível.
    const timer = window.setTimeout(() => mo.disconnect(), 10000);
    return () => {
      window.clearTimeout(timer);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <Script
        id="google-preferred-sources"
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="lazyOnload"
      />
      <div
        className={
          pronto
            ? 'mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5 px-6 py-5'
            : undefined
        }
      >
        {pronto && (
          <p className="text-stone-700 dark:text-stone-300 font-medium m-0">
            {L[lang].label}
          </p>
        )}
        <div
          ref={slotRef}
          data-theme={tema}
          data-lang={lang}
          {...{ 'google-add-preferred-source-btn': '' }}
        />
      </div>
    </>
  );
}
