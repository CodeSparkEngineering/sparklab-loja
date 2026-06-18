import { notFound } from 'next/navigation';
import { getProductById, formatEUR } from '@/data/products';
import ProductGallery from '@/components/ProductGallery';
import AddToCartForm from '@/components/AddToCartForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Breadcrumb / Back button */}
        <Link 
          href="/#catalogo" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
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
            <p className="text-3xl font-medium text-white mb-5">
              {formatEUR(product.price)}
            </p>

            {/* Selos informativos */}
            <div className="flex flex-wrap gap-2 mb-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">🇵🇹 Feito em Portugal</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">📦 Envio CTT registado</span>
              {product.customizations && product.customizations.length > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-300 bg-orange-500/10 border border-orange-500/25 rounded-full px-3 py-1.5">🛠️ Personalizável</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">🧾 Feito por encomenda</span>
              )}
            </div>

            <div className="prose prose-invert prose-lg text-zinc-400 mb-8">
              <p>{product.desc}</p>
            </div>

            {/* Specifications (Example/Mock) */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Especificações</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex justify-between">
                  <span>Material Base</span>
                  <span className="text-white">PLA Premium (Bambu Lab)</span>
                </li>
                <li className="flex justify-between">
                  <span>Resolução de Camada</span>
                  <span className="text-white">0.16 mm - 0.20 mm</span>
                </li>
                <li className="flex justify-between">
                  <span>Acabamento</span>
                  <span className="text-white">Padrão Texturizado PEI</span>
                </li>
                <li className="flex justify-between">
                  <span>Impressora</span>
                  <span className="text-white">Bambu Lab P1S</span>
                </li>
              </ul>
            </div>

            {/* Produção & entrega — honesto, sem prazos garantidos */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Produção &amp; entrega</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
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
