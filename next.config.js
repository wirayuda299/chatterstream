/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/*',
      }
    ]
  },
  env: {
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    SITE_URL: process.env.SITE_URL
  }
}

module.exports = nextConfig
