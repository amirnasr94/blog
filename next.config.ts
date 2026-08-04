import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {
    root: join(__dirname, "."),
  },
};

export default nextConfig;
