import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*", // Proxy requests to Node.js backend
      },
    ];
  },
  pageExtensions: ["tsx", "ts"], // ✅ Ensures Next.js recognizes TypeScript pages in /pages
};

export default nextConfig;