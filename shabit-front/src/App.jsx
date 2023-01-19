import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div
        className="App"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;