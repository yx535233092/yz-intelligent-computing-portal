'use client';

import { useEffect, useRef, useState } from 'react';
import { JsExcelPreview } from '@js-preview/excel';

interface ExcelPreviewProps {
  fileArrayBuffer: ArrayBuffer | null;
  fileName: string | null;
}

export default function ExcelPreview({
  fileArrayBuffer,
  fileName,
}: ExcelPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewerRef = useRef<JsExcelPreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initPreview = async () => {
      if (!fileArrayBuffer || !containerRef.current) {
        return;
      }

      try {
        setIsLoading(true);

        // 清理之前的预览器
        if (previewerRef.current) {
          try {
            previewerRef.current.destroy();
          } catch (e) {
            console.warn('清理预览器时出错:', e);
          }
          previewerRef.current = null;
        }

        // 清空容器内容
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // 创建新的预览器实例
        const { default: jsPreview } = await import('@js-preview/excel');
        const instance = jsPreview.init(containerRef.current);

        // 预览文件
        await instance.preview(fileArrayBuffer);
        previewerRef.current = instance;

        console.log('Excel预览加载成功:', fileName);
      } catch (error) {
        console.error('Excel预览失败:', error);

        // 显示错误信息
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full">
              <div class="text-center text-gray-500">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-lg font-medium">预览失败</p>
                <p class="text-sm mt-1">请检查文件格式是否正确</p>
              </div>
            </div>
          `;
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (fileArrayBuffer) {
      initPreview();
    } else {
      // 没有文件时显示空状态
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full">
            <div class="text-center text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-lg font-medium">暂无文件</p>
              <p class="text-sm mt-1">请先上传Excel文件</p>
            </div>
          </div>
        `;
      }
      setIsLoading(false);
    }

    // 清理函数
    return () => {
      if (previewerRef.current) {
        try {
          previewerRef.current.destroy();
        } catch (e) {
          console.warn('组件卸载时清理预览器失败:', e);
        }
        previewerRef.current = null;
      }
    };
  }, [fileArrayBuffer, fileName]);

  return (
    <div className="relative w-full h-[calc(100vh-200px)]">
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-blue-600 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-gray-600">加载预览中...</span>
          </div>
        </div>
      )}

      {/* 文件名显示 */}
      {fileName && !isLoading && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm z-10">
          {fileName}
        </div>
      )}

      {/* 预览容器 */}
      <div
        ref={containerRef}
        className="w-full h-full border border-gray-200 rounded-md overflow-hidden bg-white"
        id="excel-preview-container"
      />
    </div>
  );
}
