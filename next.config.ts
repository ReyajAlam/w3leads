import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ─── Performance ─── */
  poweredByHeader: false,
  compress: true,

  /* ─── Images ─── */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wpthrust.in',
      },
      {
        protocol: 'https',
        hostname: '*.wpthrust.in',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  /* ─── Security & Caching Headers ─── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css|woff2|woff|ttf|ico|svg|png|jpg|jpeg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /* ─── Redirects ─── */
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
