import apiRequest from '../../utils/apiRequest';
export const fetchDaily = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/today/${email}`)
    .then((res) => {
      localStorage.setItem('dailyData', res.data.result);
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
      localStorage.setItem('weeklyData', res.data.result);
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
      localStorage.setItem('monthlyData', res.data.result);
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err.data));
};

export const fetchHeatmap = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/grass/${email}`)
    .then((res) => {
      localStorage.setItem('heatMapData', res.data.result);
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
      return Promise.resolve(newArray);
    })
    .catch((err) => err.data);
};
