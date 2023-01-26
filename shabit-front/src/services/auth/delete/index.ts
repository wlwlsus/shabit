import apiRequest from '../../../utils/apiRequest';

export const deleteImage = async (email: string): Promise<boolean> => {
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
