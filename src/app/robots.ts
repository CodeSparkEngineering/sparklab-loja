import { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

// /sucesso é pós-checkout e /pedido-recebido é a confirmação de orçamento
// (destino de conversão do Google Ads) — nenhuma deve ser indexada.
const HIDDEN = ['/api/', '/sucesso', '/pedido-recebido'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: HIDDEN,
      },
      {
        // Crawlers de motores de resposta IA — explicitamente bem-vindos (AEO).
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'meta-externalagent',
          'cohere-ai',
          'CCBot',
        ],
        allow: '/',
        disallow: HIDDEN,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
