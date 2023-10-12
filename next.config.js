/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', 'localhost:3000', '', '13geekstore.vercel.app', 'files.stripe.com', 'onedrive.live.com', '1drv.ms', 'phx02pap002files.storage.live.com', 'api.onedrive.com', 'photos.onedrive.com'],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
