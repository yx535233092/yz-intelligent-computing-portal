'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import ExcelUpload from '@/components/features/excel/ExcelUpload';
import ExcelPreview from '@/components/features/excel/ExcelPreview';
import ExcelResult from '@/components/features/excel/ExcelResult';
import type { FileItem, ExcelProcessState } from '@/types/excel';
import { excelParseAPI } from '@/apis/service-data/excelParse';
import { 
  AppstoreOutlined,
  FileExcelOutlined,
  CodeOutlined,
  RocketOutlined,
  CloudUploadOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Segmented, Button, message, Tooltip, Card } from 'antd';
import { useSearchParams } from 'next/navigation';

type ViewMode = 'split' | 'preview' | 'result';

export default function ExcelProcess() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const isInitialized = useRef(false);
  
  // UI 状态
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

    const defaultFiles = [
      {
        path: '/documents/excel/【内部核算】先天云服务器云平台项目配置清单20250512_20250514.xlsx',
        isMatch: title?.includes('复杂表头')
      },
      {
        path: '/documents/excel/（冷板）液冷系统配置组合规格表.xlsx',
        isMatch: title?.includes('多区域')
      }
    ];

    const loadFiles = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      
      for (const item of defaultFiles) {
        try {
          const res = await fetch(item.path);
          if (!res.ok) continue;
          const blob = await res.blob();
          const fileName = item.path.split('/').pop() || 'sample.xlsx';
          const file = new File([blob], fileName);
          
          const arrayBuffer = await file.arrayBuffer();
          const newFile: FileItem = {
            id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            file,
            uploadTime: new Date(),
            arrayBuffer,
          };

          setState(prev => ({
            ...prev,
            fileList: [...prev.fileList, newFile],
            // 如果匹配当前 title，或者列表本来为空，则选中该文件
            selectedFileId: item.isMatch || !prev.selectedFileId ? newFile.id : prev.selectedFileId
          }));
        } catch (e) {
          console.warn(`Default file ${item.path} load failed`, e);
        }
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
    };

    loadFiles();
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
  }, []);

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
      if (title?.includes('复杂表头') || searchParams.get('headerMode') === '2') {
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
    <div className="w-full flex gap-8 h-full overflow-hidden">
      {/* 左侧：文件列表 */}
      <div className="w-[280px] min-w-[280px] h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
          <ExcelUpload
            fileList={state.fileList}
            selectedFileId={state.selectedFileId}
            isLoading={state.isLoading}
            onFileAdd={handleFileAdd}
            onFileSelect={(id) => setState(p => ({ ...p, selectedFileId: id }))}
            onFileDelete={handleFileDelete}
          />
      </div>

      {/* 右侧：工作区 */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 工具栏 */}
        <div className="h-14 border-b border-gray-100 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
             {selectedFile ? (
                <>
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <FileExcelOutlined />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 max-w-[300px] truncate text-sm">{selectedFile.file.name}</span>
                    <span className="text-xs text-gray-400">{(selectedFile.file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </>
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
                size="middle"
              />
              <div className="h-4 w-px bg-gray-200"></div>
              <Button 
                type="primary"
                icon={selectedFile.isProcessing ? <LoadingOutlined /> : <RocketOutlined />}
                onClick={handleParse}
                loading={selectedFile.isProcessing}
                className="bg-blue-600 shadow-sm"
              >
                {selectedFile.result ? '重新解析' : '开始解析'}
              </Button>
            </div>
          )}
        </div>

        {/* 主内容区 */}
        <div className="flex-1 relative overflow-hidden bg-gray-50/30">
          {!selectedFile ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <CloudUploadOutlined style={{ fontSize: 64, opacity: 0.2 }} />
              <p className="mt-4 text-gray-500 font-medium">准备就绪</p>
              <p className="text-sm">请从左侧上传或选择 Excel 文件</p>
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
      </div>
    </div>
  );
}
