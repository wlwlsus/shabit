import { FireAlert, FireConfirm, header } from '..';
import store from '../../store';
import { setAlertTime, setStretchingTime } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';

interface AlarmTime {
  stretchingTime: Number;
  alertTime: number;
}

export const putAlarmTime = async (
  stretchingTime: Number,
  alertTime: number,
): Promise<AlarmTime> => {
  return await apiRequest
    .put(
      '/api/v1/admin/alarm',
      { stretchingTime, alertTime },
      { headers: header() },
    )
    .then(() => {
      FireConfirm('수정되었습니다.');
      store.dispatch(setStretchingTime(stretchingTime));
      store.dispatch(setAlertTime(alertTime));
      return Promise.resolve({ stretchingTime, alertTime });
    })
    .catch((err) => {
      FireAlert(
        err?.msg || err?.message || '알 수 없는 오류가 발생하였습니다.',
      );
      return Promise.reject(err);
    });
};

export default { putAlarmTime };
