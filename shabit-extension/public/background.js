const authLogin = (email, password) => {
  const URL = 'https://shabit.site:8080/api/v1/user/login'
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  }
  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'login') {
    const { email, password } = request.data
    authLogin(email, password)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        sendResponse(err)
      })
  }
})
