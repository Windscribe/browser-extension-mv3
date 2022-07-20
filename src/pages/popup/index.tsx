import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../../theme'
import './index.css'
import log from 'utils/log'
import LoginPage from 'components/LoginPage'
import { ProxyStore } from 'state'
import browserApi from 'services/browserApi'
import { STORAGE_CACHE_VERSION, REACT_APP_REDUX_PORT, WAKE_UP_NEO } from 'utils/constants'

// Wake up background script and then initialize connection between ProxyStore and WrappedStore
browserApi.runtime.sendMessage({ type: WAKE_UP_NEO }, response => {
  log(response.type)

  const proxyStore: any = new ProxyStore({
    portName: REACT_APP_REDUX_PORT,
  })

  proxyStore.ready().then(() => {
    type AreaName = 'sync' | 'local' | 'managed'
    type Changes = { [key: string]: chrome.storage.StorageChange }

    const update = (changes: Changes, areaName: AreaName) => {
      const newState = changes[STORAGE_CACHE_VERSION].newValue
      proxyStore.replaceState(newState)
    }
    browserApi.subscribeOnStorageChange(update)

    render(
      <Provider store={proxyStore}>
        <ThemeProvider theme={theme}>
          <LoginPage />
        </ThemeProvider>
      </Provider>,
      window.document.querySelector('#app-container'),
    )
  })
})
/*
	@link https://webpack.js.org/concepts/hot-module-replacement/
	@link https://webpack.js.org/guides/hot-module-replacement
	Still don't understand do we really need it.
*/
// if (module.hot) module.hot.accept();
