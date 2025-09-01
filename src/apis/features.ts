import api from '@/utils/request';

interface TranslateAPI {
  from: string;
  to: string;
  chinese_text: string;
}

interface TranslateRes {
  out_text: string;
}

export const translateAPI = (data: TranslateAPI): Promise<TranslateRes> => {
  return api({
    method: 'POST',
    url: '/chinese_to_vietnamese/',
    params: {
      chinese_text: data.chinese_text,
    },
    data: {
      from: data.from,
      to: data.to,
    },
  });
};

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

export const getOcrPicAPI = (data: OcrPicReq): Promise<GetOcrPicRes> => {
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

export const ocrFileAPI = (data: OcrPicReq): Promise<OcrFileRes> => {
  return api({
    method: 'POST',
    url: '/vietnamese_id_card_parse/',
    params: data,
  });
};
