import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Silencia el warning de webpack en Next.js 16
  turbopack: {},
  // Transpila los paquetes necesarios
  transpilePackages: ["@rainbow-me/rainbowkit", "wagmi", "viem"],
};

export default withNextIntl(nextConfig);
