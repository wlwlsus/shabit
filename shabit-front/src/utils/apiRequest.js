import axios from 'axios';

// // #### 임시용 목업 API입니다.
// const apiRequest = {
//   get(...any) {
//     return Promise.resolve({
//       msg: '성공',
//       accessToken: '엑세스토큰',
//       refreshToken: '리프레시토큰',
//       result: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//         accessToken: '엑세스토큰',
//         refreshToken: '리프레시토큰',
//         code: '1234',
//       },
//       imageUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHz8RxGs2mmAgFDQiPHEpbSHG86OCq-hQRwRN9og9Y2-9smFKbj2DspMmm4AW2aD8Zo8&usqp=CAU',
//       user: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//       },
//     });
//   },
//   put(...any) {
//     return Promise.resolve({
//       msg: '성공',
//       accessToken: '엑세스토큰',
//       refreshToken: '리프레시토큰',
//       result: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//         accessToken: '엑세스토큰',
//         refreshToken: '리프레시토큰',
//         code: '1234',
//         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHz8RxGs2mmAgFDQiPHEpbSHG86OCq-hQRwRN9og9Y2-9smFKbj2DspMmm4AW2aD8Zo8&usqp=CAU',
//       },
//       user: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//       },
//     });
//   },
//   post(...any) {
//     return Promise.resolve({
//       msg: '성공',
//       accessToken: '엑세스토큰',
//       refreshToken: '리프레시토큰',
//       result: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//         accessToken: '엑세스토큰',
//         refreshToken: '리프레시토큰',
//         code: '1234',
//       },
//       imageUrl:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnHz8RxGs2mmAgFDQiPHEpbSHG86OCq-hQRwRN9og9Y2-9smFKbj2DspMmm4AW2aD8Zo8&usqp=CAU',
//       user: {
//         email: 'ssafy@ssafy.com',
//         nickname: 'ssafy',
//         color: 'default',
//         image: 'default',
//       },
//     });
//   },
//   patch(...any) {
//     return Promise.resolve({ msg: '가짜API 성공' });
//   },
//   delete(...any) {
//     return Promise.resolve({ msg: '가짜api성공' });
//   },
// };

// export default apiRequest;

// #### 아래가 우리가 실제로 쓸 API입니다. ####
// axios.defaults.withCredentials = true;
// const apiRequest = axios;
const apiRequest = axios;
// // .create({ baseURL: 'http://localhost:8080' });
// apiRequest.defaults.baseURL = 'http://localhost:8080';
apiRequest.defaults.withCredentials = true;

apiRequest.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: { Authorization: window.localStorage.getItem('userToken') },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiRequest.interceptors.response.use(
  (response) => {
    if (response.status === 400) alert('잘못된 형식의 요청입니다');
    else if (response.status === 401) alert('로그인 후 진행해주세요');
    else if (response.status === 500) alert('서버에서 오류가 발생했습니다');
    else if (response.status !== 200) alert('알 수 없는 오류가 발생했습니다');
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  },
);

export default apiRequest;
