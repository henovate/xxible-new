import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["unsplash.com", "images.unsplash.com"], // add both just in case
  },
};

module.exports = withPWA({
  ...nextConfig,
  reactStrictMode: true,
});
