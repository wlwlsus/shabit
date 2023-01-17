import React from 'react';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import Sidebar from './components/organisms/Sidebar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Sidebar></Sidebar>
      </div>
    </ThemeProvider>
  );
}

export default App;
