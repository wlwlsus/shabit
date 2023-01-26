import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

// import LandingPage from './pages/LandingPage';

import StartBtn from './components/molecules/StartBtn';
import { Route, Routes } from 'react-router-dom';
import HomeTest from './pages/HomeTest';
import LoginTest from './pages/LoginTest';
import RegisterTest from './pages/RegisterTest';
import MainTest from './pages/MainTest';
import ChartTest from './pages/ChartTest';
import VideoTest from './pages/VideoTest';
import NavTest from './pages/NavTest';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div
          className="App"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* <LandingPage /> */}
          {/* <StartBtn /> */}
          <NavTest></NavTest>
          <Routes>
            <Route path="/" element={<HomeTest></HomeTest>} />
            <Route path="/login" element={<LoginTest />} />
            <Route path="/register" element={<RegisterTest />} />
            <Route path="/main" element={<MainTest />} />
            <Route path="/main/chart" element={<ChartTest />} />
            <Route path="/main/video" element={<VideoTest />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
