'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATALOGO_SECOES, formatEUR, type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLang, pName, type Lang } from '@/i18n/LanguageContext';

/**
 * Catálogo em faixas horizontais (uma por nicho) — o padrão Netflix/Amazon.
 *
 * Porquê: com 2–5 peças por nicho, uma grelha deixava linhas meio vazias e a
 * página muito alta. A faixa mantém a página curta, enche a linha, e aguenta
 * crescer sem redesenho — só passa a haver mais para arrastar.
 *
 * As setas só aparecem quando há mesmo conteúdo para lá da margem (e só com
 * rato); no telemóvel arrasta-se com o dedo.
 */

const L = {
  pt: {
    eyebrow: 'a nossa coleção',
    descText: 'Cada peça é impressa por nós, à medida, em Sangalhos.',
    want: 'Adicionar',
    customize: 'Personalizar',
    jumpLabel: 'Navegar por categoria',
    prev: 'Ver anteriores',
    next: 'Ver mais',
    draft: 'Por publicar · falta foto',
  },
  en: {
    eyebrow: 'our collection',
    descText: 'Every piece is printed by us, made to order, in Sangalhos.',
    want: 'Add',
    customize: 'Customize',
    jumpLabel: 'Browse by category',
    prev: 'See previous',
    next: 'See more',
    draft: 'Unpublished · photo missing',
  },
} as const;

type Copy = (typeof L)[keyof typeof L];

export default function Catalogo() {
  const { add } = useCart();
  const { lang } = useLang();
  const t = L[lang];

  const [active, setActive] = useState(CATALOGO_SECOES[0]?.slug ?? '');

  // Scroll-spy: marca o nicho que está a ser lido.
  useEffect(() => {
    const els = CATALOGO_SECOES.map((n) =>
      document.getElementById(`catalogo-${n.slug}`)
    ).filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visiveis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topo = visiveis[0];
        if (topo) setActive(topo.target.id.replace('catalogo-', ''));
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (CATALOGO_SECOES.length === 0) return null;

  return (
    <section className="section section--alt" id="catalogo">
      <div className="container">
        <div className="section__head section__head--row reveal">
          <div>
            <span className="eyebrow--hand" style={{ color: 'var(--olive)' }}>
              {t.eyebrow}
            </span>
            {lang === 'pt' ? (
              <h2 className="h2">
                Peças incríveis,
                <br />
                prontas para <span className="hand-underline">ti</span>.
              </h2>
            ) : (
              <h2 className="h2">
                Amazing pieces,
                <br />
                ready for <span className="hand-underline">you</span>.
              </h2>
            )}
          </div>
          <p className="section__desc">{t.descText}</p>
        </div>

        {/* Âncoras reais: funcionam sem JS e por teclado; o scroll-spy só
            acrescenta o estado visual. */}
        <nav className="nichenav" aria-label={t.jumpLabel}>
          {CATALOGO_SECOES.map((n) => (
            <a
              key={n.slug}
              href={`#catalogo-${n.slug}`}
              className="nichenav__link"
              aria-current={active === n.slug ? 'true' : undefined}
            >
              {lang === 'en' ? n.labelEn : n.label}
            </a>
          ))}
        </nav>

        {CATALOGO_SECOES.map((n) => (
          <NicheRail key={n.slug} n={n} lang={lang} add={add} t={t} />
        ))}
      </div>
    </section>
  );
}

function NicheRail({
  n,
  lang,
  add,
  t,
}: {
  n: (typeof CATALOGO_SECOES)[number];
  lang: Lang;
  add: (id: string) => void;
  t: Copy;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // As setas só existem quando há conteúdo para lá da margem. O ResizeObserver
  // reavalia quando a largura muda (rodar o telemóvel, redimensionar).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < max - 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const desliza = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: suave ? 'smooth' : 'auto',
    });
  };

  return (
    <section
      className="niche reveal"
      id={`catalogo-${n.slug}`}
      aria-labelledby={`niche-title-${n.slug}`}
    >
      <header className="niche__head">
        <div>
          <h3 className="niche__title" id={`niche-title-${n.slug}`}>
            {lang === 'en' ? n.labelEn : n.label}
          </h3>
          <p className="niche__desc">{lang === 'en' ? n.descEn : n.desc}</p>
        </div>

        <div className="niche__tools">
          <span className="niche__count">
            {String(n.products.length).padStart(2, '0')}
          </span>
          {(canPrev || canNext) && (
            <div className="rail__nav">
              <button
                type="button"
                className="rail__btn"
                onClick={() => desliza(-1)}
                disabled={!canPrev}
                aria-label={t.prev}
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                className="rail__btn"
                onClick={() => desliza(1)}
                disabled={!canNext}
                aria-label={t.next}
              >
                <Chevron dir="right" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* A faixa desvanece na margem direita enquanto houver mais para ver —
          pista visual de que se pode arrastar. */}
      <div className={`rail${canNext ? ' rail--more' : ''}`}>
        <div className="rail__track" ref={trackRef}>
          {n.products.map((p) => (
            <ProductTile key={p.id} p={p} add={add} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d={dir === 'left' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductTile({
  p,
  add,
  lang,
  t,
}: {
  p: Product;
  add: (id: string) => void;
  lang: Lang;
  t: Copy;
}) {
  const name = pName(p, lang);
  const precisaPersonalizar = Boolean(p.customizations?.length);
  // Rascunho: só chega aqui em desenvolvimento (ver CATALOGO_SECOES).
  const rascunho = Boolean(p.hidden);

  return (
    <article className={`ptile${rascunho ? ' ptile--draft' : ''}`}>
      <Link href={`/produto/${p.id}`} className="ptile__media" aria-label={name}>
        {p.images?.[0] ? (
          <Image
            src={p.images[0]}
            alt={name}
            fill
            className="ptile__img"
            sizes="(max-width: 640px) 60vw, (max-width: 1100px) 32vw, 260px"
          />
        ) : (
          <span className="ptile__icon" aria-hidden="true">
            {p.icon}
          </span>
        )}
      </Link>

      <Link href={`/produto/${p.id}`} className="ptile__name">
        {name}
      </Link>
      <span className="ptile__price">{formatEUR(p.price)}</span>

      {rascunho ? (
        <span className="ptile__draft">{t.draft}</span>
      ) : precisaPersonalizar ? (
        // Personalizável: tem de passar pela página do produto para escolher
        // nome/cor — adicionar direto criava encomendas sem personalização.
        <Link href={`/produto/${p.id}`} className="ptile__cta">
          {t.customize}
        </Link>
      ) : (
        <button type="button" className="ptile__cta" onClick={() => add(p.id)}>
          {t.want}
        </button>
      )}
    </article>
  );
}
