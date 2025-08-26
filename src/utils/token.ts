import Cookies from 'js-cookie';

const getToken = (): string => {
  return Cookies.get('token') || '';
};

const setToken = (token: string): void => {
  Cookies.set('token', token);
};

const removeToken = (): void => {
  Cookies.remove('token');
};

export { getToken, setToken, removeToken };
