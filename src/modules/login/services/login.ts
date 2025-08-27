import { loginAPI } from '../api/login';
import { setToken } from '@/utils/token';

export const login = async (data: LoginData) => {
  const res = await loginAPI(data);
  setToken(res.access_token);
  return res;
};
