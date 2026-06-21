import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, formatEUR } from '@/data/products';
import ProductGallery from '@/components/ProductGallery';
import AddToCartForm from '@/components/AddToCartForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const SITE_URL = 'https://sparklab-loja.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Produto não encontrado' };

  const img = product.images?.[0] ? `${SITE_URL}${product.images[0]}` : undefined;
  return {
    title: product.name,
    description: product.desc,
    alternates: { canonical: `/produto/${product.id}` },
    openGraph: {
      type: 'website',
      title: `${product.name} · SparkLab`,
      description: product.desc,
      url: `${SITE_URL}/produto/${product.id}`,
      ...(img ? { images: [{ url: img, alt: product.name }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.desc,
      ...(img ? { images: [img] } : {}),
    },
  };
}

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images ? product.images.map((img) => `${SITE_URL}${img}`) : [],
    "description": product.desc,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/PreOrder",
      "url": `${SITE_URL}/produto/${product.id}`
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="container max-w-6xl mx-auto px-4">
        {/* Breadcrumb / Back button */}
        <Link 
          href="/#catalogo" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Image Gallery */}
          <div>
            <ProductGallery images={product.images || []} alt={product.name} />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className={`eyebrow eyebrow--${product.tone} !mb-0`}>
                <span className={`dot dot--${product.tone}`}></span>
                {product.tag}
              </span>
            </div>
            
            <h1 className="h2 mb-4">{product.name}</h1>
            <p className="text-3xl font-medium text-stone-900 dark:text-stone-100 mb-5">
              {formatEUR(product.price)}
            </p>

            {/* Selos informativos */}
            <div className="flex flex-wrap gap-2 mb-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">🇵🇹 Feito em Portugal</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">📦 Envio CTT registado</span>
              {product.customizations && product.customizations.length > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/25 rounded-full px-3 py-1.5">🛠️ Personalizável</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">🧾 Feito por encomenda</span>
              )}
            </div>

            <div className="prose prose-lg text-stone-600 dark:text-zinc-400 mb-8">
              <p>{product.desc}</p>
            </div>

            {/* Specifications (Example/Mock) */}
            <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/10 mb-8">
              <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Especificações</h3>
              <ul className="space-y-3 text-sm text-stone-600 dark:text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600" />
                  <span className="text-stone-800 dark:text-stone-200">PLA Premium (Bambu Lab)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600" />
                  <span className="text-stone-800 dark:text-stone-200">0.16 mm - 0.20 mm</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600" />
                  <span className="text-stone-800 dark:text-stone-200">Padrão Texturizado PEI</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600" />
                  <span className="text-stone-800 dark:text-stone-200">Bambu Lab P1S</span>
                </div>
              </ul>
            </div>

            {/* Produção & entrega — honesto, sem prazos garantidos */}
            <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/10 mb-8">
              <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Produção &amp; entrega</h3>
              <ul className="space-y-3 text-sm text-stone-600 dark:text-zinc-400">
                <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> Impresso por nós, sob encomenda, na Bambu Lab P1S.</li>
                <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> Envio CTT registado para todo o Portugal, com seguimento.</li>
                <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> Envio grátis em encomendas a partir de 40€.</li>
                <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> Dúvidas? Confirmamos prazo e detalhes no WhatsApp.</li>
              </ul>
            </div>

            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
