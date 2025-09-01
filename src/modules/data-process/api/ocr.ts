import api from '@/lib/api/request';

interface OcrPicReq {
  input_path_1: string;
  input_path_2: string;
  mode: number;
}

interface GetOcrPicRes {
  file_1_base64: string; // 正面图
  file_2_base64: string; // 背面图
  [key: string]: string | number | boolean;
}

const getOcrPicAPI = (data: OcrPicReq): Promise<GetOcrPicRes> => {
  return api({
    method: 'POST',
    url: '/vietnamese_id_card_parse_get_image_only/',
    params: data,
  });
};

interface OcrFileRes {
  address_location_1: string;
  address_location_2: string;
  birth_location: string;
  sign_date: string;
  expire_date: string;
  id_number: string;
  full_name: string;
  birth_date: string;
  nation: string;
  gender: string;
  qr_data: string;
}

const ocrFileAPI = (data: OcrPicReq): Promise<OcrFileRes> => {
  return api({
    method: 'POST',
    url: '/vietnamese_id_card_parse/',
    params: data,
  });
};

export { ocrFileAPI, getOcrPicAPI };
