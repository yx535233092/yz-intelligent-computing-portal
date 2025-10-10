import request from '@/lib/api/request';
import type { Role, Permission } from '@/types/auth';

// 获取所有角色
export const getRolesAPI = (): Promise<{
  roles: Role[];
}> => {
  return request({
    method: 'GET',
    url: '/api/auth/role',
  });
};

// 创建角色
export const createRoleAPI = (data: {
  name: string;
  description?: string;
}): Promise<{
  role: Role;
  message: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/auth/role',
    data,
  });
};

// 更新角色
export const updateRoleAPI = (data: {
  id: number;
  name: string;
  description?: string;
}): Promise<{
  role: Role;
  message: string;
}> => {
  return request({
    method: 'PUT',
    url: '/api/auth/role',
    data,
  });
};

// 删除角色
export const deleteRoleAPI = (
  id: number
): Promise<{
  role: Role;
  message: string;
}> => {
  return request({
    method: 'DELETE',
    url: '/api/auth/role',
    data: { id },
  });
};

// 为角色分配权限
export const assignPermissionsToRoleAPI = (data: {
  roleId: number;
  permissionIds: number[];
}): Promise<{
  message: string;
}> => {
  return request({
    method: 'POST',
    url: '/api/auth/role/permissions',
    data,
  });
};

// 获取角色的权限列表
export const getRolePermissionsAPI = (
  roleId: number
): Promise<{
  permissions: Permission[];
}> => {
  return request({
    method: 'GET',
    url: `/api/auth/role/permissions?roleId=${roleId}`,
  });
};
