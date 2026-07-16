
import type { NextConfig } from "next";
import { env } from "process";
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  allowedDevOrigins: [(env.REPLIT_DOMAINS || "").split(",")[0]],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/reports', destination: '/publications', permanent: true },
      { source: '/reports/:id', destination: '/publications/:id', permanent: true },
      { source: '/:locale(en|fr)/reports', destination: '/:locale/publications', permanent: true },
      { source: '/:locale(en|fr)/reports/:id', destination: '/:locale/publications/:id', permanent: true },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // Handle both .md and .mdx files
  extension: /\.(md|mdx)$/,
})

const withNextIntl = createNextIntlPlugin('./i18n.ts')

// Chain: next-intl → MDX → Next.js config
export default withNextIntl(withMDX(nextConfig));
