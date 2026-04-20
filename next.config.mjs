/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg|jfif|JPG)$/i,
        type: "asset/resource",
      });
    }
    return config;
  },
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "www.corporatejetinvestor.com" },
      { protocol: "https", hostname: "nbaa.org" },
    ],
  },
};

export default nextConfig;
