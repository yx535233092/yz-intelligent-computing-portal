import request from '@/lib/api/request';
import type { UploadResult } from '@/types/excel';

export const excelParseAPI = (data: FormData): Promise<UploadResult> => {
  return request({
    method: 'POST',
    url: 'http://39.175.132.230:35001/parse_xlsx/?type=3',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};
