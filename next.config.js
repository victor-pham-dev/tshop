/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'app',
  publicRuntimeConfig: {
    favicon: './public/favicon.svg'
  },
  images: {
    unoptimized :true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  reactStrictMode: true
}

module.exports = nextConfig

module.exports = {
  images: {
    // Tắt cảnh báo khi sử dụng thẻ img bằng cách sử dụng next/image
    disableStaticImages: true,
  },
  env: {
    // be_url: 'https://minamvp.click',https://103.179.191.52/
    be_url: 'http://localhost:8888',
  },
}