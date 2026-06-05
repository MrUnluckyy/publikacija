import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    // Booking form uploads reference images via a Server Action.
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default withNextIntl(nextConfig);
