import { type ProxyStore } from 'pages/proxyStore'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'
import { setView } from 'state/slices/view'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<unknown> {
  const sessionLoading = proxyStore.getState().session?.loading
  const sessionAuthHash = proxyStore.getState().session?.sessionData?.session_auth_hash

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    // ui does not need to wait/be blocked for this
    proxyStore.dispatch({ type: `alias/${CHECK_CURRENT_IP}` })
    return Promise.all([proxyStore.dispatch(setView('Home'))])
  }
}
