import apiRequest from '../../../utils/apiRequest';

const header = {
  Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
};

export const fetchProfile = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/user/${email}`, { headers: header })
    .then((res) => {
      return Promise.resolve(res.data.result);
    })
    .catch((err) => Promise.reject(err));
};

export const confirmEmail = (email: string): object => {
  return {};
};

//임시 해더
export const checkEmail = async (email: string): Promise<boolean> => {
  console.log(header);
  return await apiRequest
    .get(`/api/v1/user/email-check/${email}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeTEyM0BnbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc0Nzk1MTU5fQ.FSjfMQSS7gnSeqUjDXuhuGRdq9nj_kBwzj8SVLBdRhU',
      },
    })
    .then((res) => {
      console.log(res);
      return Promise.resolve(res);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  // return Promise.resolve(true);
};
