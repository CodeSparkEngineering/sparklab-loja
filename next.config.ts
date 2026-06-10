import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acessar o dev server pela URL de rede (não só localhost).
  // Sem isto, o Next 16 bloqueia os recursos de dev (JS/HMR) em acessos
  // cross-origin, o JS não carrega e a página fica invisível (tela preta).
  allowedDevOrigins: ["10.2.0.2"],
};

export default nextConfig;
