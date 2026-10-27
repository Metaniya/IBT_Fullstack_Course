import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Only hosts listed here may be optimised. Unlisted hosts throw on purpose.
    remotePatterns: [{ protocol: "https", hostname: "cdn.addiseats.et" }],
  },
  // Static rules live here, not in the proxy, so the proxy stays fast.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/food", destination: "/menu", permanent: true }];
  },
};

export default nextConfig;