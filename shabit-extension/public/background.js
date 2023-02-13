// 로그인 요청
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

// 1초마다 갱신하는 알람
const timer = () => {
  chrome.alarms.create({
    periodInMinutes: 1 / 60,
  })
  chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.sync.get(['time'], (res) => {
      let time = res.time
      time.s += 1
      if (time.s === 59) {
        time.s = 0
        time.m += 1
      }
      if (time.m === 59) {
        time.m = 0
        time.h += 1
      }
      chrome.storage.sync.set({ time })
    })
  })
}

// 크롬브라우저 시작시 storage 초기화
chrome.runtime.onStartup.addListener(function () {
  chrome.storage.sync.clear()
  chrome.storage.sync.set({ time: { s: 0, m: 0, h: 0 } })
  chrome.storage.sync.set({ status: true })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 로그인
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

  // 시간
  if (request.action === 'getTime') {
    chrome.storage.sync.get('time', function (res) {
      sendResponse(res.time)
    })
    return true
  }

  // 상태 (pause or start)
  if (request.action === 'getStatus') {
    chrome.storage.sync.get('status', function (res) {
      sendResponse(res.status)
    })
    return true
  }

  // 타이머 start
  if (request.action === 'startTimer') {
    chrome.storage.sync.set({ status: true })
    timer()
    return true
  }

  // 타이머 pause
  if (request.action === 'pauseTimer') {
    chrome.storage.sync.set({ status: false })
    chrome.alarms.clearAll()
    return true
  }
})
