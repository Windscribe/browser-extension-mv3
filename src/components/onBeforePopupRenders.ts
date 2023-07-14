import { type ProxyStore } from 'pages/proxyStore'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'
import { setView } from 'state/slices/view'
import { type RootState } from 'state/store'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<unknown> {
  const state = proxyStore.getState() as RootState
  const sessionLoading = state.session?.loading
  const sessionAuthHash = state.session?.sessionData?.session_auth_hash
  const notifications = state.newsfeed?.notifications
  const viewedNewsIds = state.newsfeed?.viewedNewsIds
  const firstInstallDate = state.firstInstallDate

  // accrue newsfeed items that have a "popup" key and have not been viewed
  const popUpItems = notifications.filter(({ id, popup }) => popup && !viewedNewsIds?.includes(id))
  // 5 minutes before now
  const cutoff = (Math.floor(Date.now() / 1000) - 300) * 1000
  // we have items that need to be viewed, show newsfeed
  const view = popUpItems.length > 0 && firstInstallDate < cutoff ? 'Newsfeed' : 'Home'

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    return Promise.all([
      proxyStore.dispatch({ type: `alias/${CHECK_CURRENT_IP}` }),
      proxyStore.dispatch(setView(view)),
    ])
  }
}
