
import type { NextConfig } from "next";
import { env } from "process";
import createMDX from '@next/mdx'

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

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
