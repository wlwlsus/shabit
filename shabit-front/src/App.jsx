import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Introduction from './components/Landing/Introduction';
import LandingContent from './components/Landing/LandingContent';
import StartForm from './components/Landing/StartForm';
import SignupForm from './components/Landing/SignupForm';
import LoginForm from './components/Landing/LoginForm';

import MainPage from './pages/MainPage';
import MainContent from './components/Main/MainContent';
import { Provider } from 'react-redux';
import store from './store';

import PosturePage from './pages/PosturePage';

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
          <Route path="/main" element={<MainPage />}>
            <Route path="" element={<MainContent />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
