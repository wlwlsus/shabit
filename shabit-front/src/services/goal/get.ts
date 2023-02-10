import { header } from '..';
import apiRequest from '../../utils/apiRequest';

export const fetchTodayGoal = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/goal/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchTodayPostureTime = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/statistics/posture/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export const fetchGoal = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/goal/${email}`, { headers: header() })
    .then((res) => {
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};
