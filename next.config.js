/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
 experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
}

module.exports = nextConfig
