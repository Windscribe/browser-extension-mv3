import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

import './index.css'
import log from 'utils/log'
import theme from 'styles'
import Router from 'services/navigation/Router'
import proxyStore from './proxyStore'

proxyStore
  .ready()
  .then(() => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={proxyStore}>
          <Router />
        </Provider>
      </ThemeProvider>,
      window.document.querySelector('#app-container'),
    )
  })
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      type W = typeof window & {
        store: typeof proxyStore
      }
      ;(window as W).store = proxyStore
    }
  })
  .catch((err: unknown): void => {
    log('Error while rendering UI: ', err, 'error')
  })

/*
	@link https://webpack.js.org/concepts/hot-module-replacement/
	@link https://webpack.js.org/guides/hot-module-replacement
	Still don't understand do we really need it.
*/
// if (module.hot) module.hot.accept()
