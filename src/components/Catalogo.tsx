'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, PRODUCT_TAGS, formatEUR } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function Catalogo() {
  const [activeTag, setActiveTag] = useState('Todos');
  const { add } = useCart();

  const filtered =
    activeTag === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.tag === activeTag);

  return (
    <section className="section section--alt" id="catalogo">
      <div className="container">
        <div className="section__head section__head--row reveal">
          <div>
            <span className="eyebrow eyebrow--olive"><span className="dot dot--olive"></span> A nossa coleção</span>
            <h2 className="h2">Peças incríveis,<br />prontas para ti.</h2>
          </div>
          <p className="section__desc">
            Descobre os nossos designs mais adorados. Escolhe as tuas
            cores favoritas ou desafia-nos a criar algo totalmente à tua medida.
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
              {tag}
            </button>
          ))}
        </div>

        {activeTag === 'Todos' ? (
          <div className="flex flex-col gap-10 md:gap-16 mt-6 md:mt-8">
            {PRODUCT_TAGS.filter((t) => t !== 'Todos').map((tag) => {
              const groupProducts = PRODUCTS.filter((p) => p.tag === tag);
              if (groupProducts.length === 0) return null;

              return (
                <div key={tag} className="reveal">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white/90">{tag}</h3>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  <div className="cat-grid">
                    {groupProducts.map((p) => (
                      <ProductCard key={p.id} p={p} add={add} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cat-grid mt-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} add={add} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ p, add }: { p: typeof PRODUCTS[0]; add: (id: string) => void }) {
  return (
    <article className="cat-card group">
      <Link href={`/produto/${p.id}`} className="block">
        <div className={`cat-card__media cat-card__media--${p.tone}`}>
          {p.images?.[0] ? (
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] bg-black/40"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <span className="cat-card__icon">{p.icon}</span>
          )}
          <span className="cat-card__tag z-10">{p.tag}</span>
        </div>
      </Link>

      <div className="cat-card__body">
        <Link href={`/produto/${p.id}`} className="hover:text-orange-500 transition-colors">
          <h3 className="cat-card__name">{p.name}</h3>
        </Link>
        <p className="cat-card__desc">{p.desc}</p>

        <div className="cat-card__foot">
          <span className="cat-card__price">{formatEUR(p.price)}</span>
          <button
            type="button"
            className="btn btn--sm btn--primary"
            onClick={() => add(p.id)}
          >
            Eu quero!
          </button>
        </div>
      </div>
    </article>
  );
}
