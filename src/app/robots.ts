import { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sucesso'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'PerplexityBot', 'Applebot-extended'],
        allow: '/',
        disallow: ['/api/', '/sucesso'],
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
