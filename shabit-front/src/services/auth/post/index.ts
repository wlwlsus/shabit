import store from '../../../store';
import { setUserState, setTokenState } from '../../../store/authSlice';
import apiRequest from '../../../utils/apiRequest';

//https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
export const register = async (
  email: string,
  nickname: string,
  password: string,
): Promise<boolean> => {
  return await apiRequest
    .post('/api/v1/user', {
      email,
      nickname,
      password,
    })
    .then((res) => {
      alert('회원가입이 완료되었습니다');
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.reject(false);
    });
};

export const login = async (email: string, password: string) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken;
      const user = res.data.result.user;
      store.dispatch(setTokenState(accessToken));
      store.dispatch(setUserState(user));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve({ user, accessToken });
    })
    .catch((err) => {
      return Promise.reject(err);
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
    .post('/api/v1/user/logout', { accessToken, refreshToken })
    .then(() => {
      localStorage.clear();
      alert('로그아웃 되었습니다.');
      return Promise.resolve(true);
    })
    .catch(() => Promise.reject(false));
};
