/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', 'localhost:3000', '', '13geekstore.vercel.app', 'files.stripe.com'],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
