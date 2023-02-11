const authLogin = async (email, password) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
  try {
    const fetchesponse = await fetch(
      'https://shabit.site:8080/api/v1/user/login',
      settings
    )
    const data = await fetchesponse.json()
    return data
  } catch (err) {
    return err
  }
}

// ssafy1234@gmail.com

chrome.runtime.onStartup.addListener(function () {
  chrome.storage.sync.clear()
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'login') {
    const { email, password } = request.data
    authLogin(email, password)
      .then((res) => {
        const user = res.result.user
        chrome.storage.sync.set({ user })
        sendResponse('')
      })
      .catch((err) => {
        sendResponse(err.message)
      })
    return true
  }

  if (request.action === 'fetchUser') {
    const user = JSON.parse(sessionStorage.getItem('user'))
    sendResponse(user)
  }
})
