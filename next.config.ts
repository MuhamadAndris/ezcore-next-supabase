import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.137.189.104"],

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