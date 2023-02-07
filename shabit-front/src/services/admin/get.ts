import apiRequest from '../../utils/apiRequest';
import { useDispatch } from 'react-redux';
import { setInitTime } from '../../store/timeSlice';

//alertTime이랑 stretchingTime 가져오기
export const getAlarmTime = async (): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/admin/alarm`)
    .then((res) => {
        const alertTime = res.data.result.alertTime;
        sessionStorage.setItem('alertTime',alertTime);
        return res.data.result.stretchingTime ;
    })
    .catch((err) => {
      return err;
    });
};