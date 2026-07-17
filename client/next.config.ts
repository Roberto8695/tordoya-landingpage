import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ultrasonidodiagnosticotordoya.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    qualities: [75, 100],
  },
  output: 'standalone',
};

export default nextConfig;