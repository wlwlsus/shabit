import apiRequest from '../../../utils/apiRequest';

export const fetchProfile = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/user/${email}`)
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err));
};

export const confirmEmail = (email: string): object => {
  return {};
};

export const checkEmail = (email: string): Promise<boolean> => {
  return Promise.resolve(true);
};
