/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: 'http://127.0.0.1:8080/chat', // Proxy to our Flask Backend
      },
    ];
  },
};
export default nextConfig;
