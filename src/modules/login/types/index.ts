interface LoginData {
  username: string;
  password: string;
}

interface LoginRes {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// 用户信息接口返回对象类型
interface UserInfoData {
  id: number;
  username: string;
  group_name: string;
  denied_access_apps: string[];
  denied_click_apps: string[];
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
