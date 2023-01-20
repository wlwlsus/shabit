import apiRequest from '../../../utils/apiRequest';

//https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
export const register = async (
  email: string,
  nickname: string,
  password: string,
): Promise<boolean> => {
  return await apiRequest
    .post('/user', { email, nickname, password })
    .then(() => {
      alert('회원가입이 완료되었습니다');
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.reject(false);
    });
};

export const login = async (
  email: string,
  password: string,
): Promise<boolean> => {
  return await apiRequest
    .get('/user', { email, password })
    .then((res) => {
      console.log(res.accessToken);
      localStorage.setItem(
        'accessToken',
        res.accessToken || res.data.accessToken,
      );
      localStorage.setItem(
        'refreshToken',
        res.refreshToken || res.data.refreshToken,
      );
      localStorage.setItem('user', JSON.stringify(res.user || res.data.user));
      alert('로그인이 완료되었습니다.');
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.reject(false);
    });
};

export const refreshLogin = async (
  accessToken: string,
  refreshToken: string,
): Promise<boolean> => {
  return Promise.resolve(true);
};

export const logout = async (
  accessToken: string,
  refreshToken: string,
): Promise<boolean> => {
  return await apiRequest
    .post('/user/logout', { accessToken, refreshToken })
    .then(() => {
      localStorage.clear();
      alert('로그아웃 되었습니다.');
      return Promise.resolve(true);
    })
    .catch(() => Promise.reject(false));
};

export default { register, login, refreshLogin, logout };
