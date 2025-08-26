import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { getToken } from '@/utils/token';
import Cookies from 'js-cookie';

// 请求地址(后端地址)
const BASE_URL = 'http://39.175.132.230:35001/';

// 2.创建实例
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3.请求拦截
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4.响应拦截
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // 清除token
    Cookies.remove('token');
    return Promise.reject(error);
  }
);

// 5.导出
export default api;
