import { header } from '..';
import store from '../../store';
import {
  setDailyData,
  setHeatMapData,
  setHeatMapSeries,
  setMonthlyData,
  setRandomQuote,
  setWeeklyData,
} from '../../store/chartSlice';
import apiRequest from '../../utils/apiRequest';

const dispatch = store.dispatch;

export const fetchDaily = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/today/${email}`)
    .then((res) => {
      dispatch(setDailyData(res.data.result));
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchWeekly = async (
  email: string,
  page: number,
): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/weekly/${email}?page=${~~page}`)
    .then((res) => {
      dispatch(setWeeklyData(res.data.result));
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchMonthly = async (
  email: string,
  page: number,
): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/monthly/${email}?page=${~~page}`)
    .then((res) => {
      dispatch(setMonthlyData(res.data.result));
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchHeatmap = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/grass/${email}`, { headers: header() })
    .then((res) => {
      const jsonData = res.data.result;
      const newArray = [];
      for (let element of jsonData) {
        const { date, percentage } = element;
        let classValue = 0;
        if (percentage >= 80) classValue = 4;
        else if (percentage >= 60) classValue = 3;
        else if (percentage >= 40) classValue = 2;
        else if (percentage >= 20) classValue = 1;
        newArray.push({ date, percentage, classValue });
      }

      dispatch(setHeatMapData(jsonData));
      dispatch(setHeatMapSeries(newArray));
      return Promise.resolve(newArray);
    })
    .catch((err) => err.data);
};

export const fetchQuote = async (): Promise<object> => {
  return await apiRequest
    .get('/api/v1/info/phrases', { headers: header() })
    .then((res) => {
      dispatch(setRandomQuote(res.data.result.content));
      return Promise.resolve(res.data.result.content);
    });
};
