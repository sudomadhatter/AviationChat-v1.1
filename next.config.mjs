/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/agents/:path*',
        destination: 'http://127.0.0.1:8000/agents/:path*', // Proxy to Backend (ADK runs on 8000)
      },
    ];
  },
};

export default nextConfig;
