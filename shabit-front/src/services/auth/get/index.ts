import apiRequest from '../../../utils/apiRequest';

export const fetchProfile = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/user/${email}`)
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err));
};

export const confirmEmail = (email: string): object => {
  return {};
};

export const checkEmail = async (email: string): Promise<boolean> => {
  return await apiRequest
    .get(`/api/user/email-check/${email}`)
    .then((res) => {
      alert('사용가능한아이디입니다.');
      return Promise.resolve(res.data.result);
      // setMessage('사용가능한 아이디입니다.');
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err.data.result);
      // setMessage('중복된 아이디입니다.');
    });
  // return Promise.resolve(true);
};
