import api from '@/lib/api/request';

interface TranslateAPI {
  from: string;
  to: string;
  chinese_text: string;
}

interface TranslateRes {
  out_text: string;
}

const translateAPI = (data: TranslateAPI): Promise<TranslateRes> => {
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

export { translateAPI };
