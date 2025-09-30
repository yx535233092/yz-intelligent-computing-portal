interface LoginData {
  username: string;
  password: string;
}

interface LoginRes {
  token: string;
  userInfo: UserInfoData;
}

// 用户信息接口返回对象类型
interface UserInfoData {
  createdAt: string;
  id: number;
  isActive: boolean;
  updatedAt: string;
  username: string;
}

// 用户应用列表接口返回对象类型
interface UserAppListData {
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
