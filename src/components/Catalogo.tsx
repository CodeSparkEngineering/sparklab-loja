'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, PRODUCT_TAGS, formatEUR } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLang, pName, pDesc, tagLabel, type Lang } from '@/i18n/LanguageContext';

const L = {
  pt: {
    eyebrow: 'a nossa coleção',
    prev: 'Ver anteriores',
    next: 'Ver mais',
    want: 'Eu quero!',
    customize: 'Personalizar',
    descText: 'Descobre os nossos designs mais adorados. Escolhe as tuas cores favoritas ou desafia-nos a criar algo totalmente à tua medida.',
  },
  en: {
    eyebrow: 'our collection',
    prev: 'See previous',
    next: 'See more',
    want: 'I want it!',
    customize: 'Customize',
    descText: 'Discover our most loved designs. Pick your favorite colors or challenge us to create something entirely your own.',
  },
} as const;

export default function Catalogo() {
  const [activeTag, setActiveTag] = useState('Todos');
  const { add } = useCart();
  const { lang } = useLang();
  const t = L[lang];

  const filtered =
    activeTag === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.tag === activeTag);

  return (
    <section className="section section--alt" id="catalogo">
      <div className="container">
        <div className="section__head section__head--row reveal">
          <div>
            <span className="eyebrow--hand" style={{ color: 'var(--olive)' }}>{t.eyebrow}</span>
            {lang === 'pt' ? (
              <h2 className="h2">Peças incríveis,<br />prontas para <span className="hand-underline">ti</span>.</h2>
            ) : (
              <h2 className="h2">Amazing pieces,<br />ready for <span className="hand-underline">you</span>.</h2>
            )}
          </div>
          <p className="section__desc">
            {t.descText}
          </p>
        </div>

        <div className="cat-filters reveal">
          {PRODUCT_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`cat-pill ${activeTag === tag ? 'cat-pill--active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tagLabel(tag, lang)}
            </button>
          ))}
        </div>

        {activeTag === 'Todos' ? (
          <div className="flex flex-col gap-10 md:gap-16 mt-6 md:mt-8">
            {PRODUCT_TAGS.filter((t2) => t2 !== 'Todos').map((tag) => {
              const groupProducts = PRODUCTS.filter((p) => p.tag === tag);
              if (groupProducts.length === 0) return null;

              return (
                <div key={tag} className="reveal">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-stone-800">{tagLabel(tag, lang)}</h3>
                    <div className="h-[1px] flex-1 bg-stone-200" />
                  </div>
                  <CarouselRow prevLabel={t.prev} nextLabel={t.next}>
                    {groupProducts.map((p) => (
                      <ProductCard key={p.id} p={p} add={add} lang={lang} want={t.want} customize={t.customize} />
                    ))}
                  </CarouselRow>
                </div>
              );
            })}
          </div>
        ) : (
          <CarouselRow className="mt-8" prevLabel={t.prev} nextLabel={t.next}>
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} add={add} lang={lang} want={t.want} customize={t.customize} />
            ))}
          </CarouselRow>
        )}
      </div>
    </section>
  );
}

function CarouselRow({
  children,
  className = '',
  prevLabel,
  nextLabel,
}: {
  children: React.ReactNode;
  className?: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={`cat-row ${className}`}>
      <button
        type="button"
        className="cat-row__nav cat-row__nav--prev"
        aria-label={prevLabel}
        onClick={() => scrollByDir(-1)}
      >
        ‹
      </button>
      <div className="cat-grid" ref={ref}>
        {children}
      </div>
      <button
        type="button"
        className="cat-row__nav cat-row__nav--next"
        aria-label={nextLabel}
        onClick={() => scrollByDir(1)}
      >
        ›
      </button>
    </div>
  );
}

function ProductCard({
  p,
  add,
  lang,
  want,
  customize,
}: {
  p: typeof PRODUCTS[0];
  add: (id: string) => void;
  lang: Lang;
  want: string;
  customize: string;
}) {
  const name = pName(p, lang);
  return (
    <article className="cat-card group">
      <Link href={`/produto/${p.id}`} className="block">
        <div className={`cat-card__media cat-card__media--${p.tone}`}>
          {p.images?.[0] ? (
            <Image
              src={p.images[0]}
              alt={name}
              fill
              className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] bg-black/40"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <span className="cat-card__icon">{p.icon}</span>
          )}
          <span className="cat-card__tag z-10">{tagLabel(p.tag, lang)}</span>
        </div>
      </Link>

      <div className="cat-card__body">
        <Link href={`/produto/${p.id}`} className="hover:text-orange-500 transition-colors">
          <h3 className="cat-card__name">{name}</h3>
        </Link>
        <p className="cat-card__desc">{pDesc(p, lang)}</p>

        <div className="cat-card__foot">
          <span className="cat-card__price">{formatEUR(p.price)}</span>
          {p.customizations && p.customizations.length > 0 ? (
            // Produto personalizável: leva à página do produto para escolher
            // nome/cor — adicionar direto criava encomendas sem personalização.
            <Link href={`/produto/${p.id}`} className="btn btn--sm btn--primary">
              {customize}
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={() => add(p.id)}
            >
              {want}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
