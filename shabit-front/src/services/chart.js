import { header } from '.';
import apiRequest from '../utils/apiRequest';
import store from '../store';
import { setHeatmapData } from '../store/chartSlice';

// GET request
export const fetchDaily = async (email) => {
  return await apiRequest
    .get(`/api/v1/statistics/today/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchWeekly = async (email, page) => {
  return await apiRequest
    .get(`/api/v1/statistics/weekly/${email}?page=${~~page}`, {
      headers: header(),
    })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchMonthly = async (email, page) => {
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

export const fetchHeatmap = async (email) => {
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

// POST request
export const postData = async (email, data) => {
  const { Authorization } = header();
  // console.log(Authorization);
  return await apiRequest
    .post(`/api/v1/statistics/${email}`, data, {
      headers: { Authorization, 'Content-Type': 'application/json' },
    })
    .then(() => Promise.resolve(true))
    .catch(() => Promise.reject(false));
};

const Chart = {
  fetchDaily,
  fetchWeekly,
  fetchMonthly,
  fetchHeatmap,
  postData,
};

export default Chart;
