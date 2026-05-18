import api from '@/lib/api/request';
import { setToken, removeToken } from '@/lib/utils/cookies';
import { clearUserInfo } from '@/lib/store/features/userInfoSlice';
import store from '@/lib/store';
import type {
  LoginData,
  UserInfoData,
} from '@/types/auth';

/**
 * 切换到本地 RBAC 系统：
 * 直接请求 Next.js 后端提供的 /api/auth/login
 */

// 登录接口
export const loginAPI = (data: LoginData): Promise<{ token: string; userInfo: UserInfoData }> => {
  return api({
    method: 'POST',
    url: '/api/auth/login',
    data,
  });
};

// 登出接口 (本地目前仅需清理客户端状态)
export const logoutAPI = (): Promise<void> => {
  return Promise.resolve();
};

// 获取用户信息 (本地模式下通常已在登录时返回，或者通过 Token 获取)
export const getUserInfoAPI = async (): Promise<UserInfoData> => {
  // 如果需要单独获取，可以请求一个专门的接口，目前先从本地逻辑获取
  return {} as UserInfoData; 
};

// 权限模块业务逻辑
export const authService = {
  // 登录
  async login(data: LoginData) {
    // 调用本地登录接口
    const res = await loginAPI(data);
    
    // 存储 Token
    setToken(res.token);
    
    // 返回用户信息
    return res.userInfo;
  },

  // 登出
  async logout() {
    // 移除cookie中的token
    removeToken();
    // 清空redux用户信息
    store.dispatch(clearUserInfo());
    // 返回登录页
    location.href = '/auth/login';
  },
};
