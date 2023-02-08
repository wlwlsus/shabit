import { FireAlert, FireConfirm, header } from '..';
import store from '../../store';
import { setQuetesList, setVideoList } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';
import { retreivePhrases, retrieveVods } from './get';

export const postVod = async (
  categoryId: number,
  url: string,
): Promise<[Object]> => {
  // console.log(categoryId, url);
  return await apiRequest
    .post('/api/v1/admin/vods', { categoryId, url }, { headers: header() })
    .then(async () => {
      FireConfirm('추가되었습니다.');
      const vods = await retrieveVods().catch();
      store.dispatch(setVideoList(vods));
      return Promise.resolve(vods);
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export const postQuote = async (phrase: string) => {
  return await apiRequest
    .post(
      '/api/v1/admin/phrase',
      {
        content: phrase,
      },
      { headers: header() },
    )
    .then(async () => {
      FireConfirm('추가되었습니다.');
      const quotes = await retreivePhrases().catch();
      store.dispatch(setQuetesList(quotes));
      return Promise.resolve(quotes);
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export default { postVod, postQuote };
