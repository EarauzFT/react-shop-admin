/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // eslint: { //solo si fuese necesario forzar el build
  //   ignoreDuringBuilds: true,
  // },
}

module.exports = nextConfig
