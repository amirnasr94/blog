import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  // partialPrefetching:true,
  turbopack: {
    root: join(__dirname, "."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
