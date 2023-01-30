import apiRequest from '../../../utils/apiRequest';

const accessToken = localStorage.getItem('accessToken');
console.log(accessToken);
const header = {
  Authorization: `Bearer ${accessToken ? accessToken : ''}`,
};

export const fetchProfile = async (email: string): Promise<object> => {
  return await apiRequest
    .get(`/api/v1/user/${email}`, { headers: header })
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

//수정할거: 임시 해더
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
