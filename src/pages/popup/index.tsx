import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

import './index.css'
import log from 'utils/log'
import theme from 'styles'
import { Router } from 'services/navigation'
import { ProxyStore } from 'state'
import browserApi from 'services/browserApi'
import { reset as resetView } from 'state/slices/view'
import { STORAGE_CACHE_VERSION, REACT_APP_REDUX_PORT, WAKE_UP_NEO } from 'utils/constants'

// Wake up background script and then initialize connection between ProxyStore and WrappedStore
browserApi.runtime.sendMessage({ type: WAKE_UP_NEO }, response => {
  log(response.type)

  const proxyStore = new ProxyStore({
    portName: REACT_APP_REDUX_PORT,
  })

  proxyStore
    .ready()
    .then(() => {
      type AreaName = 'sync' | 'local' | 'managed'
      type Changes = { [key: string]: chrome.storage.StorageChange }
      type Update = (changes: Changes, areaName?: AreaName) => void

      const update: Update = changes => {
        const newState = changes[STORAGE_CACHE_VERSION].newValue
        proxyStore.replaceState(newState)
      }
      browserApi.subscribeOnStorageChange(update)
      proxyStore.dispatch(resetView())

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
      //TODO if development
      type W = typeof window & {
        store: ProxyStore
      }
      ;(window as W).store = proxyStore
    })
    .catch((err: unknown): void => {
      log('Error while rendering UI: ', err, 'error')
    })
})

/*
	@link https://webpack.js.org/concepts/hot-module-replacement/
	@link https://webpack.js.org/guides/hot-module-replacement
	Still don't understand do we really need it.
*/
// if (module.hot) module.hot.accept()
