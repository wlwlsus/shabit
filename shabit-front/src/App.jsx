import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

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
              <LandingPage children={[<Introduction />, <StartForm />]} />
            }
          />
          <Route
            path="login"
            element={
              <LandingPage children={[<LandingContent />, <LoginForm />]} />
            }
          />
          <Route
            path="signup"
            element={
              <LandingPage children={[<LandingContent />, <SignupForm />]} />
            }
          />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/main" element={<MainPage />}>
            <Route path="" element={<MainContent />} />
            <Route path="history" element={<HistoryContent />} />
          </Route>
          <Route path="/posture" element={<PosturePage />}>
            <Route path="stretch" element={<StretchContent />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
