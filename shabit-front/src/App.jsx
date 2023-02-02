import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
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

import PosturePage from './pages/PosturePage';
import StretchContent from './components/Posture/StretchContent';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
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
            <Route path="" element={<MainContent />} />
            <Route path="history" element={<HistoryContent />} />
          </Route>
          <Route
            path="/posture"
            element={<PrivateRoute component={<PosturePage />} />}
          >
            <Route path="stretch" element={<StretchContent />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
