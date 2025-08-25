import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App } from 'antd';
import ClientLayout from '@/components/layout/ClientLayout';

/**
 * 元数据配置
 */
export const metadata: Metadata = {
  title: '新华三 - 智算门户',
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
        <AntdRegistry>
          <App>
            <ClientLayout>{children}</ClientLayout>
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
