import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/login", destination: "/", permanent: false },
      { source: "/order/new", destination: "/#kontak", permanent: false },
      { source: "/orders", destination: "/#kontak", permanent: false },
    ];
  },
};

export default nextConfig;
