import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { getToken, removeToken } from '@/lib/utils/cookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// 请求地址(后端地址)
const BASE_URL = 'http://localhost:3000/';
let appRouter: AppRouterInstance | null = null;
let messageApi: {
  success: (msg: string) => void;
  error: (msg: string) => void;
} | null = null;

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
    console.log(error);
    // 接口权限认证失败
    if (error.response?.status === 401) {
      console.log('接口权限认证失败，跳转至登录页');
      // 清除token
      removeToken();
      // 获取错误详情
      let errorDetail = (error.response?.data as { detail: string }).detail;
      // 如果错误详情为Not authenticated，则显示登录已过期，请重新登录
      if (errorDetail === 'Not authenticated') {
        errorDetail = '登录已过期，请重新登录';
      }
      messageApi?.error(errorDetail);
      // 跳转至登录页
      if (appRouter) {
        console.log('aixos: router push');
        appRouter.push('/auth/login');
      } else {
        console.log('axios: location change');
        location.href = location.origin + '/auth/login?message=token_expired';
      }
    }
    // 抛出错误
    return Promise.reject(error);
  }
);

// 设置router实例
export const setAppRouter = (router: AppRouterInstance) => {
  appRouter = router;
};

// 设置message方法
export const setMessageApi = (messageIns: {
  success: (msg: string) => void;
  error: (msg: string) => void;
}) => {
  messageApi = messageIns;
  return messageApi;
};

// 5.导出
export default api;
