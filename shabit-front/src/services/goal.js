import { header } from '.';
import apiRequest from '../utils/apiRequest';

// GET request
export const fetchTodayGoal = async (email) => {
  return await apiRequest
    .get(`/api/v1/statistics/goal/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchTodayPostureTime = async (email) => {
  return await apiRequest
    .get(`/api/v1/statistics/posture/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchGoal = async (email) => {
  return await apiRequest
    .get(`/api/v1/goal/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

// PUT request
export const putGoal = async (email, percentage, time) => {
  return await apiRequest
    .put(`/api/v1/goal/${email}`, { percentage, time }, { headers: header() })
    .then(() => {
      return Promise.resolve({ percentage, time });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const Goal = {
  fetchTodayGoal,
  fetchTodayPostureTime,
  fetchGoal,
  putGoal,
};

export default Goal;
