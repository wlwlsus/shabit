import { header } from '..';
import store from '../../store';
import { setAlertTime, setStretchingTime } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';


interface AlarmTime {
  stretchingTime: Number,
  alertTime: number,
}

export const fetchAlarmTime = async (): Promise<AlarmTime> => {
  return await apiRequest.get("/admin/alarm", {headers : header()}).then((res)=>{
  const {stretchingTime, alertTime} = res.data.result
  store.dispatch(setStretchingTime(Number(stretchingTime)))
  store.dispatch(setAlertTime(Number(alertTime)))
  return Promise.resolve({setStretchingTime: Number(stretchingTime), alertTime: Number(alertTime)})
}).catch(err=> Promise.reject(err))
}


export const fetchVods = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/info/vods/${email}`, { headers: header() })
    .then((res) => {
      sessionStorage.setItem('vods', res.data.result);
      return { ...res.data.result };
    })
    .catch((err) => {
      return err;
    });
};

export default {fetchAlarmTime, fetchVods}