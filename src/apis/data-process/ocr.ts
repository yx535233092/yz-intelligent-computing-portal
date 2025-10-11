import api from '@/lib/api/request';
import type {
  OcrPicReq,
  GetOcrPicRes,
  OcrFileRes,
} from '@/types/data-process/ocr';

const getOcrPicAPI = (data: OcrPicReq): Promise<GetOcrPicRes> => {
  return api({
    method: 'POST',
    url: 'http://39.175.132.230:35001/vietnamese_id_card_parse_get_image_only/',
    params: data,
  });
};

const ocrFileAPI = (data: OcrPicReq): Promise<OcrFileRes> => {
  return api({
    method: 'POST',
    url: 'http://39.175.132.230:35001/vietnamese_id_card_parse/',
    params: data,
  });
};

// 新增：上传图片文件进行OCR识别（multipart/form-data）
const ocrUploadAPI = (
  file1: File | Blob,
  file2: File | Blob
): Promise<OcrFileRes> => {
  const formData = new FormData();
  formData.append('file_1', file1);
  formData.append('file_2', file2);

  return api({
    method: 'POST',
    url: 'http://39.175.132.230:35001/vietnamese_id_card_parse_upload/',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { ocrFileAPI, getOcrPicAPI, ocrUploadAPI };
