import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

import './index.css'
import theme from 'styles'
import Router from 'services/navigation/Router'
import proxyStore from 'pages/proxyStore'
import { pushToDebugLog } from 'services/debugLog'
import { AppWrapper, onBeforePopupRenders } from 'components'

proxyStore
  .ready()
  .then(() => onBeforePopupRenders(proxyStore))
  .then(() => {
    render(
      <ThemeProvider theme={theme}>
        <Provider store={proxyStore}>
          <AppWrapper>
            <Router />
          </AppWrapper>
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
    pushToDebugLog({
      level: 'ERROR',
      message: 'Error while rendering Popup',
      data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    })
  })

/*
	@link https://webpack.js.org/concepts/hot-module-replacement/
	@link https://webpack.js.org/guides/hot-module-replacement
	Still don't understand do we really need it.
*/
// if (module.hot) module.hot.accept()
