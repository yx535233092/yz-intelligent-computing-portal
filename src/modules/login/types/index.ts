interface LoginData {
  username: string;
  password: string;
}

interface LoginRes {
  access_token: string;
  expires_in: number;
  token_type: string;
}
