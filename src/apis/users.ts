import request from '@/lib/api/request';
import type { User } from '@/types/auth';

// 获取所有用户
export const getUsersAPI = (): Promise<{
  users: User[];
}> => {
  return request({
    method: 'GET',
    url: '/api/auth/users',
  });
};

// 创建用户
export const createUserAPI = (data: {
  username: string;
  password: string;
}): Promise<{
  user: User;
  message: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/auth/users',
    data,
  });
};

// 更新用户
export const updateUserAPI = (data: {
  id: number;
  username?: string;
  password?: string;
  isActive?: boolean;
}): Promise<{
  user: User;
  message: string;
}> => {
  return request({
    method: 'PUT',
    url: '/api/auth/users',
    data,
  });
};

// 删除用户
export const deleteUserAPI = (
  id: number
): Promise<{
  message: string;
}> => {
  return request({
    method: 'DELETE',
    url: '/api/auth/users',
    data: { id },
  });
};

// 为用户分配角色
export const assignRolesToUserAPI = (data: {
  userId: number;
  roleIds: number[];
}): Promise<{
  message: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/auth/users/roles',
    data,
  });
};

// 获取用户的角色列表
export const getUserRolesAPI = (
  userId: number
): Promise<{
  roles: { id: number; name: string; description?: string }[];
}> => {
  return request({
    method: 'GET',
    url: `/api/auth/users/roles?userId=${userId}`,
  });
};
