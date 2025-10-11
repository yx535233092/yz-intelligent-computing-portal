// 权限相关类型
export interface Permission {
  id: number;
  name: string;
  description?: string | null;
  roles?: Role[];
}

// 角色相关类型
export interface Role {
  id: number;
  name: string;
  description?: string | null;
  permissions?: Permission[];
}

// 用户相关类型
export interface User {
  id: number;
  username: string;
  password?: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  roles?: Role[];
}

// 登录相关类型
export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  userInfo: UserInfoData;
}

// 用户信息接口返回对象类型
export interface UserInfoData {
  createdAt: string;
  id: number;
  isActive: boolean;
  updatedAt: string;
  username: string;
}

// 用户应用列表接口返回对象类型
export interface UserAppListData {
  description: string;
  id: number;
  url: string;
  type: string;
  name: string;
  route: string;
  icon: string;
  deniedAccess: boolean;
  deniedClick: boolean;
  industryTag: string;
  sceneCategory: string;
}

// 用户权限相关类型
export interface UserPermissionsData {
  permissions: string[];
  roles: string[];
}
