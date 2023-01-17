import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App" style={{ width: '100%', height: '100%' }}></div>
    </ThemeProvider>
  );
}

export default App;
