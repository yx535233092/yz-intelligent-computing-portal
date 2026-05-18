'use client';

import { useState, useEffect, useRef } from 'react';
import type { UploadResult } from '@/types/excel';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-light.css'; 
import { 
  CopyOutlined, 
  DownloadOutlined, 
  CheckOutlined,
  FileTextOutlined,
  CodeOutlined,
  LoadingOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { message, Tooltip, Segmented, Empty } from 'antd';

// 注册语言
hljs.registerLanguage('json', json);

interface ExcelResultProps {
  result?: UploadResult;
  error?: string | null;
  isProcessing: boolean;
  fileName: string | null;
}

export default function ExcelResult({
  result,
  error,
  isProcessing,
  fileName,
}: ExcelResultProps) {
  const [activeTab, setActiveTab] = useState<'md' | 'json'>('md');
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const isDataObject = result?.data && !Array.isArray(result.data);
  const dataObj = isDataObject
    ? (result!.data as { json_format?: string; md_format?: string; [key: string]: unknown })
    : null;
  const content = activeTab === 'md' ? dataObj?.md_format : dataObj?.json_format;

  useEffect(() => {
    if (activeTab === 'json' && codeRef.current && content) {
      codeRef.current.removeAttribute('data-highlighted');
      hljs.highlightElement(codeRef.current);
    }
  }, [content, activeTab]);

  // 1. 处理中
  if (isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-blue-600">
        <LoadingOutlined className="text-4xl mb-4" />
        <p className="text-sm font-medium">正在智能解析...</p>
        <p className="text-xs text-gray-400 mt-1">{fileName}</p>
      </div>
    );
  }

  // 2. 错误
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white text-red-500">
        <WarningOutlined className="text-4xl mb-4" />
        <p className="text-sm font-medium">解析失败</p>
        <p className="text-xs text-gray-400 mt-1 max-w-xs text-center">{error}</p>
      </div>
    );
  }

  // 3. 空状态
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50/50">
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE} 
          description={<span className="text-gray-400">暂无解析结果</span>} 
        />
      </div>
    );
  }

  // 操作逻辑
  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    message.success('已复制到剪贴板');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName?.replace(/\.[^/.]+$/, "") || 'result'}.${activeTab}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* 工具栏 */}
      <div className="h-12 border-b border-gray-100 flex items-center justify-between px-4 bg-white z-10 shrink-0">
        <Segmented 
          value={activeTab} 
          onChange={(v) => setActiveTab(v as 'md' | 'json')}
          options={[
            { value: 'md', icon: <FileTextOutlined />, label: 'Markdown' },
            { value: 'json', icon: <CodeOutlined />, label: 'JSON' }
          ]}
          size="small"
        />
        
        <div className="flex gap-2">
          <Tooltip title="复制">
            <button 
              onClick={handleCopy}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
            >
              {copied ? <CheckOutlined className="text-green-500" /> : <CopyOutlined />}
            </button>
          </Tooltip>
          <Tooltip title="下载">
            <button 
              onClick={handleDownload}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <DownloadOutlined />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-auto scroll-smooth custom-scrollbar">
          {activeTab === 'md' ? (
            <div className="p-6 prose prose-slate max-w-none prose-table:border prose-th:bg-gray-50 prose-th:text-gray-700 prose-td:text-gray-600">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({...props}) => <table className="border-collapse border border-gray-200 w-full text-sm my-4 rounded-lg overflow-hidden" {...props} />,
                  thead: ({...props}) => <thead className="bg-gray-50 border-b border-gray-200" {...props} />,
                  th: ({...props}) => <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0" {...props} />,
                  td: ({...props}) => <td className="px-4 py-2 whitespace-nowrap text-sm border-r border-gray-100 last:border-r-0 border-b border-gray-100 last:border-b-0" {...props} />,
                  tr: ({...props}) => <tr className="hover:bg-blue-50/30 transition-colors" {...props} />,
                }}
              >
                {content || '*暂无内容*'}
              </ReactMarkdown>
            </div>
          ) : (
            <pre className="p-4 text-sm font-mono text-gray-800 whitespace-pre-wrap leading-relaxed min-h-full">
              <code ref={codeRef} className="language-json">
                {content || '{}'}
              </code>
            </pre>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        pre code.hljs { display: block; overflow-x: auto; padding: 1em; background: transparent; }
      `}</style>
    </div>
  );
}