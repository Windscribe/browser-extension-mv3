import { type StoreType } from 'state/store'
import proxyError from 'services/proxyError'
import { pushToDebugLog } from 'state/slices/debugLog'

export function proxyErrorHandler(bgStore: Promise<StoreType>) {
  return async (e: chrome.proxy.ErrorDetails): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('%c onProxyError ', 'background: #d8dEd9; color: #EA222E', e)
    }

    const store = await bgStore

    store.dispatch(
      pushToDebugLog({
        level: 'ERROR',
        message: 'onProxyError',
        tag: 'background',
        data: e,
      }),
    )

    const errorChecking = store.getState().proxy.errorChecking
    const isConnected = store.getState().proxy.isConnected
    const isConnecting = store.getState().proxy.isConnecting

    const hasProxyError = !!store.getState().proxy.errorMessage

    const proxyFailure = isConnected && hasProxyError

    if (!errorChecking && !proxyFailure && isConnecting) {
      proxyError(store.dispatch)
    }
  }
}
