/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'app',
  publicRuntimeConfig: {
    favicon: './public/favicon.svg'
  },
  serverRuntimeConfig: {
    images: {
      domains: ['*'],
    },
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
    CLIENT_ID_MAIL: '868706765725-ep1f8l96esatfg5irbhr4n753207qu46.apps.googleusercontent.com',
    CLIENT_SECRET_MAIL: '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',
  },
}