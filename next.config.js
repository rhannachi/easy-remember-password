// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
//
// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
//   output: 'export',
//   experimental: {
//     optimizePackageImports: ['hash-wasm'],
//   },
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    optimizePackageImports: ['hash-wasm'],
  },
}
module.exports = nextConfig
