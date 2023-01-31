import { header } from '../..';
import apiRequest from '../../../utils/apiRequest';

export const changeImage = (
  email: string,
  formData: FormData,
): string | void => {
  if (!formData || !formData.has('file') || !formData.get('file')) {
    alert('이미지 파일이 없습니다');
    return;
  }

  const { Authorization } = header();
  apiRequest
    .put(`/api/v1/user/profile/${email}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization,
      },
    })
    .then((res) => {
      alert('이미지가 변경되었습니다.');
      return res.result.url;
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
