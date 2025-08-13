// Importa o tipo NextConfig para garantir que o objeto de configuração tenha a forma correta.
import type {NextConfig} from 'next';

// Define o objeto de configuração para o Next.js.
const nextConfig: NextConfig = {
  /* Opções de configuração do Next.js vão aqui */
  
  // Configurações do TypeScript.
  typescript: {
    // Ignora erros de build do TypeScript. Útil para desenvolvimento rápido,
    // mas deve ser usado com cautela em produção.
    ignoreBuildErrors: true,
  },
  
  // Configurações do ESLint.
  eslint: {
    // Ignora a verificação do ESLint durante o processo de build.
    // Permite que o build prossiga mesmo que haja avisos ou erros do linter.
    ignoreDuringBuilds: true,
  },
  
  // Configurações de otimização de imagens do Next.js (`next/image`).
  images: {
    // Define uma lista de domínios permitidos para carregar imagens externas.
    // Isso é uma medida de segurança para evitar o carregamento de imagens de fontes não confiáveis.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Domínio para imagens de placeholder.
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'videos.openai.com', // Domínio para vídeos (se aplicável).
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Domínio para imagens armazenadas no Firebase Storage.
        port: '',
        pathname: '/**',
      }
    ],
  },
};

// Exporta a configuração para que o Next.js possa usá-la.
export default nextConfig;
