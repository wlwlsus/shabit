import store from '../../../store';
import {
  setUserState,
  setTokenState,
  setIsAdminState,
} from '../../../store/authSlice';
import apiRequest from '../../../utils/apiRequest';
import jwt_decode from 'jwt-decode';

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

interface DecodedJWT {
  sub: string;
  auth: string;
  exp: Date;
}

export const login = async (email: string, password: string) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken;
      const refreshToken = res.data.result.token.refreshToken;
      const user = res.data.result.user;
      console.log(user);
      store.dispatch(setTokenState(accessToken));
      store.dispatch(setUserState(user));
      sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
      sessionStorage.setItem('user', JSON.stringify(user));
      const decodedToken: DecodedJWT = jwt_decode(accessToken);
      // console.log(decodedToken);
      if (decodedToken.auth === 'ROLE_ADMIN') {
        store.dispatch(setIsAdminState(true));
      } else store.dispatch(setIsAdminState(false));
      return Promise.resolve({ user, accessToken, refreshToken });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const refreshLogin = async (
  accessToken: string,
  refreshToken: string,
  email: string,
): Promise<boolean> => {
  // const refreshToken = localStorage.getItem('refreshToken');
  // const accessToken = localStorage.getItem('accessToken');
  return await apiRequest
    .post(`/api/v1/user/token`, { accessToken, refreshToken })
    .then(async (res) => {
      const { accessToken, refreshToken } = res.data.result;
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
      store.dispatch(setTokenState(accessToken));
      return Promise.resolve({ accessToken, refreshToken }).catch((err) => {});
    });
};

export const socialLogin = async (email: string, password: string) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken;
      const user = res.data.result.user;
      console.log(user);
      store.dispatch(setTokenState(accessToken));
      store.dispatch(setUserState(user));
      sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
      sessionStorage.setItem('user', JSON.stringify(user));
      const decodedToken: DecodedJWT = jwt_decode(accessToken);
      if (decodedToken.auth === 'ROLE_ADMIN') {
        store.dispatch(setIsAdminState(true));
      } else store.dispatch(setIsAdminState(false));
      return Promise.resolve({ user, accessToken });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const logout = async (
  accessToken: string,
  refreshToken: string,
): Promise<boolean> => {
  return await apiRequest
    .post('/api/v1/user/logout', { accessToken, refreshToken })
    .then(() => {
      sessionStorage.clear();
      alert('로그아웃 되었습니다.');
      return Promise.resolve(true);
    })
    .catch(() => Promise.reject(false));
};
