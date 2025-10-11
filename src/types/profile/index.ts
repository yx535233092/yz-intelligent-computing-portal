// 个人资料相关类型

export interface EditPasswordData {
  old_password: string;
  new_password: string;
}

export interface EditPasswordRes {
  message?: string;
  detail?: string;
}

export interface ResetPasswordRes {
  message?: string;
  detail?: string;
}
