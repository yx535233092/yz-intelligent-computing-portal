import request from '@/lib/api/request';

export const chemicalParseAPI = (
  data: FormData
): Promise<{
  SMILES: string;
  mode_used: string;
  original_filename: string;
  status: string;
  uploaded_file_url: string;
}> => {
  return request({
    method: 'POST',
    url: 'http://192.168.10.24:5000/predict_smiles',
    data,
    headers: {
      'Content-Type': 'multipart/form-data', // 添加正确的 Content-Type
    },
  });
};
