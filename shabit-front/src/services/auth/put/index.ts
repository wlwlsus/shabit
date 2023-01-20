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
    .put(`/user/${email}`)
    .then(() => {
      alert('패스워드가 초기화 되었습니다.');
      return true;
    })
    .catch(() => false);
};

export const changeTheme = (thema: number, email: string): Promise<boolean> => {
  return Promise.resolve(true);
};

export const changeNickname = (email: string): Promise<boolean> => {
  return Promise.resolve(true);
};

export default { changeImage, resetPassword, changeTheme, changeNickname };
