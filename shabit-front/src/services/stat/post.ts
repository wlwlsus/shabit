import apiRequest from '../../utils/apiRequest';

export const postData = async (
  email: string,
  data: Array<string>,
): Promise<boolean> => {
  return await apiRequest
    .post(`/statistics/${email}`, [...data])
    .then(() => Promise.resolve(true))
    .catch(() => Promise.reject(false));
};
