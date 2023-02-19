import { header } from '.';
import apiRequest from '../utils/apiRequest';
import store from '../store';
import { setQuote } from '../store/chartSlice';

// GET reqest
export const fetchVods = async (email) => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchQuote = async () => {
  return await apiRequest
    .get('/api/v1/info/phrases', { headers: header() })
    .then((res) => {
      const data = res.data.result.content;
      store.dispatch(setQuote(data));
      return Promise.resolve(data);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchPhoto = async (email, query, page) => {
  return await apiRequest
    .get(`/api/v1/user/image/${email}?query=${query}&page=${page}`, {
      headers: header(),
    })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchCategories = async () => {
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

// POST request
export const postImage = async (email, data) => {
  const { Authorization } = header();
  return await apiRequest
    .post(`/api/v1/user/image/${email}`, data, {
      headers: { Authorization, 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err));
};

const Info = {
  fetchCategories,
  fetchQuote,
  fetchPhoto,
  fetchVods,
  postImage,
};

export default Info;
