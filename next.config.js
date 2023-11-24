/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  modularizeImports: {
    './src/components': {
      transform: './src/components/{{member}}',
      skipDefaultConversion: true,
    },
  },
}
module.exports = nextConfig
