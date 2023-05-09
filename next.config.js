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
    DATABASE_URL:"mongodb+srv://truongpham2412dev:67eObtKnz8Qyr0My@tshop.108e3fv.mongodb.net/tshop?retryWrites=true&w=majority",
    TOKEN_KEY:"alsdhfkl4jas23djkfhqwqoewi241rqtqwmahsdfkjasdqwieurasdfahj4ksdgioq2weuaaa2784",
  },
}