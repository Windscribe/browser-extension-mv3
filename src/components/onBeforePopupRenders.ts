import { type ProxyStore } from 'pages/proxyStore'
import { setView } from 'state/slices/view'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<void> {
  const sessionLoading = proxyStore.getState().session?.loading
  const sessionAuthHash = proxyStore.getState().session?.session_auth_hash

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    await proxyStore.dispatch(setView('Home'))
  }
}
