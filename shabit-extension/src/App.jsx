import { GlobalStyle, theme } from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { Router } from 'react-chrome-extension-router'

import Login from './components/Login'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle bg={theme.color.whiteColor} />
      <Router>
        <Login />
      </Router>
    </ThemeProvider>
  )
}

export default App
