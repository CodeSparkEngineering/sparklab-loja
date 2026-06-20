import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';

const SITE_URL = 'https://sparklab-loja.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/produto/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
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
