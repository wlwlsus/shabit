import { fetchProfile } from './../get/index';
import { header } from '../..';
import apiRequest from '../../../utils/apiRequest';

export const changeImage = async (email: string, formData: FormData) => {
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

export const changeNickname = async (
  email: string,
  nickname: string,
): Promise<boolean> => {
  return await apiRequest
    .put(`/api/v1/user/nickname/${email}`, { nickname }, { headers: header() })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));
};
