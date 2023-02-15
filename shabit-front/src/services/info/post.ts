import apiRequest from '../../utils/apiRequest';
import { header } from '..';

export const postImage = async (
  email: string,
  data: any
): Promise<boolean> => {
  const { Authorization } = header();
  return await apiRequest
    .post(`/api/v1/user/image/${email}`,data, {
      headers: { Authorization, 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
}