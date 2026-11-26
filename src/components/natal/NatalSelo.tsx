'use client';

import { useLang } from '@/i18n/LanguageContext';
import { NATAL, faseNatal } from '@/data/natal';
import { useAgora } from './useAgora';

/**
 * Selo de Natal do hero: a primeira coisa que o visitante vê e que o leva
 * direto à faixa de prendas. Desaparece sozinho depois do Natal.
 */

const L = {
  pt: {
    titulo: 'Prendas de Natal',
    aTempo: (data: string) => `encomenda até ${data}`,
    tarde: 'ainda vais a tempo?',
  },
  en: {
    titulo: 'Christmas gifts',
    aTempo: (data: string) => `order by ${data}`,
    tarde: 'still in time?',
  },
} as const;

export default function NatalSelo() {
  const { lang } = useLang();
  const t = L[lang];
  const agora = useAgora();
  const fase = agora ? faseNatal(agora) : 'a-tempo';

  if (fase === 'terminada') return null;

  const data = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pt-PT', {
    day: 'numeric',
    month: 'long',
  }).format(NATAL.ultimoDia);

  return (
    <a href="#natal" className="natal-selo">
      <span aria-hidden="true">🎁</span>
      <span>
        <strong>{t.titulo}</strong> · {fase === 'a-tempo' ? t.aTempo(data) : t.tarde}
      </span>
      <span className="natal-selo__seta" aria-hidden="true">→</span>
    </a>
  );
}
