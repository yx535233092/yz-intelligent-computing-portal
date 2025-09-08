import api from '@/lib/api/request';

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
