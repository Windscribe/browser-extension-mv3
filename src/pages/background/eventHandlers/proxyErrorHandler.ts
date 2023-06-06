import { type StoreType } from 'state/store'
import { pushToDebugLog } from 'state/slices/debugLog'
import { handleProxyError } from 'state/slices/proxy'

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

    const proxy = store.getState().proxy
    const errorChecking = proxy.errorChecking
    const isConnected = proxy.isConnected
    const hasProxyError = !!proxy.errorMessage
    const reconnectionAttempts = proxy.reconnectionAttempts
    const proxyFailure = isConnected && hasProxyError
    const shouldIgnore = errorChecking || proxyFailure || !isConnected || reconnectionAttempts

    if (!shouldIgnore) handleProxyError(store.dispatch, store.getState)
  }
}
