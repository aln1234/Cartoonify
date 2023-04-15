/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upcdn.io", "replicate.delivery"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
