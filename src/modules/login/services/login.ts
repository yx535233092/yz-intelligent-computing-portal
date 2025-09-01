import { loginAPI, getUserInfoAPI, logoutAPI } from '../api/login';
import { setToken, removeToken } from '@/lib/utils/cookies';
import { clearUserInfo } from '@/lib/store/features/userInfoSlice';
import store from '@/lib/store';

// 权限模块业务逻辑
export const authService = {
  // 登录
  async login(data: LoginData) {
    // 获取token
    const res = await loginAPI(data);
    const token = res.access_token;

    // 存储token
    setToken(token);
    // 存储用户信息在redux内做状态管理
    const userInfo = await this.getUserInfo();
    // 返回结果
    return userInfo;
  },

  // 登出
  async logout() {
    // 登出请求
    await logoutAPI();
    // 移除cookie中的token
    removeToken();
    // 清空redux用户信息
    store.dispatch(clearUserInfo());
    // 刷新页面
    location.reload();
  },

  // 获取用户信息
  async getUserInfo() {
    const res = await getUserInfoAPI();
    return res;
  },
};
