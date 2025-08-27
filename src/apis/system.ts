import api from '@/lib/api/request';

interface LoginData {
  username: string;
  password: string;
}

interface LoginRes {
  access_token: string;
  expires_in: number;
  token_type: string;
}

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
