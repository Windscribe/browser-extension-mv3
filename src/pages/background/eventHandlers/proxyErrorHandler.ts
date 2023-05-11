import { type StoreType } from 'state/store'
import { pushToDebugLog } from 'state/slices/debugLog'
import { handleProxyError } from 'state/slices/proxyErrorChecking'

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

    store.dispatch(handleProxyError())
  }
}
