import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acessar o dev server pela URL de rede (não só localhost).
  // Sem isto, o Next 16 bloqueia os recursos de dev (JS/HMR) em acessos
  // cross-origin, o JS não carrega e a página fica invisível (tela preta).
  allowedDevOrigins: ["10.2.0.2"],

  // Security headers em todas as respostas. HSTS já é enviado pela Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
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

export default nextConfig;
