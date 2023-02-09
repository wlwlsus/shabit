import axios from 'axios'

const apiRequest = axios

apiRequest.defaults.baseURL = 'https://shabit.site:8080'
apiRequest.defaults.withCredentials = true

apiRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response.status
    if (status === 400) alert('잘못된 형식의 요청입니다')
    else if (status === 401) alert('로그인 후 진행해주세요')
    else if (status === 500) alert('서버에서 오류가 발생했습니다')
    else if (status !== 200) alert('알 수 없는 오류가 발생했습니다')
    return Promise.reject(error)
  }
)

export default apiRequest
