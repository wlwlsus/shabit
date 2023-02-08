import { header } from '..';
import store from '../../store';
import {
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
        alertTime: Number(alertTime),
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
  page: number | string = '',
  search: 'category' | 'title' | 'length' | '' = '',
  query: string = '',
): Promise<[object]> => {
  return await apiRequest
    .get(`/api/v1/admin/vods?search=${search}&query=${query}&page=${page}`, {
      headers: header(),
    })
    .then((res) => {
      store.dispatch(setVideoList(res.data.result));
      return Promise.resolve(res.data.result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const retreivePhrases = async (): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/admin/phrase?page=0`, { headers: header() })
    .then((res) => {
      // console.log(res.data.result);
      store.dispatch(setQuetesList(res.data.result));
      return res.data.result;
    })
    .catch((err) => err.data);
};

export default { fetchAlarmTime, fetchVods, retrieveVods, retreivePhrases };
