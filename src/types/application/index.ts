// 应用相关类型
export interface ApplicationData {
  id: number;
  type: string;
  name: string;
  description: string;
  route: string;
  url?: string;
  sceneCategory: string;
  industryTag: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  permissionKey?: string;
}

// 应用列表响应类型
export interface ApplicationsResponse {
  applications: ApplicationData[];
}
