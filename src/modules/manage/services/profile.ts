import { editPasswordAPI, resetPasswordAPI } from '../api/profile';

const profileService = {
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

export default profileService;
