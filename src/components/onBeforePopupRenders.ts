import { type ProxyStore } from 'pages/proxyStore'
import { setView } from 'state/slices/view'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<void> {
  const sessionLoading = proxyStore.getState().session?.loading
  const sessionAuthHash = proxyStore.getState().session?.session_auth_hash

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    Promise.all([
      proxyStore.dispatch(setView('Home')),
      proxyStore.dispatch({ type: `alias/${CHECK_CURRENT_IP}` }),
    ])
  }
}
