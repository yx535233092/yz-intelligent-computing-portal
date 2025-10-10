import api from '@/lib/api/request';
import { setToken, removeToken } from '@/lib/utils/cookies';
import { clearUserInfo } from '@/lib/store/features/userInfoSlice';
import store from '@/lib/store';
import type {
  LoginData,
  LoginRes,
  UserInfoData,
  UserAppListData,
} from '@/types/auth';

// 登录接口
export const loginAPI = (data: LoginData): Promise<LoginRes> => {
  return api({
    method: 'POST',
    url: '/api/auth/login',
    data,
  });
};

// 登出接口
export const logoutAPI = (): Promise<void> => {
  return api({
    method: 'POST',
    url: '/users/logout',
  });
};

// 获取用户信息
export const getUserInfoAPI = (): Promise<UserInfoData> => {
  return api({
    method: 'GET',
    url: '/auth/userInfo',
  });
};

// 获取用户应用列表
export const getUserAppListAPI = (): Promise<UserAppListData[]> => {
  return api({
    method: 'GET',
    url: '/users/own_info_advenced',
  });
};

// 权限模块业务逻辑
export const authService = {
  // 登录
  async login(data: LoginData) {
    const { token, userInfo } = await loginAPI(data);
    // 存储token
    setToken(token);
    // 返回用户信息
    return userInfo;
  },

  // 登出
  async logout() {
    // 登出请求
    // await logoutAPI();
    // 移除cookie中的token
    removeToken();
    // 清空redux用户信息
    store.dispatch(clearUserInfo());
    // 返回登录页
    location.href = '/auth/login';
  },
};
