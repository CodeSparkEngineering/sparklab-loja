import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { PRODUCTS } from '@/data/products';

// Usa os produtos do catálogo que têm imagem.
const items: CardStackItem[] = PRODUCTS.filter((p) => p.images?.[0]).map((p) => ({
  id: p.id,
  title: p.name,
  description: p.desc,
  imageSrc: p.images![0],
  tag: p.tag,
}));

export default function ShowcasePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="mx-auto w-full max-w-5xl p-8">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span className="eyebrow eyebrow--orange">
            <span className="dot" /> Destaques
          </span>
          <h2 className="h2">Preview — CardStack</h2>
        </div>

        <CardStack
          items={items}
          initialIndex={0}
          cardWidth={440}
          cardHeight={300}
          autoAdvance
          intervalMs={2600}
          pauseOnHover
          loop
          showDots
        />
      </div>
    </main>
  );
}
