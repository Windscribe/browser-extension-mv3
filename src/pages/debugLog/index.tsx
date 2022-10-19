import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'theme-ui'
import theme from 'styles'
import DebugLog from './DebugLog'
import { Provider } from 'react-redux'
import { Router } from 'services/navigation'
import { ProxyStore } from 'state'
import { REACT_APP_REDUX_PORT } from 'utils/constants'
import log from 'utils/log'

const proxyStore = new ProxyStore({
  portName: REACT_APP_REDUX_PORT,
})

// render(
//   <ThemeProvider theme={theme}>
//     <Provider store={proxyStore}>
//       <DebugLog />
//     </Provider>
//   </ThemeProvider>,
//   window.document.querySelector('#app-container'),
// )

proxyStore
  .ready()
  .then(() => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={proxyStore}>
          <DebugLog />
        </Provider>
      </ThemeProvider>,
      window.document.querySelector('#app-container'),
    )
  })
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      type W = typeof window & {
        store: ProxyStore
      }
      ;(window as W).store = proxyStore
    }
  })
  .catch((err: unknown): void => {
    log('Error while rendering UI: ', err, 'error')
  })

// if (module.hot) module.hot.accept()
