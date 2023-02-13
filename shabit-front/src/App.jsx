import React, { useState, useEffect } from 'react';
import {
  GlobalStyle,
  pinkTheme,
  blueTheme,
  darkTheme,
  greenTheme,
} from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './utils/PrivateRoute';

import LandingPage from './pages/LandingPage';
import Introduction from './components/Landing/Introduction';
import LandingContent from './components/Landing/LandingContent';
import StartForm from './components/Landing/StartForm';
import SignupForm from './components/Landing/SignupForm';
import LoginForm from './components/Landing/LoginForm';

import MainPage from './pages/MainPage';
import MainContent from './components/Main/MainContent';
import HistoryContent from './components/Main/HistoryContent';
import GoalContent from './components/Main/GoalContent';
import GalleryContent from './components/Main/GalleryContent';

import PosturePage from './pages/PosturePage';
import LiveContent from './components/Posture/LiveContent';
import StretchContent from './components/Posture/StretchContent';

import AdminPage from './pages/AdminPage';

import NotFound404 from './pages/NotFound404';

import Redirect from './components/OAuth/Redirect';
import AdminRoute from './utils/AdminRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminVideoContainer from './components/Admin/AdminVideoContainer';
import AdminSettingsContainer from './components/Admin/AdminSettingsContainer';
import jwtDecode from 'jwt-decode';
import { setIsAdminState, setTokenState } from './store/authSlice';
import { fetchProfile } from './services/auth/get';
import { refreshLogin } from './services/auth/post';
import { fetchAlarmTime } from './services/admin/get';

function App() {
  const [theme, setTheme] = useState(pinkTheme);
  const themeList = [pinkTheme, darkTheme, blueTheme, greenTheme];
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const themeInfo = localStorage.getItem('theme');
    if (!themeInfo) return;
    setTheme(themeList[themeInfo]);
  }, []);

  //최초 접속시에 실행되는 자동 로그인 로직입니다.
  // (1) 리덕스 스토어에 토큰과 유저정보가 있는지 확인합니다.
  const accessToken = store.getState().auth.accessToken;
  const currentUserEmail = store.getState().auth.user.email;
  useEffect(() => {
    const loginCheck = async () => {
      // (2) 스토어에 유저정보가 있다면 이미 로그인 된 것으로 판단합니다.
      if (currentUserEmail) return;
      // (3) 스토어에 유저 정보가 없으면
      let newToken = accessToken;
      let isAutoLogin = false;
      // (4) sessionStorage 토큰을 가져옵니다.
      if (!newToken)
        newToken = JSON.parse(sessionStorage.getItem('accessToken'));
      // (5) sessionStorage 토큰이 없으면
      if (!newToken) {
        // (6) localStorage 토큰을 가져오고 sessionStorage를 업데이트 합니다.
        newToken = JSON.parse(localStorage.getItem('accessToken'));
        newToken = sessionStorage.setItem(
          'accessToken',
          JSON.stringify(newToken),
        );
        sessionStorage.setItem(
          'refreshToken',
          localStorage.getItem('refreshToken'),
        );
        // (7) 또한 localStorage 토큰을 가져왔다면 자동로그인중인 것으로 플래그합니다.
        isAutoLogin = true;
      }
      //(추가) 토큰이 없으면 로그인 로직을 중단합니다.
      if (!newToken) return;
      const { sub, auth } = jwtDecode(newToken);
      try {
        // (8) 가져온 토큰으로 유저 정보를 불러오는 요청을 실행합니다.
        await fetchProfile(sub).catch(() => {
          // (9) 만일 유저 정보를 불러오는 요청이 실패하였고, 자동로그인 중이었다면(즉, 로컬 스토리지에서 가져온 토큰이었다면)
          if (!isAutoLogin) return;
          const currentRefreshToken = JSON.parse(
            localStorage.getItem('refreshToken'),
          );
          // (10) 토큰을 리프레시하고 다시 유저정보를 불러오는 요청을 합니다.
          refreshLogin(newToken, currentRefreshToken).then(() => {
            fetchProfile(sub);
          });
        });
        //(추가) 토큰을 리덕스에 저장합니다.
        store.dispatch(setTokenState(newToken));
        // (11) 토큰에 auth가 관리자라면 유저 정보에 관리자임을 업데이트합니다.
        fetchAlarmTime();
        if (auth === 'ROLE_ADMIN') {
          store.dispatch(setIsAdminState(true));
        } else store.dispatch(setIsAdminState(false));
        if (['/', '/login', 'signup'].includes(location.pathname))
          navigate('/main');
        return;
        // store.getState().chart;
      } catch (error) {
        return Promise.reject(error);
        // (12) 로그인이 실패하였을 때에 처리할 로직은 이곳에서 처리하면 됩니다.
      }
    };
    loginCheck();
  });

  return (
    <Provider store={store}>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <GlobalStyle color={theme.color.primary} bg={theme.color.secondary} />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage content={<Introduction />} form={<StartForm />} />
            }
          />
          <Route
            path="login"
            element={
              <LandingPage content={<LandingContent />} form={<LoginForm />} />
            }
          />
          <Route
            path="signup"
            element={
              <LandingPage content={<LandingContent />} form={<SignupForm />} />
            }
          />
          <Route
            path="/main"
            element={<PrivateRoute component={<MainPage />} />}
          >
            <Route path="" element={<MainContent setTheme={setTheme} />} />
            <Route path="history" element={<HistoryContent />} />
            <Route path="goal" element={<GoalContent />} />
            <Route path="gallery" element={<GalleryContent />} />
          </Route>
          <Route
            path="/posture"
            element={<PrivateRoute component={<PosturePage />} />}
          >
            <Route path="live" element={<LiveContent />} />
            <Route path="stretch" element={<StretchContent />} />
          </Route>
          <Route path="/oauth/redirect" element={<Redirect />} />
          <Route
            path="/admin"
            element={<AdminRoute component={<AdminPage />} />}
          >
            <Route path="" element={<AdminVideoContainer />} />
            <Route path="settings" element={<AdminSettingsContainer />} />
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
