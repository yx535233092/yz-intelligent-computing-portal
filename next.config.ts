import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 启用 standalone 输出模式，用于 Docker 部署
  output: 'standalone',
  // 设置 basePath 和 assetPrefix 用于 Docker 部署

  async rewrites() {
    return [
      {
        // 【客户端请求路径】：浏览器请求 Next.js 服务器的 /api/ 路径
        source: '/backend-api2/:path*',

        // 【目标后端地址】：请求将被转发到这里
        destination:
          'https://u518772-a3ad-6cd189e9.westc.gpuhub.com:8443/backend-api2/:path*',
      },
      {
        source: '/backend-api1/:path*',
        destination:
          'https://u518772-a3ad-6cd189e9.westc.gpuhub.com:8443/backend-api1/:path*',
      },
      // 假设后端是本地测试环境
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:8080/api/:path*',
      // },
    ];
  },
  transpilePackages: ['@gradio/client'],
  // reactStrictMode: false,
  productionBrowserSourceMaps: true, // 源码映射
  images: {
    remotePatterns: [
      {
        protocol: 'http', // 您的图片链接是 http
        hostname: '192.168.10.24', // 您的本地服务器 IP 地址
        port: '5000', // 您的服务器端口号
        pathname: '/uploads/**', // 允许 /uploads/ 路径下的所有图片
      },
      // 如果您还有其他的外部域名，也可以在这里添加
    ],
    // 如果您使用的是旧版本的 Next.js (比如 < 13.4)，可能需要使用 domains 数组：
    // domains: ['192.168.10.24'],
  },
};

export default nextConfig;
