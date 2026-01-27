import api from '@/lib/api/request';
import type {
  TranslateRequest,
  TranslateRes,
} from '@/types/data-process/translate';

const translateAPI = (data: TranslateRequest): Promise<TranslateRes> => {
  return api({
    method: 'POST',
    url: '/backend-api1/chinese_to_vietnamese/',
    params: {
      chinese_text: data.chinese_text,
    },
    data: {
      from: data.from,
      to: data.to,
    },
  });
};

export { translateAPI };
