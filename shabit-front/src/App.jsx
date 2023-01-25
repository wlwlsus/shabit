import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Navbar from './components/organisms/Navbar';
import Introduction from './components/organisms/Introduction';
import LandingContent from './components/organisms/LandingContent';
import StartForm from './components/organisms/StartForm';
import SignupForm from './components/organisms/SignupForm';
import LoginForm from './components/organisms/LoginForm';

import MainPage from './pages/MainPage';
import MainContent from './components/organisms/MainContent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              children={[<Navbar />, <Introduction />, <StartForm />]}
            />
          }
        />
        <Route
          path="login"
          element={
            <LandingPage
              children={[<Navbar />, <LandingContent />, <LoginForm />]}
            />
          }
        />
        <Route
          path="signup"
          element={
            <LandingPage
              children={[<Navbar />, <LandingContent />, <SignupForm />]}
            />
          }
        />
        <Route path="/main" element={<MainPage />}>
          <Route path="" element={<MainContent />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
