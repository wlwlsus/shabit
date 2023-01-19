export const register = (
  email: string,
  nickname: string,
  password: string,
): boolean => {
  return true;
};

export const login = (email: string, password: string): object => {
  return {};
};

export const refreshLogin = (
  accessToken: string,
  refreshToken: string,
): object => {
  return {};
};

export const logout = (accessToken: string, refreshToken: string): boolean => {
  return true;
};

export default { register, login, refreshLogin, logout };
