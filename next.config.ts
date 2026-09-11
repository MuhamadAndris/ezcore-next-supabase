import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.8'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynamic.zacdn.com",
      },
      {
        protocol: "https",
        hostname: "static-id.zacdn.com",
      },
    ],
  },
};

export default nextConfig;