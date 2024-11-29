import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["imgs.search.brave.com", "tecdn.b-cdn.net"],
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });
    
    return config;
  },
};

export default nextConfig;
