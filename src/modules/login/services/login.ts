import { loginAPI } from '../api/login';
import { setToken, removeToken, getToken } from '@/lib/utils/cookies';

// 权限模块业务逻辑
export const authService = {
  // 登录
  async login(data: LoginData) {
    // 获取token
    const res = await loginAPI(data);
    const token = res.access_token;

    // 存储token
    setToken(token);
    // 返回结果
    return res;
  },

  // 登出
  logout() {
    // 移除cookie中的token，退出登录
    removeToken();
  },

  // 验证本地是否存在token
  verifyToken() {
    return getToken();
  },
};
