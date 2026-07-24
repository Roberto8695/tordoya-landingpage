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
  },
  output: 'standalone',
};

export default nextConfig;