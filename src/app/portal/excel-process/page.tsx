'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useCallback, useEffect, Suspense } from 'react';
import { getToken } from '@/lib/utils/cookies';
import ExcelUpload from '@/components/features/excel/ExcelUpload';
import ExcelPreview from '@/components/features/excel/ExcelPreview';
import ExcelResult from '@/components/features/excel/ExcelResult';
import {
  FileItem,
  UploadResult,
  ExcelProcessState,
} from '@/components/features/excel/types';

function ExcelProcessContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  // 主状态管理
  const [state, setState] = useState<ExcelProcessState>({
    fileList: [],
    selectedFileId: null,
    isLoading: false,
    error: null,
  });

  // 获取当前选中的文件
  const selectedFile =
    state.fileList.find((file) => file.id === state.selectedFileId) || null;

  // 加载默认文件
  useEffect(() => {
    const loadDefaultFile = async () => {
      let defaultFilePath = '';

      if (title === '多区域表格解析') {
        defaultFilePath = '/多区域表格.xlsx';
      } else if (title === '复杂表头解析(合并场景)') {
        defaultFilePath = '/表格合并.xlsx';
      }

      if (defaultFilePath) {
        try {
          setState((prev) => ({ ...prev, isLoading: true, error: null }));

          const response = await fetch(defaultFilePath);
          if (response.ok) {
            const blob = await response.blob();
            const filename = defaultFilePath.split('/').pop() || 'default.xlsx';
            const file = new File([blob], filename, {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const arrayBuffer = await file.arrayBuffer();
            const fileId = `default-${Date.now()}`;

            const newFileItem: FileItem = {
              id: fileId,
              file,
              uploadTime: new Date(),
              arrayBuffer,
            };

            setState((prev) => ({
              ...prev,
              fileList: [newFileItem],
              selectedFileId: fileId,
              isLoading: false,
            }));
          }
        } catch (error) {
          console.warn('加载默认文件失败:', error);
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: '加载默认文件失败',
          }));
        }
      }
    };

    loadDefaultFile();
  }, [title]);

  // 添加文件
  const handleFileAdd = useCallback(async (file: File) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const arrayBuffer = await file.arrayBuffer();
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const newFileItem: FileItem = {
        id: fileId,
        file,
        uploadTime: new Date(),
        arrayBuffer,
      };

      setState((prev) => ({
        ...prev,
        fileList: [...prev.fileList, newFileItem],
        selectedFileId: fileId,
        isLoading: false,
      }));
    } catch (error) {
      console.error('文件读取失败:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: '文件读取失败',
      }));
    }
  }, []);

  // 选择文件
  const handleFileSelect = useCallback((fileId: string) => {
    setState((prev) => ({
      ...prev,
      selectedFileId: fileId,
      error: null,
    }));
  }, []);

  // 解析表格
  const handleParseTable = useCallback(async () => {
    if (!selectedFile) {
      setState((prev) => ({ ...prev, error: '请先选择一个文件' }));
      return;
    }

    try {
      // 更新文件状态为处理中
      setState((prev) => ({
        ...prev,
        fileList: prev.fileList.map((file) =>
          file.id === selectedFile.id
            ? { ...file, isProcessing: true, error: undefined }
            : file
        ),
        error: null,
      }));

      const formData = new FormData();
      formData.append('file', selectedFile.file);

      const response = await fetch(
        `http://39.175.132.230:35001/parse_xlsx/?type=3`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: UploadResult = await response.json();

      // 更新文件处理结果
      setState((prev) => ({
        ...prev,
        fileList: prev.fileList.map((file) =>
          file.id === selectedFile.id
            ? { ...file, result, isProcessing: false, error: undefined }
            : file
        ),
      }));

      console.log('表格解析成功:', result);
    } catch (error) {
      console.error('表格解析失败:', error);
      const errorMessage =
        error instanceof Error ? error.message : '表格解析失败';

      // 更新文件错误状态
      setState((prev) => ({
        ...prev,
        fileList: prev.fileList.map((file) =>
          file.id === selectedFile.id
            ? { ...file, isProcessing: false, error: errorMessage }
            : file
        ),
        error: errorMessage,
      }));
    }
  }, [selectedFile]);

  return (
    <div>
      <div className="flex items-center justify-between py-2 border-b-1 border-gray-200">
        <span className="text-lg font-semibold text-gray-800 px-8">
          {title}
        </span>
      </div>
      <div className="flex h-[calc(100vh-117px)]">
        <div className="w-[380px] flex-shrink-0 h-full">
          <div className="flex flex-col h-full p-4">
            <div className="flex-1 flex flex-col">
              <h1 className="text-lg font-semibold mb-2">我的文件</h1>
              <ExcelUpload
                fileList={state.fileList}
                selectedFileId={state.selectedFileId}
                isLoading={state.isLoading}
                onFileAdd={handleFileAdd}
                onFileSelect={handleFileSelect}
                onParseTable={handleParseTable}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 overflow-hidden p-4 h-full">
          <div className="h-full flex flex-col">
            <h1 className="text-lg font-semibold mb-2">预览文件</h1>
            <div className="flex-1 min-h-0">
              <ExcelPreview
                fileArrayBuffer={selectedFile?.arrayBuffer || null}
                fileName={selectedFile?.file.name || null}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 h-full">
          <div className="h-full flex flex-col">
            <h1 className="text-lg font-semibold mb-2">处理结果</h1>
            <div className="flex-1 min-h-0">
              <ExcelResult
                result={selectedFile?.result}
                error={selectedFile?.error || state.error}
                isProcessing={selectedFile?.isProcessing || false}
                fileName={selectedFile?.file.name || null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExcelProcess() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ExcelProcessContent />
    </Suspense>
  );
}
