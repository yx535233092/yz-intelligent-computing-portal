import api from '@/lib/api/request';
import type {
  EditPasswordData,
  EditPasswordRes,
  ResetPasswordRes,
} from '@/types/profile';

// 修改密码
const editPasswordAPI = (data: EditPasswordData): Promise<EditPasswordRes> => {
  const formData = new FormData();
  formData.append('old_password', data.old_password);
  formData.append('new_password', data.new_password);

  return api({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: '/users/change_password',
    data: formData,
  });
};

// 重置密码
const resetPasswordAPI = (): Promise<ResetPasswordRes> => {
  return api({
    method: 'PUT',
    url: '/users/reset_password',
  });
};

export { editPasswordAPI, resetPasswordAPI };

// ============= 业务逻辑层 =============

export const profileService = {
  // 修改密码
  editPassword: async (data: EditPasswordData) => {
    const res = await editPasswordAPI(data);
    const message = res.message || res.detail;
    return message;
  },

  // 重置密码
  resetPassword: async () => {
    const res = await resetPasswordAPI();
    const message = res.message || res.detail;
    return message;
  },
};
