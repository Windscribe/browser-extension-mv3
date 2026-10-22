import type { AppDispatch, GetState } from 'state/store'
import { disconnect } from 'services/proxyConfig'
import { pushToDebugLog } from 'services/debugLog'
import { getConnectedThisSession, setConnectedThisSession } from 'services/connectedThisSession'

const extensionLifecycleReasons = new Set<chrome.runtime.OnInstalledReason>([
  chrome.runtime.OnInstalledReason.INSTALL,
  chrome.runtime.OnInstalledReason.UPDATE,
  chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE,
])

export const checkSessionReconnect = async (
  getState: GetState,
  dispatch: AppDispatch,
  installReason: chrome.runtime.OnInstalledReason | undefined,
): Promise<void> => {
  const autoConnect = getState().connection.autoConnect
  const proxyStatus = getState().proxy.status
  const connectedThisSession = await getConnectedThisSession()
  const isExtensionLifecycle =
    installReason !== undefined && extensionLifecycleReasons.has(installReason)
  const connectedOrConnecting = proxyStatus === 'on' || proxyStatus === 'connecting'

  let disconnected = false

  if (isExtensionLifecycle && connectedOrConnecting) {
    await setConnectedThisSession()
  }

  if (!autoConnect && !connectedThisSession && !isExtensionLifecycle && connectedOrConnecting) {
    await disconnect(getState, dispatch, false)
    disconnected = true
  }

  await pushToDebugLog({
    message: 'session reconnect check',
    tag: 'background',
    level: 'INFO',
    data: {
      autoConnect,
      proxyStatus,
      connectedThisSession,
      installReason: installReason ?? null,
      disconnected,
    },
  })
}
