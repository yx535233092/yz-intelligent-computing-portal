'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import ExcelUpload from '@/components/features/excel/ExcelUpload';
import ExcelPreview from '@/components/features/excel/ExcelPreview';
import ExcelResult from '@/components/features/excel/ExcelResult';
import type { FileItem, UploadResult, ExcelProcessState } from '@/types/excel';
import { excelParseAPI } from '@/apis/service-data/excelParse';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  AppstoreOutlined,
  FileExcelOutlined,
  CodeOutlined,
  RocketOutlined,
  CloudUploadOutlined,
  ArrowRightOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Tooltip, Segmented, Button, message, theme } from 'antd';

type ViewMode = 'split' | 'preview' | 'result';

export default function ExcelProcessPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const { token } = theme.useToken();
  const isInitialized = useRef(false);
  
  // UI 状态
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('preview'); 

  // 数据状态
  const [state, setState] = useState<ExcelProcessState>({
    fileList: [],
    selectedFileId: null,
    isLoading: false,
    error: null,
  });

  const selectedFile = useMemo(() => 
    state.fileList.find((f) => f.id === state.selectedFileId) || null
  , [state.fileList, state.selectedFileId]);

  // 加载默认示例文件
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const loadDefaultFile = async () => {
      let defaultFilePath = '';
      if (title?.includes('复杂表头')) {
        defaultFilePath = '/documents/excel/【内部核算】先天云服务器云平台项目配置清单20250512_20250514.xlsx';
      } else if (title?.includes('多区域')) {
        defaultFilePath = '/documents/excel/（冷板）液冷系统配置组合规格表.xlsx';
      }

      if (defaultFilePath) {
        try {
          setState(prev => ({ ...prev, isLoading: true }));
          const res = await fetch(defaultFilePath);
          if (!res.ok) throw new Error('Failed');
          const blob = await res.blob();
          const file = new File([blob], defaultFilePath.split('/').pop() || 'sample.xlsx');
          handleFileAdd(file);
        } catch (e) {
          console.warn('默认文件加载失败');
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };
    loadDefaultFile();
  }, [title]);

  const handleFileAdd = useCallback(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const newFile: FileItem = {
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      uploadTime: new Date(),
      arrayBuffer,
    };
    
    setState(prev => {
      const isDuplicate = prev.fileList.some(f => f.file.name === file.name && f.file.size === file.size);
      if (isDuplicate) {
        return {
          ...prev,
          isLoading: false,
          selectedFileId: prev.fileList.find(f => f.file.name === file.name && f.file.size === file.size)?.id || prev.selectedFileId
        };
      }
      
      return {
        ...prev,
        fileList: [newFile, ...prev.fileList],
        selectedFileId: newFile.id,
        isLoading: false
      };
    });
    
    setViewMode('preview');
    if (!isSidebarOpen) setIsSidebarOpen(true);
  }, [isSidebarOpen]);

  const handleFileDelete = (id: string) => {
    setState(prev => {
      const newList = prev.fileList.filter(f => f.id !== id);
      return {
        ...prev,
        fileList: newList,
        selectedFileId: prev.selectedFileId === id ? (newList[0]?.id || null) : prev.selectedFileId
      };
    });
  };

  const handleParse = async () => {
    if (!selectedFile) return;
    setViewMode('split');
    
    setState(prev => ({
      ...prev,
      fileList: prev.fileList.map(f => f.id === selectedFile.id ? { ...f, isProcessing: true, error: undefined } : f)
    }));

    try {
      const formData = new FormData();
      formData.append('file', selectedFile.file);
      if (title?.includes('复杂表头') || searchParams.get('type') === '2') {
        formData.append('header_rows', '2');
      }

      const result = await excelParseAPI(formData);

      setState(prev => ({
        ...prev,
        fileList: prev.fileList.map(f => f.id === selectedFile.id ? { ...f, isProcessing: false, result } : f)
      }));
      message.success('解析完成');
    } catch (e) {
      console.error(e);
      setState(prev => ({
        ...prev,
        fileList: prev.fileList.map(f => f.id === selectedFile.id ? { ...f, isProcessing: false, error: '服务不可用' } : f)
      }));
      message.error('解析失败');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white font-sans text-slate-700 overflow-hidden">
      {/* 1. Global Header (极简) */}
      <header className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-white z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">
            <FileExcelOutlined />
          </div>
          <span className="font-bold text-gray-700">{title || 'Excel 智能解析'}</span>
        </div>
      </header>

      {/* 2. Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`
            relative z-20 flex-shrink-0 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
          `}
        >
          <div className="w-[280px] h-full flex flex-col">
            <div className="flex justify-between items-center px-4 h-12 border-b border-gray-200/50 bg-gray-50">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Explorer</span>
              <Button type="text" size="small" icon={<MenuFoldOutlined />} onClick={() => setIsSidebarOpen(false)} className="text-gray-400" />
            </div>
            <div className="flex-1 min-h-0">
              <ExcelUpload
                fileList={state.fileList}
                selectedFileId={state.selectedFileId}
                isLoading={state.isLoading}
                onFileAdd={handleFileAdd}
                onFileSelect={(id) => setState(p => ({ ...p, selectedFileId: id }))}
                onFileDelete={handleFileDelete}
              />
            </div>
          </div>
        </div>

        {/* Workspace Stage */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative">
          {/* Workspace Toolbar (上下文相关) */}
          <div className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <Tooltip title="展开侧边栏">
                  <Button icon={<MenuUnfoldOutlined />} onClick={() => setIsSidebarOpen(true)} type="text" />
                </Tooltip>
              )}
              {selectedFile ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">当前文件:</span>
                  <span className="font-medium text-gray-800 max-w-[300px] truncate">{selectedFile.file.name}</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm">未选择文件</span>
              )}
            </div>

            {selectedFile && (
              <div className="flex items-center gap-4">
                <Segmented<ViewMode>
                  options={[
                    { value: 'preview', icon: <FileExcelOutlined />, label: '预览' },
                    { value: 'split', icon: <AppstoreOutlined />, label: '对比' },
                    { value: 'result', icon: <CodeOutlined />, label: '结果' },
                  ]}
                  value={viewMode}
                  onChange={setViewMode}
                  size="small"
                />
                <div className="h-4 w-px bg-gray-200"></div>
                <Button 
                  type="primary"
                  size="small"
                  icon={selectedFile.isProcessing ? <LoadingOutlined /> : <RocketOutlined />}
                  onClick={handleParse}
                  loading={selectedFile.isProcessing}
                  className="bg-blue-600 px-4"
                >
                  {selectedFile.result ? '重新解析' : '开始解析'}
                </Button>
              </div>
            )}
          </div>

          {/* Canvas Content */}
          <div className="flex-1 relative overflow-hidden bg-gray-50/30">
            {!selectedFile ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <CloudUploadOutlined style={{ fontSize: 64, opacity: 0.2 }} />
                <p className="mt-4 text-gray-500 font-medium">准备就绪</p>
                <p className="text-sm">请从左侧上传或选择文件</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex">
                {/* 左：预览区 */}
                {(viewMode === 'split' || viewMode === 'preview') && (
                  <div className={`
                    h-full transition-all duration-300 ease-in-out border-r border-gray-200 bg-white min-w-0 overflow-hidden
                    ${viewMode === 'preview' ? 'flex-1' : 'flex-[1.2]'}
                  `}>
                    <ExcelPreview 
                      fileArrayBuffer={selectedFile.arrayBuffer || null} 
                      fileName={selectedFile.file.name} 
                    />
                  </div>
                )}

                {/* 右：结果区 */}
                {(viewMode === 'split' || viewMode === 'result') && (
                  <div className={`
                    h-full transition-all duration-300 ease-in-out bg-white flex flex-col min-w-0 overflow-hidden
                    ${viewMode === 'result' ? 'flex-1' : 'flex-1'}
                  `}>
                    <ExcelResult 
                      result={selectedFile.result} 
                      error={selectedFile.error} 
                      isProcessing={selectedFile.isProcessing || false} 
                      fileName={selectedFile.file.name} 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}