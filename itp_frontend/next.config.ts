import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Força o Next.js a resolver pacotes a partir da pasta atual
  serverExternalPackages: ["tailwindcss", "postcss", "autoprefixer"],
  
  // Se estiver usando Turbopack, tentamos isolar a raiz
  experimental: {
    // No Next 15/16, isso ajuda a evitar que ele suba para o diretório pai
    externalDir: false,
  },
  
  // Garante que o output não tente buscar arquivos fora do build
  output: 'standalone',
};

export default nextConfig;