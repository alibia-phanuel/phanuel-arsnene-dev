import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Ignore ESLint pendant le build
  },
  typescript: {
    ignoreBuildErrors: false, // Garde la vérification TypeScript
  },
};

export default nextConfig;
