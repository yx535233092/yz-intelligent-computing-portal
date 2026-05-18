import request from '@/lib/api/request';
import type { UploadResult } from '@/types/excel';

export const excelParseAPI = (data: FormData): Promise<UploadResult> => {
  return request({
    method: 'POST',
    // 开发环境(Dev): 使用环境变量或回退到 localhost:29000
    // 生产环境(Prod): 建议使用 Nginx 转发的相对路径 '/py-api/parse/excel'，或者通过环境变量注入完整 URL
    url: process.env.NEXT_PUBLIC_PYTHON_API_URL 
      ? `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/parse/excel`
      : '/py-api/parse/excel', 
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};
