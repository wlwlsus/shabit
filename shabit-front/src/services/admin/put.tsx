import { header } from '..';
import store from '../../store';
import { setAlertTime, setStretchingTime } from '../../store/adminSlice';
import apiRequest from '../../utils/apiRequest';


interface AlarmTime {
  stretchingTime: Number,
  alertTime: number,
}

export const putAlarmTime = async (stretchingTime: Number, alertTime: number): Promise<AlarmTime> => {
  return await apiRequest.put("/admin/alarm", {stretchingTime, alertTime}, {headers : header()}).then(()=>{
  store.dispatch(setStretchingTime(stretchingTime))
  store.dispatch(setAlertTime(alertTime))
  return Promise.resolve({stretchingTime, alertTime})
}).catch(err=> Promise.reject(err))}

export default {putAlarmTime}