import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acessar o dev server pela URL de rede (não só localhost).
  // Sem isto, o Next 16 bloqueia os recursos de dev (JS/HMR) em acessos
  // cross-origin, o JS não carrega e a página fica invisível (tela preta).
  allowedDevOrigins: ["10.2.0.2"],

  // Inclui os arquivos STL privados no bundle da função de download, para que
  // o /api/download consiga lê-los em produção (Vercel). Eles ficam FORA de
  // /public, então nunca são servidos diretamente — só pela API após pagamento.
  outputFileTracingIncludes: {
    "/api/download": ["./private-stl/**/*"],
  },
};

export default nextConfig;
