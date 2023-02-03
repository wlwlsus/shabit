import { header } from '..';
import store from '../../store';
import { setQuetesList, setVideoList } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';
import { retreivePhrases, retrieveVods } from './get';

export const deleteVod = async (vodList: [number]): Promise<[object]> => {
  return await apiRequest
    .delete('api/v1/admin/vods', [...vodList], { headers: header() })
    .then(async () => {
      const vods = await retrieveVods();
      store.dispatch(setVideoList(vods));
      return Promise.resolve(vods);
    })
    .catch((err) => Promise.reject(err));
};

export const deletePhrase = async (phrases: [string]): Promise<[string]> => {
  return await apiRequest
    .delete('api/v1/admin/phrase', [...phrases], { headers: header() })
    .then(async () => {
      const phrase = await retreivePhrases().catch();
      store.dispatch(setQuetesList(phrase));
    })
    .catch((err) => Promise.reject(err));
};

export default { deleteVod, deletePhrase };
