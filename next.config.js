/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
