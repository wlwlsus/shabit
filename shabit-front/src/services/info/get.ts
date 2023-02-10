import { header } from '..';
import store from '../../store';
import apiRequest from '../../utils/apiRequest';
import { setQuote } from '../../store/chartSlice';

export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchQuote = async (): Promise<object> => {
  return await apiRequest
    .get('/api/v1/info/phrases', { headers: header() })
    .then((res) => {
      const data = res.data.result.content;
      store.dispatch(setQuote(data));
      return Promise.resolve(data);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchPhoto = async (
  email: string,
  query: number,
  page: number,
): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/user/image/${email}?query=${query}&page=${page}`, {
      headers: header(),
    })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchCategories = async (): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/category`, { headers: header() })
    .then((res) => {
      sessionStorage.setItem('cetegory', res.data.result);
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
};
