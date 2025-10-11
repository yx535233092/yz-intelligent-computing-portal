// Excel 处理相关类型定义

export interface UploadResult {
  filename?: string;
  rows?: number;
  columns?: number;
  data?: {
    json_format?: string;
    md_format?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface FileItem {
  id: string; // 唯一标识符
  file: File;
  uploadTime: Date;
  arrayBuffer?: ArrayBuffer; // 缓存文件内容
  result?: UploadResult;
  error?: string;
  isProcessing?: boolean; // 是否正在处理中
}

export interface ExcelProcessState {
  fileList: FileItem[];
  selectedFileId: string | null;
  isLoading: boolean;
  error: string | null;
}

export type ProcessStatus = 'idle' | 'processing' | 'success' | 'error';
