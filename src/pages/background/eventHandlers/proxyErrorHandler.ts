import { type StoreType } from 'state/store'
import { pushToDebugLog } from 'services/debugLog'
import { handleProxyError } from 'services/proxyConfig'
import { setStatus } from 'state/slices/proxy'

export function proxyErrorHandler(bgStore: Promise<StoreType>) {
  return async (e: chrome.proxy.ErrorDetails): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('%c onProxyError ', 'background: #d8dEd9; color: #EA222E', e)
    }

    const store = await bgStore

    pushToDebugLog({
      level: 'ERROR',
      message: 'onProxyError',
      tag: 'background',
      data: e,
    })

    const proxy = store.getState().proxy
    const isConnected = proxy.status === 'on'
    const isOnline = store.getState().isOnline
    const hasProxyError = !!proxy.errorMessage
    const reconnectionAttempts = proxy.reconnectionAttempts
    const proxyFailure = isConnected && hasProxyError
    const shouldIgnore = proxyFailure || !isConnected || reconnectionAttempts

    // do nothing when offline, no sense in recovering when offline
    if (!isOnline) {
      store.dispatch(setStatus('off'))
      pushToDebugLog({
        message: 'No internet connection, aborting',
      })
      return
    }

    if (!shouldIgnore) handleProxyError(store.getState, store.dispatch)
  }
}
