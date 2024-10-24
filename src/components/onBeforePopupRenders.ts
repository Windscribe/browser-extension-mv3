import { type ProxyStore } from 'pages/proxyStore'
import { removeOverlay } from 'state/slices/overlay'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'
import { setView } from 'state/slices/view'
import { CONTENT_SETTINGS } from 'utils/constants'

export async function onBeforePopupRenders(proxyStore: ProxyStore): Promise<void> {
  const sessionLoading = proxyStore.getState().session?.loading
  const sessionAuthHash = proxyStore.getState().session?.sessionData?.session_auth_hash

  const permissions = proxyStore.getState().permissions.grantedPermissions

  if (sessionAuthHash && sessionLoading === 'fulfilled') {
    // ui does not need to wait/be blocked for this
    proxyStore.dispatch({ type: `alias/${CHECK_CURRENT_IP}` })
    proxyStore.dispatch(setView('Home'))
    // popup closing due to permision woes
    if (!permissions.includes(CONTENT_SETTINGS)) {
      proxyStore.dispatch(removeOverlay('notificationBlockerPermission'))
    }
    return
  }
}
