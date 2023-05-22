/** @type {import('next').NextConfig} */
const nextConfig = {
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
    disableStaticImages: true,
  }
}