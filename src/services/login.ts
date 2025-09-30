import { loginAPI } from '@/apis/login';
import { setToken, removeToken } from '@/lib/utils/cookies';
import { clearUserInfo } from '@/lib/store/features/userInfoSlice';
import store from '@/lib/store';

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
