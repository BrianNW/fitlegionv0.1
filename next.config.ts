import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v2.exercisedb.io",
        pathname: "/image/**",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/api/bodyParts", destination: "http://localhost:5000/bodyParts" },
    ];
  },
};

export default nextConfig;
