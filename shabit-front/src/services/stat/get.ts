import { header } from '..';
import store from '../../store';
import { setHeatmapData, setQuote } from '../../store/chartSlice';
import apiRequest from '../../utils/apiRequest';

export const fetchDaily = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/today/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchWeekly = async (
  email: string,
  page: number,
): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/weekly/${email}?page=${~~page}`, {
      headers: header(),
    })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchMonthly = async (
  email: string,
  page: number,
): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/monthly/${email}?page=${~~page}`, {
      headers: header(),
    })
    .then((res) => {
      const data = res.data.result;
      return Promise.resolve(data);
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
      store.dispatch(setHeatmapData(newArray));
      return Promise.resolve(newArray);
    })
    .catch((err) => err.data);
};

export const fetchQuote = async (): Promise<object> => {
  return await apiRequest
    .get('/api/v1/info/phrases', { headers: header() })
    .then((res) => {
      const data = res.data.result.content;
      store.dispatch(setQuote(data));
      return Promise.resolve(data);
    });
};
