const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  output: 'export',
  modularizeImports: {
    './src/components': {
      transform: './src/components/{{member}}',
      skipDefaultConversion: true,
    },
  },
})

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'export',
//   experimental: {
//     optimizePackageImports: ['hash-wasm'],
//   },
// }
// module.exports = nextConfig
