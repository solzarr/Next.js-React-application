// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  compress: isProd,
  images: {
    remotePatterns: [
      { hostname: 'cadalzolc.s3.ap-southeast-1.amazonaws.com' },
      { hostname: 'img.youtube.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  modularizeImports: {
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  webpack(config, { isServer }) {
    if (isProd && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
