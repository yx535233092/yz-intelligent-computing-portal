interface EditPasswordData {
  old_password: string;
  new_password: string;
}

interface EditPasswordRes {
  message?: string;
  detail?: string;
}

interface ResetPasswordRes {
  message?: string;
  detail?: string;
}
