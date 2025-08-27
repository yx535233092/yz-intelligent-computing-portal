import api from '@/lib/api/request';

export const loginAPI = (data: LoginData): Promise<LoginRes> => {
  return api({
    method: 'POST',
    url: '/v1/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });
};
