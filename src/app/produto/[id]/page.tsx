import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/data/products';
import { SITE_URL } from '@/data/site';
import ProductPageContent from '@/components/ProductPageContent';

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
    // Título enriquecido para pesquisa ("caneca personalizada", "impressão 3D…");
    // o template do layout acrescenta "· SparkLab" no fim.
    title: `${product.name} · Impressão 3D personalizada`,
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
    "sku": product.id,
    "image": product.images ? product.images.map((img) => `${SITE_URL}${img}`) : [],
    "description": product.desc,
    "brand": {
      "@type": "Brand",
      "name": "SparkLab"
    },
    "category": product.tag,
    "countryOfOrigin": { "@type": "Country", "name": "PT" },
    "material": product.material ?? "PLA",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.price,
      // Recomendado pelo Google para rich results de produto — evita o aviso
      // "priceValidUntil em falta" na Search Console. Rola para o fim do ano seguinte.
      "priceValidUntil": `${new Date().getFullYear() + 1}-12-31`,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": `${SITE_URL}/produto/${product.id}`,
      "seller": {
        "@type": "Organization",
        "name": "SparkLab"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "PT"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          },
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "d" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "d" }
        }
      }
    }
  };

  // Breadcrumb estruturado: ajuda o Google a mostrar o caminho nos resultados.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Catálogo", "item": `${SITE_URL}/#catalogo` },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `${SITE_URL}/produto/${product.id}` }
    ]
  };

  return (
    <main className="min-h-screen pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <ProductPageContent product={product} />
    </main>
  );
}
