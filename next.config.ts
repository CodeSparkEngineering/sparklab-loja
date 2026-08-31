import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// ── Content-Security-Policy ────────────────────────────────────────────────
// As páginas são estáticas (SSG) e não usam nonce por request, por isso
// `script-src`/`style-src` incluem 'unsafe-inline' — necessário para os scripts
// inline do Next (hidratação) e do gtag/consent-mode. O resto fica trancado:
// só 'self' + os domínios que o site realmente usa (Google Analytics/Ads/Tag
// Manager e Vercel Analytics). O Stripe é redirect server-side e o WhatsApp
// são links de navegação — nenhum precisa de entradas no cliente.
// `vercel.com` + `*.blob.vercel-storage.com` em connect-src: o upload do
// ficheiro no formulário de orçamento é CLIENT-side (@vercel/blob/client) —
// o browser fala diretamente com a Vercel Blob (vercel.com/api/blob/mpu para
// o multipart e o host do store para as partes). Sem estas entradas o
// browser recusava a ligação e o upload ficava eternamente "a carregar…",
// sem erro visível para o cliente. A rota /api/upload-orcamento (só autoriza)
// é 'self' e nunca chegou a ser o problema.
// `news.google.com` (+ gstatic para os ícones) é o botão "fonte preferida"
// nos guias: precisa de script-src, img-src, connect-src E frame-src — só
// com script-src o botão desenhava-se mas o clique não abria o diálogo.
// Em dev acrescenta-se 'unsafe-eval' (React/HMR) e ws:/wss: (HMR); e omite-se
// upgrade-insecure-requests (senão o localhost http partiria).
const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://news.google.com https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.google.com https://news.google.com https://www.gstatic.com https://www.googleadservices.com https://googleads.g.doubleclick.net`,
  `font-src 'self' data:`,
  `connect-src 'self' https://vercel.com https://blob.vercel-storage.com https://*.public.blob.vercel-storage.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com https://news.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://va.vercel-scripts.com${isDev ? " ws: wss:" : ""}`,
  `frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://news.google.com`,
  `worker-src 'self' blob:`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'self'`,
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
].join("; ");

const nextConfig: NextConfig = {
  // Permite acessar o dev server pela URL de rede (não só localhost).
  // Sem isto, o Next 16 bloqueia os recursos de dev (JS/HMR) em acessos
  // cross-origin, o JS não carrega e a página fica invisível (tela preta).
  allowedDevOrigins: ["10.2.0.2"],

  // Otimização de imagens do next/image: AVIF primeiro (≈30% mais leve que
  // WebP, com fallback automático), o que ataca diretamente o LCP em todo o
  // site — catálogo, galerias e capas dos guias — sem mexer nas fontes.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Guias/blog em MDX (páginas .mdx dentro de app/guias/*).
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    // Compilador Rust de MDX (necessário com Turbopack); gfm ativa tabelas,
    // strikethrough e autolinks nos artigos.
    mdxRs: { mdxType: 'gfm' },
  },

  // Domínio canónico: redireciona o URL antigo da Vercel para o domínio
  // próprio (evita conteúdo duplicado no Google). EXCLUI /api/* — o webhook
  // da Stripe está registado no URL antigo e a Stripe não segue redirects.
  async redirects() {
    return [
      {
        source: "/:path((?!api/).*)",
        has: [{ type: "host", value: "sparklab-loja.vercel.app" }],
        destination: "https://www.sparklab3d.pt/:path",
        permanent: true,
      },
    ];
  },

  // Security headers em todas as respostas. HSTS já é enviado pela Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Restringe de onde podem vir scripts, estilos, imagens, ligações e
          // frames — mitiga XSS e injeção de código de fontes não autorizadas.
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          // Impede o browser de "adivinhar" MIME types (bloqueia sniffing).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Impede o site de ser embebido em iframes de terceiros (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Não vaza URLs completos para outros domínios.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // O site não usa câmara/microfone/geolocalização — nega por omissão.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
