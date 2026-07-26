'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { PRODUCTS, formatEUR } from '@/data/products';
import { useLang, pName, pDesc, tagLabel } from '@/i18n/LanguageContext';

// Produtos em destaque ("Os mais pedidos") — seleção manual (só os produtos
// novos). Editar esta lista para mudar o que aparece no card-stack.
const DESTAQUE_IDS = [
  'suporte-comando-neon',
  'trofeu-quimono',
  'porta-latas-ratinha-rosa',
  'porta-chaves-tecla-fidget',
  'chaveiro-mini-caneca',
];
const FEATURED = PRODUCTS.filter((p) => p.images?.[0] && DESTAQUE_IDS.includes(p.id));

const L = {
  pt: {
    eyebrow: 'destaques',
    title: 'Os mais pedidos.',
    desc: 'Arrasta as cartas, usa as setas ou toca para explorar as nossas peças mais populares.',
    cta: 'Ver peça',
    prev: 'Peça anterior',
    next: 'Peça seguinte',
  },
  en: {
    eyebrow: 'featured',
    title: 'Customer favorites.',
    desc: 'Drag the cards, use the arrows or tap to explore our most popular pieces.',
    cta: 'View piece',
    prev: 'Previous piece',
    next: 'Next piece',
  },
} as const;

export default function Destaques() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(440);
  const { lang } = useLang();
  const t = L[lang];

  const items = useMemo<CardStackItem[]>(
    () =>
      FEATURED.map((p) => ({
        id: p.id,
        title: pName(p, lang),
        description: pDesc(p, lang),
        imageSrc: p.images![0],
        tag: tagLabel(p.tag, lang),
        href: `/produto/${p.id}`,
        price: formatEUR(p.price),
        ctaLabel: t.cta,
      })),
    [lang, t.cta]
  );

  // Largura do card adaptada à largura disponível (responsivo no mobile).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth || 440;
      setCardWidth(Math.round(Math.max(260, Math.min(460, w * 0.82))));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardHeight = Math.round(cardWidth * 0.66);

  if (items.length === 0) return null;

  return (
    <section className="section" id="destaques">
      <div className="container">
        <div
          className="section__head reveal"
          style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto' }}
        >
          <span className="eyebrow--hand" style={{ color: 'var(--orange)' }}>{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="section__desc" style={{ marginInline: 'auto' }}>
            {t.desc}
          </p>
        </div>

        <div ref={wrapRef}>
          <CardStack
            items={items}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            /* Leque contido: 5 cartas, arco suave — as laterais espreitam
               limpas em vez de se espalharem rodadas pelo ecrã. */
            maxVisible={5}
            spreadDeg={16}
            overlap={0.68}
            depthPx={90}
            tiltXDeg={6}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            loop
            showDots
            prevLabel={t.prev}
            nextLabel={t.next}
          />
        </div>
      </div>
    </section>
  );
}
