import { header } from '../..';
import apiRequest from '../../../utils/apiRequest';

export const fetchProfile = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/user/${email}`, { headers: header() })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err));
};

export const confirmEmail = async (email: string): Promise<string> => {
  return await apiRequest
    .get(`api/v1/user/email-valid/${email}`)
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => {
      return Promise.resolve(err);
    });
};

export const checkEmail = async (email: string): Promise<boolean> => {
  return await apiRequest
    .get(`/api/v1/user/email-check/${email}`)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
