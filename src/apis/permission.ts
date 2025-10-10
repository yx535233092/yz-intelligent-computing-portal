import request from '@/lib/api/request';
import type { Role, Permission } from '@/types/auth';

// 获取所有权限
export const getPermissionsAPI = (): Promise<{
  permissions: Permission[];
}> => {
  return request({
    method: 'GET',
    url: '/api/auth/permission',
  });
};

// 创建权限
export const createPermissionAPI = (data: {
  name: string;
  description?: string;
}): Promise<{
  permission: Permission;
  message: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/auth/permission',
    data,
  });
};

// 更新权限
export const updatePermissionAPI = (data: {
  id: number;
  name: string;
  description?: string;
}): Promise<{
  permission: Permission;
  message: string;
}> => {
  return request({
    method: 'PUT',
    url: '/api/auth/permission',
    data,
  });
};

// 删除权限
export const deletePermissionAPI = (
  id: number
): Promise<{
  permission: Permission;
  message: string;
}> => {
  return request({
    method: 'DELETE',
    url: '/api/auth/permission',
    data: { id },
  });
};
