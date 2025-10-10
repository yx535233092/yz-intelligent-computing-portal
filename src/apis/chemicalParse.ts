import request from '@/lib/api/request';
import type { ChemicalParseRes } from '@/types/chemical';

export const chemicalParseAPI = (data: FormData): Promise<ChemicalParseRes> => {
  return request({
    method: 'POST',
    url: 'http://192.168.10.24:5000/predict_smiles',
    data,
    headers: {
      'Content-Type': 'multipart/form-data', // 添加正确的 Content-Type
    },
  });
};
