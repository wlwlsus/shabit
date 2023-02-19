import { FireAlert, FireConfirm, header } from '.';
import store from '../store';
import {
  setAlertTime,
  setQuetesList,
  setStretchingTime,
  setVideoList,
} from '../store/adminSlice';
import { retreivePhrases } from './admin/get';
import apiRequest from '../utils/apiRequest';

// GET request
export const fetchAlarmTime = async () => {
  return await apiRequest
    .get('/api/v1/admin/alarm', { headers: header() })
    .then((res) => {
      const { stretchingTime, alertTime } = res.data.result;
      store.dispatch(setStretchingTime(Number(stretchingTime)));
      store.dispatch(setAlertTime(Number(alertTime)));
      return Promise.resolve({
        setStretchingTime: Number(stretchingTime),
        setAlertTime: Number(alertTime),
      });
    })
    .catch((err) => Promise.reject(err));
};

// export const retrieveVods = async (
//   page: number = 0,
//   category: 0 | 1 | 2 | 3 = 0,
//   length: 0 | 3 | 5 | 10 = 0,
// ) => {
//   return await apiRequest
//     .get(
//       `/api/v1/admin/vods?category=${category}&length=${length}&page=${page}`,
//       {
//         headers: header(),
//       },
//     )
//     .then((res) => {
//       if (!page) {
//         store.dispatch(setVideoList(res.data.result));
//       } else {
//         store.dispatch(pushVideoList(res.data.result));
//       }
//       return Promise.resolve(res.data.result);
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
// };

// export const retreivePhrases = async (page: number = 0): Promise<object> => {
//   return await apiRequest
//     .get(`/api/v1/admin/phrase?page=${page}`, { headers: header() })
//     .then((res) => {
//       if (!page) {
//         store.dispatch(setQuetesList(res.data.result));
//       } else {
//         store.dispatch(pushQuetesList(res.data.result));
//       }
//       return res.data.result;
//     })
//     .catch((err) => err.data);
// };

// POST request

export const postVod = async (categoryId, url) => {
  return await apiRequest
    .post('/api/v1/admin/vods', { categoryId, url }, { headers: header() })
    .then(async () => {
      FireConfirm('추가되었습니다.');
      return Promise.resolve();
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export const postQuote = async (phrase) => {
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

// PUT request
export const putAlarmTime = async (stretchingTime, alertTime) => {
  return await apiRequest
    .put(
      '/api/v1/admin/alarm',
      { stretchingTime, alertTime },
      { headers: header() },
    )
    .then(() => {
      FireConfirm('수정되었습니다.');
      store.dispatch(setStretchingTime(stretchingTime));
      store.dispatch(setAlertTime(alertTime));
      return Promise.resolve({ stretchingTime, alertTime });
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

// DELETE request
export const deleteVod = async (vodList) => {
  return await apiRequest
    .delete('/api/v1/admin/vods', {
      headers: header(),
      data: [vodList],
    })
    .then(async () => {
      FireConfirm('삭제되었습니다.');
      // const vods = await retrieveVods();
      // store.dispatch(setVideoList(vods));
      return Promise.resolve();
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export const deletePhrase = async (phrases) => {
  // alert(phrases);
  return await apiRequest
    .delete('/api/v1/admin/phrase', { headers: header(), data: [phrases] })
    .then(async () => {
      FireConfirm('삭제되었습니다.');
      // const phrase = await retreivePhrases().catch();
      // store.dispatch(setQuetesList(phrase));
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

const Admin = {
  fetchAlarmTime,
  putAlarmTime,
  postVod,
  deleteVod,
  // retrieveVods,
  postQuote,
  deletePhrase,
  // retreivePhrases,
};

export default Admin;
