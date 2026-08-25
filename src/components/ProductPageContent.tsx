'use client';

/**
 * Conteúdo visível da página de produto (bilíngue PT/EN).
 * A page.tsx (Server Component) mantém a metadata e o JSON-LD em PT;
 * aqui troca-se o texto conforme o idioma escolhido no toggle.
 *
 * Ordem da coluna de compra: categoria → nome → preço → COMPRAR → selos →
 * descrição → detalhes recolhidos. O botão vinha depois de duas caixas
 * grandes de texto, o que no computador o empurrava para fora do ecrã (no
 * telemóvel havia a barra fixa a salvar, no computador não havia nada).
 */

import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { formatEUR, type Product } from '@/data/products';
import ProductGallery from '@/components/ProductGallery';
import AddToCartForm from '@/components/AddToCartForm';
import { useLang, pName, pDesc, tagLabel } from '@/i18n/LanguageContext';

const L = {
  pt: {
    back: 'Voltar ao Catálogo',
    madeIn: 'Feito em Portugal',
    shipping: 'Envio CTT registado',
    wholesale: '10+ un. = −15%',
    customizable: 'Personalizável',
    madeToOrder: 'Feito por encomenda',
    specs: 'Especificações',
    specLabels: {
      material: 'Material',
      layer: 'Altura de camada',
      finish: 'Acabamento',
      printer: 'Impressora',
    },
    layerValue: '0,16 – 0,20 mm',
    finishValue: 'Base texturizada PEI',
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
    madeIn: 'Made in Portugal',
    shipping: 'Registered CTT shipping',
    wholesale: '10+ units = −15%',
    customizable: 'Customizable',
    madeToOrder: 'Made to order',
    specs: 'Specifications',
    specLabels: {
      material: 'Material',
      layer: 'Layer height',
      finish: 'Finish',
      printer: 'Printer',
    },
    layerValue: '0.16 – 0.20 mm',
    finishValue: 'Textured PEI plate',
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

const BADGE =
  'inline-flex items-center text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-full px-3 py-1.5';

export default function ProductPageContent({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = L[lang];

  // O material vem da peça — os dados já o guardam (e o JSON-LD já o usava),
  // só a página é que dizia "PLA" a toda a gente.
  const specRows: Array<[string, string]> = [
    [t.specLabels.material, product.material ?? 'PLA'],
    [t.specLabels.layer, t.layerValue],
    [t.specLabels.finish, t.finishValue],
    [t.specLabels.printer, 'Bambu Lab P1S'],
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4">
      {/* Breadcrumb / Back button */}
      <Link
        href="/#catalogo"
        className="inline-flex items-center gap-2 py-2.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Coluna esquerda: galeria */}
        <div>
          <ProductGallery images={product.images || []} alt={pName(product, lang)} />
        </div>

        {/* Coluna direita: comprar primeiro, ler depois */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className={`eyebrow eyebrow--${product.tone} !mb-0`}>
              <span className={`dot dot--${product.tone}`}></span>
              {tagLabel(product.tag, lang)}
            </span>
          </div>

          <h1 className="h2 mb-4">{pName(product, lang)}</h1>
          <p className="text-3xl font-medium text-stone-900 dark:text-stone-100 mb-6">
            {formatEUR(product.price)}
          </p>

          {/* Personalização + quantidade + comprar, logo a seguir ao preço. */}
          <AddToCartForm product={product} />

          {/* Selos: por baixo da compra para não a empurrarem para baixo. */}
          <div className="flex flex-wrap gap-2 mt-8 mb-7">
            <span className={BADGE}>{t.madeIn}</span>
            <span className={BADGE}>{t.shipping}</span>
            <span className="inline-flex items-center text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 rounded-full px-3 py-1.5">
              {t.wholesale}
            </span>
            {product.customizations && product.customizations.length > 0 ? (
              <span className="inline-flex items-center text-xs font-medium text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/25 rounded-full px-3 py-1.5">
                {t.customizable}
              </span>
            ) : (
              <span className={BADGE}>{t.madeToOrder}</span>
            )}
          </div>

          <div className="prose prose-lg text-stone-600 dark:text-zinc-400 mb-8">
            <p>{pDesc(product, lang)}</p>
          </div>

          {/* Detalhes recolhidos: quem quer o pormenor abre; quem já decidiu
              não tem de percorrer duas caixas de texto. */}
          <details className="group bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 mb-4">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
              <h2 className="text-lg font-medium text-stone-900 dark:text-stone-100">{t.specs}</h2>
              <ChevronDown className="w-5 h-5 shrink-0 text-stone-500 transition-transform group-open:rotate-180" />
            </summary>
            <dl className="px-6 pb-6 text-sm">
              {specRows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2.5 border-t border-stone-200 dark:border-white/10"
                >
                  <dt className="w-40 shrink-0 text-stone-500 dark:text-zinc-400">{k}</dt>
                  <dd className="m-0 text-stone-800 dark:text-stone-200">{v}</dd>
                </div>
              ))}
            </dl>
          </details>

          <details className="group bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 mb-8">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none p-6 [&::-webkit-details-marker]:hidden">
              <h2 className="text-lg font-medium text-stone-900 dark:text-stone-100">{t.production}</h2>
              <ChevronDown className="w-5 h-5 shrink-0 text-stone-500 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="px-6 pb-6 space-y-3 text-sm text-stone-600 dark:text-zinc-400">
              {t.prodItems.map((item) => (
                <li key={item} className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> {item}</li>
              ))}
              <li className="flex gap-2.5"><span className="text-amber-500 mt-0.5">•</span> <span>{t.wholesaleLine}</span></li>
              <li className="flex gap-2.5"><span className="text-orange-500 mt-0.5">•</span> {t.doubts}</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
