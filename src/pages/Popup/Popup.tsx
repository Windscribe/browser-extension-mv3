import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import './Popup.css'
import SplashPage from '../../components/SplashPage'

const Popup = () => {
  return (
    <ThemeProvider theme={theme}>
      <SplashPage />
    </ThemeProvider>
  )
}

export default Popup

import SplashPage from '../../components/SplashPage'
  return <SplashPage />