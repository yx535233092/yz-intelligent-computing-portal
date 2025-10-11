import request from '@/lib/api/request';
import type { ApplicationData } from '@/types/application';
import type { UserPermissionsData } from '@/types/auth';

export const getApplicationsAPI = (): Promise<{
  applications: ApplicationData[];
}> => {
  return request({
    method: 'GET',
    url: '/api/getApplications',
  });
};

export const getUserPermissionsAPI = (): Promise<{
  data: UserPermissionsData;
}> => {
  return request({
    method: 'GET',
    url: '/api/auth/getUserPermissions',
  });
};
