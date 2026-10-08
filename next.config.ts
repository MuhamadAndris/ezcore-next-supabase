import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.162.0.104'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynamic.zacdn.com",
      },
      {
        protocol: "https",
        hostname: "https://dynamic.zacdn.com",
      },
      {
        protocol: "https",
        hostname: "s1.lojelcdn.com",
      },
    ],
  },
};

export default nextConfig;