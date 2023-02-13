import { FireAlert, FireConfirm, header } from '..';
import apiRequest from '../../utils/apiRequest';

interface Goal {
  percentage: number;
  time: number;
}

export const putGoal = async (
  email: string,
  percentage: number,
  time: number,
): Promise<Goal> => {
  return await apiRequest
    .put(
      `/api/v1/goal/${email}`,
      { percentage, time },
      { headers: header() },
    )
    .then(() => {
      return Promise.resolve({ percentage, time });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default { putGoal };