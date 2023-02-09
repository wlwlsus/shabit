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
      FireConfirm('수정되었습니다.');
      return Promise.resolve({ percentage, time });
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export default { putGoal };