'use client';

/**
 * i18n leve por toggle (PT default, EN opcional).
 *
 * - O servidor renderiza SEMPRE em PT (SEO/hidratação); se o visitante
 *   escolheu EN antes, o texto troca logo após a hidratação.
 * - Cada componente guarda o seu conteúdo bilíngue localmente:
 *     const L = { pt: {...}, en: {...} } as const;
 *     const t = L[useLang().lang];
 * - Dados de produto usam os campos opcionais nameEn/descEn/labelEn
 *   através dos helpers pName/pDesc/cLabel abaixo.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { CustomizationOption, Product } from '@/data/products';

export type Lang = 'pt' | 'en';

const STORAGE_KEY = 'sparklab-lang';

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'pt',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');

  // Restaura a preferência guardada (só no cliente, pós-hidratação).
  useEffect(() => {
    try {
      // Hidratação SSR-safe: só o cliente tem localStorage; ler no render daria
      // hydration mismatch. O setState-em-effect é intencional e correto aqui.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (window.localStorage.getItem(STORAGE_KEY) === 'en') setLangState('en');
    } catch {
      /* storage indisponível — segue em PT */
    }
  }, []);

  // Mantém o atributo lang do documento coerente (leitores de ecrã, tradutores).
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignora */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/* ── Helpers para dados de produto ─────────────────────────── */

export function pName(p: Product, lang: Lang): string {
  return lang === 'en' && p.nameEn ? p.nameEn : p.name;
}

export function pDesc(p: Product, lang: Lang): string {
  return lang === 'en' && p.descEn ? p.descEn : p.desc;
}

export function cLabel(opt: CustomizationOption, lang: Lang): string {
  return lang === 'en' && opt.labelEn ? opt.labelEn : opt.label;
}

/**
 * Etiquetas dos NICHOS do catálogo (as tags dos dados ficam em PT).
 * Tem de acompanhar os `label` de NICHES em @/data/products.
 */
const TAG_LABELS_EN: Record<string, string> = {
  'Todos': 'All',
  'Articulados': 'Articulated',
  'Fidgets': 'Fidgets',
  'Luminárias': 'Lamps',
  'Decoração': 'Decor',
  'Setup Gamer': 'Gaming Setup',
  'Secretária': 'Desk',
};

export function tagLabel(tag: string, lang: Lang): string {
  return lang === 'en' ? TAG_LABELS_EN[tag] ?? tag : tag;
}
