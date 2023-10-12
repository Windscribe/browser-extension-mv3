import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

import theme from 'styles'
import DebugLog from './DebugLog'
import proxyStore from 'pages/proxyStore'
import { pushToDebugLog } from 'services/debugLog'
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
      window.store = proxyStore
    }
  })
  .catch((err: object): void => {
    proxyStore.dispatch(
      pushToDebugLog({
        level: 'ERROR',
        message: 'Error while rendering Popup',
        data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      }),
    )
  })

/*
	@link https://webpack.js.org/concepts/hot-module-replacement/
	@link https://webpack.js.org/guides/hot-module-replacement
	Still don't understand do we really need it.
*/
// if (module.hot) module.hot.accept()
