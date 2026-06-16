
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
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // Handle both .md and .mdx files
  extension: /\.(md|mdx)$/,
})

const withNextIntl = createNextIntlPlugin('./i18n.ts')

// Chain: next-intl → MDX → Next.js config
export default withNextIntl(withMDX(nextConfig));
