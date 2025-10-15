import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App } from 'antd';
import RouterSetter from '@/components/common/RouterSetter';

/**
 * 元数据配置
 */
export const metadata: Metadata = {
  title: process.env.NODE_ENV === 'production' ? '智算专业门户' : '开发环境',
};

/**
 * 视口配置
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover',
};

/**
 * 根布局
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh"
      className="tc-new-price"
      suppressContentEditableWarning={true}
    >
      <head>
        <meta
          name="viewport"
          content={`${viewport.width}; initial-scale=${viewport.initialScale}`}
        />
      </head>

      <body>
        <RouterSetter />
        <AntdRegistry>
          <App>{children}</App>
        </AntdRegistry>
      </body>
    </html>
  );
}
