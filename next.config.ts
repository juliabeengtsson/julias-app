import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'julia.a.capacedev.se',
        port: '',
        pathname: '/wp-content/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
