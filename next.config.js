/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'via.placeholder.com'
    ],
    unoptimized: false
  },
  experimental: {
    optimizeCss: true
  }
}

module.exports = nextConfig