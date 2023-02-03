import { FireAlert, FireConfirm, header } from '..';
import store from '../../store';
import { setQuetesList, setVideoList } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';
import { retreivePhrases, retrieveVods } from './get';

export const deleteVod = async (vodList: string): Promise<[object]> => {
  return await apiRequest
    .delete('/api/v1/admin/vods', {
      headers: header(),
      data: [vodList],
    })
    .then(async () => {
      FireConfirm('삭제되었습니다.');
      const vods = await retrieveVods();
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

export const deletePhrase = async (phrases: string): Promise<[string]> => {
  // alert(phrases);
  return await apiRequest
    .delete('/api/v1/admin/phrase', { headers: header(), data: [phrases] })
    .then(async () => {
      FireConfirm('삭제되었습니다.');
      const phrase = await retreivePhrases().catch();
      store.dispatch(setQuetesList(phrase));
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export default { deleteVod, deletePhrase };
