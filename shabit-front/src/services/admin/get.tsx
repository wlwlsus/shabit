import { header } from '..';
import store from '../../store';
import {
  pushQuetesList,
  pushVideoList,
  setAlertTime,
  setQuetesList,
  setStretchingTime,
  setVideoList,
} from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';

interface AlarmTime {
  stretchingTime: Number;
  alertTime: number;
}

export const fetchAlarmTime = async (): Promise<AlarmTime> => {
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

export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      store.dispatch(setVideoList(res.data.result));
      return Promise.resolve(res.data.result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const retrieveVods = async (
  page: number = 0,
  category: 0 | 1 | 2 | 3 = 0,
  length: 0 | 3 | 5 | 10 = 0,
): Promise<[object]> => {
  return await apiRequest
    .get(
      `/api/v1/admin/vods?category=${category}&length=${length}&page=${page}`,
      {
        headers: header(),
      },
    )
    .then((res) => {
      if (!page) {
        store.dispatch(setVideoList(res.data.result));
      } else {
        store.dispatch(pushVideoList(res.data.result));
      }
      return Promise.resolve(res.data.result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const retreivePhrases = async (page: number = 0): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/admin/phrase?page=${page}`, { headers: header() })
    .then((res) => {
      // console.log(res.data.result);
      if (!page) {
        store.dispatch(setQuetesList(res.data.result));
      } else {
        store.dispatch(pushQuetesList(res.data.result));
      }
      return res.data.result;
    })
    .catch((err) => err.data);
};
