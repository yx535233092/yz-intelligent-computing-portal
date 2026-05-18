'use client';

import { useRef, useState } from 'react';
import type { FileItem } from '@/types/excel';
import { 
  PlusOutlined, 
  FileExcelOutlined, 
  LoadingOutlined, 
  CheckCircleTwoTone, 
  CloseCircleTwoTone,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Input, Empty } from 'antd';

interface ExcelUploadProps {
  fileList: FileItem[];
  selectedFileId: string | null;
  isLoading: boolean;
  onFileAdd: (file: File) => void;
  onFileSelect: (fileId: string) => void;
  onFileDelete?: (fileId: string) => void;
}

export default function ExcelUpload({
  fileList,
  selectedFileId,
  isLoading,
  onFileAdd,
  onFileSelect,
  onFileDelete
}: ExcelUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTime] = useState('');

  // 格式化时间
  const formatTime = (date: Date) => {
    // 如果是今天，只显示时间
    if (date.toDateString() === new Date().toDateString()) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  };

  const filteredList = fileList.filter(f => f.file.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* 顶部操作区 */}
      <div className="px-3 py-3 space-y-3 border-b border-gray-200/60 flex-shrink-0">
        <Button 
          type="primary" 
          block 
          icon={<PlusOutlined />} 
          loading={isLoading}
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-500 border-none shadow-sm h-9 font-medium"
        >
          上传 Excel
        </Button>
        <Input 
          prefix={<SearchOutlined className="text-gray-400" />} 
          placeholder="搜索文件..." 
          className="bg-white border-gray-200 text-sm"
          variant="filled"
          value={searchTerm}
          onChange={e => setSearchTime(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFileAdd(e.target.files[0])}
        />
      </div>

      {/* 列表区 */}
      <div className="flex-1 overflow-y-auto min-h-0 py-2">
        {fileList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 px-4">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无文件" />
            <p className="text-xs text-center mt-2">支持拖拽上传</p>
          </div>
        ) : (
          <ul className="px-2 space-y-0.5">
            {filteredList.map((file) => {
              const isSelected = selectedFileId === file.id;
              return (
                <li
                  key={file.id}
                  onClick={() => onFileSelect(file.id)}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'hover:bg-gray-100 text-gray-600'
                    }
                  `}
                >
                  {/* 状态图标 */}
                  <div className="flex-shrink-0 flex items-center justify-center w-5">
                    {file.isProcessing ? (
                      <LoadingOutlined className="text-blue-500" />
                    ) : file.result ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : file.error ? (
                      <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                    ) : (
                      <FileExcelOutlined className={`text-lg ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
                    )}
                  </div>

                  {/* 文件信息 */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="truncate text-sm leading-tight">{file.file.name}</span>
                    <div className="flex items-center gap-2 mt-0.5 opacity-60 text-[10px]">
                      <span>{formatTime(file.uploadTime)}</span>
                      <span>•</span>
                      <span>{(file.file.size / 1024).toFixed(0)}KB</span>
                    </div>
                  </div>

                  {/* 删除按钮 (Hover) */}
                  {onFileDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileDelete(file.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                    >
                      <DeleteOutlined className="text-xs" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}