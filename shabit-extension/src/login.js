import apiRequest from './apiRequest'

export const header = () => {
  const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
  const header = { Authorization: `Bearer ${accessToken ? accessToken : ''}` }
  return header
}

export const login = async (email, password) => {
  return await apiRequest
    .post('/api/v1/user/login', { email, password })
    .then((res) => {
      const accessToken = res.data.result.token.accessToken
      const user = res.data.result.user
      sessionStorage.setItem('accessToken', JSON.stringify(accessToken))
      sessionStorage.setItem('user', JSON.stringify(user))
      return Promise.resolve({ user, accessToken })
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
