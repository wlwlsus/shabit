import React, { useState, useEffect } from 'react';
import {
  GlobalStyle,
  pinkTheme,
  blueTheme,
  darkTheme,
  greenTheme,
} from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
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
import AnalyzeContent from './components/Main/AnalyzeContent';

import PosturePage from './pages/PosturePage';
import LiveContent from './components/Posture/LiveContent';
import StretchContent from './components/Posture/StretchContent';

import AdminPage from './pages/AdminPage';
import { Recording } from './components/Posture/Recording';

import NotFound404 from './pages/NotFound404';

import Redirect from './components/OAuth/Redirect';

function App() {
  const [theme, setTheme] = useState(pinkTheme);
  const themeList = [pinkTheme, darkTheme, blueTheme, greenTheme];

  useEffect(() => {
    const themeInfo = localStorage.getItem('theme');
    if (!themeInfo) return;
    setTheme(themeList[themeInfo]);
  }, []);

  return (
    <Provider store={store}>
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
            <Route path="analyze" element={<AnalyzeContent />} />
          </Route>
          <Route
            path="/posture"
            element={<PrivateRoute component={<PosturePage />} />}
          >
            <Route path="live" element={<LiveContent />} />
            <Route path="stretch" element={<StretchContent />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/oauth/redirect" element={<Redirect />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
