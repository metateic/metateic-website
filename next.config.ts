import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
  },
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@metateic/ui"],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
