import request from '@/lib/api/request';
import { getUserInfoAPI } from './login';
import type { ApplicationData } from '@/types/application';
import type { UserPermissionsData } from '@/types/auth';

// 获取应用列表 (支持分页)
export const getApplicationsAPI = (params?: { 
  page?: number; 
  pageSize?: number; 
  name?: string;
  sceneCategory?: string;
}): Promise<{
  data: ApplicationData[];
  total: number;
  applications?: ApplicationData[]; 
}> => {
  // 由于拦截器已经处理了 response.data，这里直接断言返回值为目标类型
  return request({
    method: 'GET',
    url: '/api/applications',
    params,
  }).then((res: any) => {
    // res 实际上已经是后端返回的 JSON 数据
    return {
      ...res,
      applications: res.data || res.applications
    };
  });
};

// 获取应用详情
export const getApplicationDetailAPI = (id: number): Promise<ApplicationData> => {
  return request({
    method: 'GET',
    url: `/api/applications/${id}`,
  });
};

// 创建应用
export const createApplicationAPI = (data: Partial<ApplicationData>): Promise<ApplicationData> => {
  return request({
    method: 'POST',
    url: '/api/applications',
    data,
  });
};

// 更新应用
export const updateApplicationAPI = (id: number, data: Partial<ApplicationData>): Promise<ApplicationData> => {
  return request({
    method: 'PUT',
    url: `/api/applications/${id}`,
    data,
  });
};

// 删除应用
export const deleteApplicationAPI = (id: number): Promise<void> => {
  return request({
    method: 'DELETE',
    url: `/api/applications/${id}`,
  });
};

export const getUserPermissionsAPI = async (): Promise<{
  data: UserPermissionsData;
}> => {
  return request({
    method: 'GET',
    url: '/api/auth/getUserPermissions',
  });
};
