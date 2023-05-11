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
  },
  env: {
    TOKEN_KEY:"alsdhfkl4jas23djkfhqwqoewi241rqtqwmahsdfkjasdqwieurasdfahj4ksdgioq2weuaaa2784",
    FACEBOOK_APP_ID: "1040428757362806"
  },
}