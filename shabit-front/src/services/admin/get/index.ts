import apiRequest from '../../../utils/apiRequest';
import { useDispatch } from 'react-redux';
import { setInitTime } from '../../../store/timeSlice';
import { header } from '../..';

//alertTime이랑 stretchingTime 가져오기
export const getAlarmTime = async (): Promise<object> => {
  
  return await apiRequest
    .get(`/api/v1/admin/alarm`,{ headers: header() })
    .then((res) => {
        const stretchingTime = res.data.result.stretchingTime;
        const alertTime = res.data.result.alertTime;
        const dispatch = useDispatch();
        sessionStorage.setItem('alertTime',alertTime);
        dispatch(setInitTime(stretchingTime));
        return { ...res.data.result.message };
    })
    .catch((err) => {
      return err;
    });
};