import { header } from '.';
import apiRequest from '../utils/apiRequest';
import store from '../store';
import jwt_decode from 'jwt-decode';

import {
  setUserState,
  setTokenState,
  setIsAdminState,
  setIsSocialState,
} from '../store/authSlice';

// GET request
export const fetchProfile = async (email) => {
  return await apiRequest
    .get(`/api/v1/user/${email}`, { headers: header() })
    .then((res) => {
      const user = res.data.result;
      store.dispatch(setUserState(user));
      sessionStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve(user);
    })
    .catch(async (err) => Promise.reject(err));
};

export const confirmEmail = async (email) => {
  return await apiRequest
    .get(`api/v1/user/email-valid/${email}`)
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => {
      return Promise.resolve(err);
    });
};

export const checkEmail = async (email) => {
  return await apiRequest
    .get(`/api/v1/user/email-check/${email}`)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

// POST request
export const register = async (email, nickname, password) => {
  return await apiRequest
    .post('/api/v1/user', {
      email,
      nickname,
      password,
    })
    .then((res) => {
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.reject(false);
    });
};

export const login = async (email, password) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken;
      const refreshToken = res.data.result.token.refreshToken;
      const user = res.data.result.user;
      store.dispatch(setTokenState(accessToken));
      store.dispatch(setUserState(user));
      store.dispatch(setIsSocialState(false));
      sessionStorage.setItem('isSocial', JSON.stringify(false));
      sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
      sessionStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      sessionStorage.setItem('user', JSON.stringify(user));
      const decodedToken = jwt_decode(accessToken);
      // decodedToken);
      if (decodedToken.auth === 'ROLE_ADMIN') {
        store.dispatch(setIsAdminState(true));
      } else store.dispatch(setIsAdminState(false));
      return Promise.resolve({ user, accessToken, refreshToken });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const refreshLogin = async (accessToken, refreshToken, email) => {
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

export const logout = async () => {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
  const refreshToken = JSON.parse(sessionStorage.getItem('refreshToken'));
  return await apiRequest
    .post(
      '/api/v1/user/logout',
      { accessToken, refreshToken },
      { headers: header() },
    )
    .then(() => {
      sessionStorage.setItem('isSocial', JSON.stringify(false));
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      // store.dispatch(clearAuthState());
      return Promise.resolve(true);
    })
    .catch(() => Promise.reject(false));
};

// PUT request
export const changeImage = async (email, formData) => {
  const { Authorization } = header();
  return await apiRequest
    .put(`/api/v1/user/profile/${email}`, formData, {
      headers: {
        Authorization,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(async (res) => {
      await fetchProfile(email);
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const resetPassword = async (email) => {
  return await apiRequest
    .put(`/api/v1/user/password-find/${email}`)
    .then(() => {
      return Promise.resolve(true);
    })
    .catch((err) => Promise.reject(err));
};

export const changePassword = async (email, curPassword, changePassword) => {
  return await apiRequest
    .put(
      `/api/v1/user/password-change/${email}`,
      { curPassword, changePassword },
      { headers: header() },
    )
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

// export const changeTheme = (thema, email: string): Promise<boolean> => {
//   return Promise.resolve(true);
// };

export const changeNickname = async (email, nickname) => {
  return await apiRequest
    .put(`/api/v1/user/nickname/${email}`, { nickname }, { headers: header() })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));
};

// DELETE request
export const deleteImage = async (email) => {
  return await apiRequest
    .delete(`/api/v1/user/profile/${email}`)
    .then(() => {
      alert('프로필 사진이 삭제되었습니다.');
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.reject(false);
    });
};

const Auth = {
  register,
  fetchProfile,
  changeImage,
  deleteImage,
  login,
  refreshLogin,
  logout,
  confirmEmail,
  checkEmail,
  resetPassword,
  // changeTheme,
  changeNickname,
  changePassword,
};

export default Auth;
