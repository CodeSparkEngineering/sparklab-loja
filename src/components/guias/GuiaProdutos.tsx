'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getProductById } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Bloco de produtos recomendados dentro de um guia — transforma o tráfego do
 * blog (Google/ChatGPT) em vendas, ligando o leitor a peças compráveis.
 *
 * Bilíngue (usa useLang), por isso coloca-se UMA vez, DEPOIS dos dois
 * <GuiaLang> (como o GuiaFAQ/GuiaFontes) e antes do rodapé:
 *   <GuiaProdutos ids={['trofeu-quimono', 'porta-latas-ratinha-rosa']} />
 *
 * Cada cartão liga a /produto/<id>, onde o cliente personaliza e compra.
 * IDs sem produto ou sem imagem são ignorados em silêncio.
 */

const L = {
  pt: {
    title: 'Peças que podes encomendar já',
    subtitle: 'Feitas à mão nas nossas Bambu Lab, personalizáveis e enviadas para todo o Portugal.',
    custom: 'Personalizável',
    see: 'Ver',
  },
  en: {
    title: 'Pieces you can order now',
    subtitle: 'Handmade on our Bambu Lab printers, customizable and shipped across Portugal.',
    custom: 'Customizable',
    see: 'View',
  },
} as const;

export function GuiaProdutos({
  ids,
  title,
  titleEn,
  subtitle,
  subtitleEn,
}: {
  ids: string[];
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
}) {
  const { lang } = useLang();
  const t = L[lang];

  const produtos = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.images?.[0]));

  if (produtos.length === 0) return null;

  const heading = (lang === 'en' ? titleEn : title) ?? t.title;
  const sub = (lang === 'en' ? subtitleEn : subtitle) ?? t.subtitle;

  return (
    <section className="my-10" aria-label={heading}>
      <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">{heading}</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5 mt-0">{sub}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {produtos.map((p) => {
          const name = lang === 'en' && p.nameEn ? p.nameEn : p.name;
          const personalizavel = Boolean(p.customizations?.length);
          return (
            <Link
              key={p.id}
              href={`/produto/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--bg-card)] shadow-sm hover:border-orange-400/60 hover:-translate-y-0.5 transition-all duration-300 no-underline"
            >
              <div className="relative aspect-[4/3] bg-stone-100 dark:bg-white/5">
                <Image
                  src={p.images![0]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 45vw, 240px"
                  className="object-cover"
                />
                {personalizavel && (
                  <span className="absolute left-2 top-2 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {t.custom}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <span className="text-[11px] uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  {p.tag}
                </span>
                <span className="mt-0.5 font-bold leading-snug text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {name}
                </span>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-bold text-orange-600 dark:text-orange-400">{p.price} €</span>
                  <span className="text-xs text-stone-400 group-hover:text-orange-500 transition-colors">
                    {t.see} →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
