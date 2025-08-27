import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { getToken, removeToken } from '@/lib/utils/cookies';

// 请求地址(后端地址)
const BASE_URL = 'http://39.175.132.230:35001/';

// 2.创建实例
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
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
    removeToken();
    // 重定向到登录页
    if (location.pathname !== '/login') {
      location.href = location.origin + '/login';
    }
    return Promise.reject(error);
  }
);

// 5.导出
export default api;
