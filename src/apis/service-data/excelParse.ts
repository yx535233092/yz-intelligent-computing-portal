import request from '@/lib/api/request';
import type { UploadResult } from '@/types/excel';

export const excelParseAPI = (data: FormData): Promise<UploadResult> => {
  return request({
    method: 'POST',
    url: 'https://u518772-a3ad-6cd189e9.westc.gpuhub.com:8443/backend-api1/parse_xlsx/?type=3',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};
