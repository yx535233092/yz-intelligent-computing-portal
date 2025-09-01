import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gradio/client'],
  // reactStrictMode: false,
};

export default nextConfig;
