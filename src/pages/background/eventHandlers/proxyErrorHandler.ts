import { type StoreType } from 'state/store'
import { pushToDebugLog } from 'services/debugLog'
import { handleProxyError } from 'services/proxyConfig'
import throttle from 'lodash.throttle'
import { THROTTLE_PROXY_ERROR_TIME_MS } from 'utils/constants'

const throttledHandleProxyError = throttle(
  async (e: chrome.proxy.ErrorDetails, bgStore: Promise<StoreType>): Promise<void> => {
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
      pushToDebugLog({
        level: 'ERROR',
        message: 'Offline, ignoring proxy error',
        tag: 'background',
        data: e,
      })
      return
    }

    if (!shouldIgnore) await handleProxyError(store.getState, store.dispatch)
  },
  THROTTLE_PROXY_ERROR_TIME_MS,
  // Run immediately and once more after throttling ends
  { leading: true, trailing: true },
)

export function proxyErrorHandler(bgStore: Promise<StoreType>) {
  return async (e: chrome.proxy.ErrorDetails): Promise<void> => {
    await throttledHandleProxyError(e, bgStore)
  }
}
