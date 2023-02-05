import { header } from '..';
import apiRequest from '../../utils/apiRequest';

export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      sessionStorage.setItem('vods', res.data.result);
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchCategories = async (): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/catefory`, { headers: header() })
    .then((res) => {
      sessionStorage.setItem('cetegory', res.data.result);
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchPhrases = async (): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/phrases`, { headers: header() })
    .then((res) => {
      sessionStorage.setItem('phrases', res.data.result.content);
      return res.data.result.content;
    })
    .catch((err) => err.data);
};
