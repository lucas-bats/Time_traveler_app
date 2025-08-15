// Imports the NextConfig type to ensure the configuration object has the correct shape.
import type {NextConfig} from 'next';

// Defines the configuration object for Next.js.
const nextConfig: NextConfig = {
  /* Next.js configuration options go here */
  
  // TypeScript settings.
  typescript: {
    // Ignores TypeScript build errors. Useful for rapid development,
    // but should be used with caution in production.
    ignoreBuildErrors: true,
  },
  
  // ESLint settings.
  eslint: {
    // Ignores ESLint checks during the build process.
    // Allows the build to proceed even if there are linter warnings or errors.
    ignoreDuringBuilds: true,
  },
  
  // Next.js image optimization settings (`next/image`).
  images: {
    // Defines a list of allowed domains for loading external images.
    // This is a security measure to prevent loading images from untrusted sources.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Domain for placeholder images.
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'videos.openai.com', // Domain for videos (if applicable).
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Domain for images stored in Firebase Storage.
        port: '',
        pathname: '/**',
      }
    ],
  },
};

// Exports the configuration so Next.js can use it.
export default nextConfig;
