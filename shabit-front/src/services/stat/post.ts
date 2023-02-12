import apiRequest from '../../utils/apiRequest';
import { header } from '..';

export const postData = async (
  email: string,
  data: any,
): Promise<boolean> => {
  const { Authorization } = header();
  console.log(data);
  return await apiRequest
    .post(`/api/v1/statistics/${email}`, data, {
      headers: { Authorization, 'Content-Type': 'application/json' },
    })
    .then(() =>Promise.resolve(true))
    .catch(() => Promise.reject(false));
};
