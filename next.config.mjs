/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: process.env.ALLOWED_ORIGINS.split(","),
}

export default nextConfig
