// Imports the NextConfig type to ensure the configuration object has the correct shape.
import type {NextConfig} from 'next';

// Defines the configuration object for Next.js.
const nextConfig: NextConfig = {
  /* Next.js configuration options go here */
  
  // Next.js image optimization settings (`next/image`).
  images: {
    // Defines a list of allowed domains for loading external images.
    // This is a security measure to prevent loading images from untrusted sources.
    remotePatterns: [
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
