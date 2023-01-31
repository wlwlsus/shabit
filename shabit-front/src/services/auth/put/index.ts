import { fetchProfile } from './../get/index';
import { header } from '../..';
import apiRequest from '../../../utils/apiRequest';

export const changeImage = (
  email: string,
  formData: FormData,
): string | void => {
  const { Authorization } = header();
  apiRequest
    .put(`/api/v1/user/profile/${email}`, formData, {
      headers: {
        Authorization,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(async (res) => {
      await fetchProfile(email);
      return res;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert('로그인이 필요합니다');
      }
    });

  return;
};

export const resetPassword = async (email: string): Promise<boolean> => {
  return await apiRequest
    .put(`/api/v1/user/password-find/${email}`)
    .then(() => {
      return Promise.resolve(true);
    })
    .catch(() => Promise.reject(false));
};

export const changeTheme = (thema: number, email: string): Promise<boolean> => {
  return Promise.resolve(true);
};

export const changeNickname = (email: string): Promise<boolean> => {
  return Promise.resolve(true);
};
