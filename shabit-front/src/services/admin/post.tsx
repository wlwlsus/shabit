import { header } from '..';
import store from '../../store';
import { setQuetesList, setVideoList } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';
import { retreivePhrases, retrieveVods } from './get';

export const postVod = async (
  categoryId: number,
  url: string,
): Promise<[Object]> => {
  return await apiRequest
    .post('admin/vods', { categoryId, url }, { headers: header() })
    .then(async () => {
      const vods = await retrieveVods().catch();
      store.dispatch(setVideoList(vods));
      return Promise.resolve(vods);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const postQuote = async (phrase: string) => {
  return await apiRequest
    .post('admin/phrase', { phrase }, { headers: header() })
    .then(async () => {
      const quotes = await retreivePhrases().catch();
      store.dispatch(setQuetesList(quotes));
      return Promise.resolve(quotes);
    })
    .catch((err) => Promise.reject(err));
};

export default { postVod, postQuote };
