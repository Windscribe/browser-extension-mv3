import { type ProxyStore } from 'pages/proxyStore'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<void> {
  const sessionLoading = proxyStore.getState().session?.loading
  const sessionAuthHash = proxyStore.getState().session?.sessionData?.session_auth_hash

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    Promise.all([proxyStore.dispatch({ type: `alias/${CHECK_CURRENT_IP}` })])
  }
}
