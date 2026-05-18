// 应用相关类型
export interface ApplicationData {
  id: number;
  type: string;
  name: string;
  description: string;
  route: string;
  url?: string;
  username?: string;
  password?: string;
  sceneCategory: string;
  industryTag: string;
  icon: string;
  sortOrder: number;
  needsAuth: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  permissionKey?: string;
}

// 应用列表响应类型
export interface ApplicationsResponse {
  applications: ApplicationData[];
}
