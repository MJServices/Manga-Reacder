import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
      {
        protocol: "https",
        hostname: "tecdn.b-cdn.net",
      },
    ],
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
