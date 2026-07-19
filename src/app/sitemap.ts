import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { GUIAS } from '@/data/guias';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const guiaEntries = GUIAS.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(`${g.dateModified ?? g.datePublished}T12:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    // Imagem de capa do guia no sitemap → Google Imagens indexa os artigos.
    ...(g.image ? { images: [`${SITE_URL}${g.image}`] } : {}),
  }));
  const productEntries = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/produto/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    // Imagens do produto no sitemap → Google Imagens indexa o catálogo.
    images: (p.images ?? []).map((img) => `${SITE_URL}${img}`),
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/guias`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...guiaEntries,
    {
      url: `${SITE_URL}/termos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    ...productEntries,
  ];
}
