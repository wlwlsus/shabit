import { header } from '..';
import apiRequest from '../../utils/apiRequest';

export const fetchVideo = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};
