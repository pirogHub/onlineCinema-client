/** @type {import('next').NextConfig} */


const nextConfig = {
  // reactStrictMode: true,
  // api: {
  //   bodyParser: false
  // },
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost:4200/api/:path*',
        destination: `${process.env.REACT_APP_SERVER_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        // destination: 'http://localhost:4200/uploads/:path*',
        destination: `${process.env.REACT_APP_SERVER_URL}/uploads/:path*`,
      },

    ]
  },
  webpack: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  images: {
    domains: ["localhost:4200"],
  },
  output: 'standalone',
}

module.exports = nextConfig
