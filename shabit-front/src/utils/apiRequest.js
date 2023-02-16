import axios from 'axios';

const apiRequest = axios;

// apiRequest.defaults.baseURL = 'https://ia8601.p.ssafy.io:8081';

apiRequest.defaults.baseURL = 'https://shabit.site:8080';
apiRequest.defaults.withCredentials = true;

apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response.status;
    if (status < 400 || status > 500) alert('알 수 없는 오류가 발생했습니다');
    else if (status === 500) alert('서버에서 오류가 발생했습니다');
    if (error.response && error.response.data)
      return Promise.reject(error.response.data);
    else return Promise.reject(error.message);
  },
);
export default apiRequest;
