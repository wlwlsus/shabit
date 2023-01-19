import Services from '../..';
import apiRequest from '../../../utils/apiRequest';

export const changeImage = (
  email: string,
  formData: FormData,
): string | void => {
  if (!formData || !formData.has('file') || !formData.get('file')) {
    alert('이미지 파일이 없습니다');
    return;
  }

  apiRequest
    .put(`/user/profile/${email}`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
        // Authorization: `Token ${this.$store.state.token}`,
      },
    })
    .then((res) => {
      return res.result.url;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        alert('로그인이 필요합니다');
      }
    });

  return;
};

export const resetPassword = (email: string): boolean => {
  apiRequest
    .put(`/user/${email}`)
    .then(() => true)
    .catch(() => false);
  return false;
};

export const changeTheme = (thema: number, email: string) => {
  return true;
};

export const changeNickname = (email: string): boolean => {
  return true;
};

export default { changeImage, resetPassword, changeTheme, changeNickname };
