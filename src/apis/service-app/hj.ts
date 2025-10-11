import request from '@/lib/api/request';
import type { LoginRequest } from '@/types/service-app/hj';

export const getHjAccessTokenAPI = (
  data: LoginRequest
): Promise<{
  accessToken: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/getAccessToken',
    data,
  });
};
