import type { MetadataRoute } from 'next';

/**
 * Manifest da aplicação web — deixa o site ser instalado no ecrã inicial
 * (Android/Chrome) com ícone e cores próprias, em vez do atalho genérico.
 *
 * Os ícones são gerados a partir do logótipo real do site (src/app/icon.png),
 * não do kit de identidade: o kit traz uma marca diferente (hexágono com
 * faísca, sem o nome), e trocá-la seria mudar a marca sem essa decisão ter
 * sido tomada.
 *
 * `theme_color` acompanha o --bg do tema escuro (globals.css).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SparkLab — Impressão 3D sob encomenda',
    short_name: 'SparkLab',
    description:
      'Peças personalizadas impressas em 3D em Portugal. Do ficheiro (ou da ideia) à peça entregue em casa.',
    start_url: '/',
    display: 'standalone',
    background_color: '#131110',
    theme_color: '#131110',
    lang: 'pt-PT',
    categories: ['shopping', 'business'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
