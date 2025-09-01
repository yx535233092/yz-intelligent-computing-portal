import api from '@/lib/api/request';

// 登录接口
export const loginAPI = (data: LoginData): Promise<LoginRes> => {
  return api({
    method: 'POST',
    url: '/users/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });
};

// 获取用户信息
export const getUserInfoAPI = (): Promise<UserInfoData> => {
  return api({
    method: 'GET',
    url: '/users/own_info',
  });
};
