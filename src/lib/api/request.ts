import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { getToken, removeToken } from '@/lib/utils/cookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// 请求地址(后端地址)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
    if (error.response && error.response.status === 401) {
      // 临时放开：不强制跳转登录页
      console.warn('收到 401 未授权，但在放开模式下不跳转登录页');
      // // 清除token
      // removeToken();
      // // 如果是服务端环境，不需要跳转
      // if (typeof window === 'undefined') {
      //   return Promise.reject(error);
      // }
      // // 跳转到登录页，并携带当前页面路径作为参数
      // if (!location.pathname.includes('/auth/login')) {
      //   location.href = location.origin + '/auth/login?message=token_expired';
      // }
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
