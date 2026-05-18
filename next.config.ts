import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 忽略构建时的 ESLint 错误，防止部署失败
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 启用 standalone 输出模式，用于 Docker 部署
  output: 'standalone',
  // 设置 basePath 和 assetPrefix 用于 Docker 部署

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
