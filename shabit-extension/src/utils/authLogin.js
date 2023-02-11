import apiRequest from './apiRequest'

export const authLogin = async (email, password) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken
      const user = res.data.result.user
      return Promise.resolve({ user, accessToken })
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
