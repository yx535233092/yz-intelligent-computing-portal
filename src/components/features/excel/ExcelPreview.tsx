'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { JsExcelPreview } from '@js-preview/excel';
import { Button, Modal, Tooltip, Spin, Empty } from 'antd';
import { 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  FileExcelOutlined,
  ReloadOutlined
} from '@ant-design/icons';

interface ExcelPreviewProps {
  fileArrayBuffer: ArrayBuffer | null;
  fileName: string | null;
}

// 核心渲染器组件
const ExcelRenderer = ({ 
  fileArrayBuffer, 
  onLoadStart, 
  onLoadEnd 
}: { 
  fileArrayBuffer: ArrayBuffer;
  onLoadStart?: () => void;
  onLoadEnd?: (success: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewerRef = useRef<JsExcelPreview | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const initPreview = useCallback(async () => {
    if (!containerRef.current || !fileArrayBuffer) return;

    try {
      onLoadStart?.();
      
      // 清理旧实例
      if (previewerRef.current) {
        try {
          previewerRef.current.destroy();
        } catch (e) {
          console.warn('Failed to destroy previous previewer instance:', e);
        }
        previewerRef.current = null;
      }
      containerRef.current.innerHTML = '';

      // 动态导入并初始化
      const { default: jsPreview } = await import('@js-preview/excel');
      const instance = jsPreview.init(containerRef.current);
      
      await instance.preview(fileArrayBuffer);
      previewerRef.current = instance;
      
      onLoadEnd?.(true);
    } catch (e) {
      console.error('Preview init failed', e);
      onLoadEnd?.(false);
    }
  }, [fileArrayBuffer]);

  useEffect(() => {
    initPreview();

    // 监听容器大小变化，重新渲染以适应布局
    // 使用防抖，防止在布局动画过程中频繁重绘
    let resizeTimer: NodeJS.Timeout;
    
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          console.log('Container resized, refreshing preview...');
          initPreview();
        }, 300); // 300ms 延迟，匹配 CSS transition duration
      });
      resizeObserverRef.current.observe(containerRef.current);
    }

    return () => {
      clearTimeout(resizeTimer);
      try {
        previewerRef.current?.destroy();
      } catch (e) {
        console.warn('Failed to destroy previewer instance:', e);
      }
      resizeObserverRef.current?.disconnect();
    };
  }, [initPreview]);

  return <div ref={containerRef} className="w-full h-full bg-white" />;
};

export default function ExcelPreview({ fileArrayBuffer, fileName }: ExcelPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  // 使用 key 强制重新挂载渲染器（例如在全屏切换时）
  const [renderKey, setRenderKey] = useState(0);

  const handleReload = () => {
    setRenderKey(k => k + 1);
  };

  if (!fileArrayBuffer) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-gray-400">
        <Empty
          image={<FileExcelOutlined style={{ fontSize: 64, color: '#e5e7eb' }} />}
          description="暂无预览文件"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group bg-white">
      {/* 渲染器 */}
      {!hasError ? (
        <ExcelRenderer 
          key={renderKey}
          fileArrayBuffer={fileArrayBuffer} 
          onLoadStart={() => {
            setIsLoading(true);
            setHasError(false);
          }}
          onLoadEnd={(success) => {
            setIsLoading(false);
            setHasError(!success);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <p className="text-gray-500 mb-2">预览加载失败</p>
          <Button icon={<ReloadOutlined />} onClick={handleReload}>重试</Button>
        </div>
      )}

      {/* Loading 遮罩 */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
          <Spin size="large" />
          <span className="mt-4 text-gray-500 font-medium">加载预览中...</span>
        </div>
      )}

      {/* 悬浮工具栏 */}
      {!isLoading && !hasError && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <Tooltip title="刷新">
            <Button
              icon={<ReloadOutlined />}
              shape="circle"
              size="small"
              onClick={handleReload}
              className="bg-white/90 backdrop-blur shadow-sm border-gray-200 text-gray-500"
            />
          </Tooltip>
          <Tooltip title="全屏查看">
            <Button
              icon={<FullscreenOutlined />}
              shape="circle"
              size="small"
              onClick={() => setIsFullscreen(true)}
              className="bg-white/90 backdrop-blur shadow-sm border-gray-200 text-gray-500"
            />
          </Tooltip>
        </div>
      )}

      {/* 全屏 Modal */}
      <Modal
        open={isFullscreen}
        footer={null}
        onCancel={() => setIsFullscreen(false)}
        width="100vw"
        styles={{ 
          content: { height: '100vh', padding: 0, borderRadius: 0, background: '#f8fafc' },
          body: { height: '100%', display: 'flex', flexDirection: 'column' }
        }}
        closeIcon={null} // 自定义关闭按钮
        destroyOnHidden
      >
        <div className="flex-shrink-0 h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2">
            <FileExcelOutlined className="text-green-600 text-xl" />
            <span className="font-bold text-gray-700">{fileName}</span>
          </div>
          <Button 
            type="text" 
            icon={<FullscreenExitOutlined />} 
            onClick={() => setIsFullscreen(false)}
            className="text-gray-500 hover:text-red-500 hover:bg-red-50"
          >
            退出全屏
          </Button>
        </div>
        <div className="flex-1 overflow-hidden p-6">
          <div className="w-full h-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <ExcelRenderer 
              fileArrayBuffer={fileArrayBuffer} 
              // 全屏时不显示 Loading 遮罩，因为通常很快
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
