'use client';

/**
 * Conteúdo visível da página de produto (bilíngue PT/EN).
 * A page.tsx (Server Component) mantém a metadata e o JSON-LD em PT;
 * aqui troca-se o texto conforme o idioma escolhido no toggle.
 */

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { formatEUR, type Product } from '@/data/products';
import ProductGallery from '@/components/ProductGallery';
import AddToCartForm from '@/components/AddToCartForm';
import { useLang, pName, pDesc, tagLabel } from '@/i18n/LanguageContext';

const L = {
  pt: {
    back: 'Voltar ao Catálogo',
    madeIn: '🇵🇹 Feito em Portugal',
    shipping: '📦 Envio CTT registado',
    wholesale: '🏷️ 10+ un. = −15% (atacado)',
    customizable: '🛠️ Personalizável',
    madeToOrder: '🧾 Feito por encomenda',
    specs: 'Especificações',
    specItems: ['PLA Premium (Bambu Lab)', '0.16 mm - 0.20 mm', 'Padrão Texturizado PEI', 'Bambu Lab P1S'],
    production: 'Produção & entrega',
    prodItems: [
      'Impresso por nós, sob encomenda, nas nossas Bambu Lab P1S.',
      'Embalagem segura e envio via CTT registado para todo o Portugal, com seguimento.',
      'Envio grátis em encomendas a partir de 40€.',
    ],
    wholesaleLine: <><strong>−15% automático</strong> em 10 ou mais unidades da mesma peça (aplicado no carrinho).</>,
    doubts: 'Dúvidas? Confirmamos prazo e detalhes no WhatsApp.',
  },
  en: {
    back: 'Back to Catalog',
    madeIn: '🇵🇹 Made in Portugal',
    shipping: '📦 Registered CTT shipping',
    wholesale: '🏷️ 10+ units = −15% (wholesale)',
    customizable: '🛠️ Customizable',
    madeToOrder: '🧾 Made to order',
    specs: 'Specifications',
    specItems: ['Premium PLA (Bambu Lab)', '0.16 mm - 0.20 mm', 'Textured PEI finish', 'Bambu Lab P1S'],
    production: 'Production & delivery',
    prodItems: [
      'Printed by us, made to order, on our Bambu Lab P1S printers.',
      'Secure packaging and registered CTT shipping anywhere in Portugal, with tracking.',
      'Free shipping on orders over €40.',
    ],
    wholesaleLine: <><strong>Automatic −15%</strong> on 10 or more units of the same piece (applied in the cart).</>,
    doubts: 'Questions? We confirm timelines and details on WhatsApp.',
  },
} as const;

export default function ProductPageContent({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = L[lang];

  return (
    <div className="container max-w-6xl mx-auto px-4">
      {/* Breadcrumb / Back button */}
      <Link
        href="/#catalogo"
        className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Image Gallery */}
        <div>
          <ProductGallery images={product.images || []} alt={pName(product, lang)} />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className={`eyebrow eyebrow--${product.tone} !mb-0`}>
              <span className={`dot dot--${product.tone}`}></span>
              {tagLabel(product.tag, lang)}
            </span>
          </div>

          <h1 className="h2 mb-4">{pName(product, lang)}</h1>
          <p className="text-3xl font-medium text-stone-900 dark:text-stone-100 mb-5">
            {formatEUR(product.price)}
          </p>

          {/* Selos informativos */}
          <div className="flex flex-wrap gap-2 mb-7">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">{t.madeIn}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">{t.shipping}</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 rounded-full px-3 py-1.5">{t.wholesale}</span>
            {product.customizations && product.customizations.length > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/25 rounded-full px-3 py-1.5">{t.customizable}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5">{t.madeToOrder}</span>
            )}
          </div>

          <div className="prose prose-lg text-stone-600 dark:text-zinc-400 mb-8">
            <p>{pDesc(product, lang)}</p>
          </div>

          {/* Specifications */}
          <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/10 mb-8">
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">{t.specs}</h3>
            <ul className="space-y-3 text-sm text-stone-600 dark:text-zinc-400">
              {t.specItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-600" />
                  <span className="text-stone-800 dark:text-stone-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Produção & entrega — honesto, sem prazos garantidos */}
          <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/10 mb-8">
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">{t.production}</h3>
            <ul className="space-y-3 text-sm text-stone-600 dark:text-zinc-400">
              {t.prodItems.map((item) => (
                <li key={item} className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> {item}</li>
              ))}
              <li className="flex gap-2.5"><span className="text-amber-500 mt-0.5">•</span> <span>{t.wholesaleLine}</span></li>
              <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> {t.doubts}</li>
            </ul>
          </div>

          <AddToCartForm product={product} />
        </div>
      </div>
    </div>
  );
}
