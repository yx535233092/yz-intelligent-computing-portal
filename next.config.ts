import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gradio/client'],
  // reactStrictMode: false,
  productionBrowserSourceMaps: false, // 源码映射
};

export default nextConfig;
