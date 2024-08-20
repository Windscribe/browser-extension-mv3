import { RootState } from 'state'
import UAParser from 'ua-parser-js'

export const generateLogHeaders = (state: RootState): string => {
  const parser = new UAParser(navigator.userAgent)
  const userInfo = `[DeviceInfo]
------------------------------------------------------
[OS]: ${navigator.userAgent}
[UserAgent OS]: ${parser.getOS().name} ${parser.getOS().version}
[UserAgent Browser]: ${parser.getBrowser().name} ${parser.getBrowser().version}
[Build Version]: ${chrome.runtime.getManifest().version + '-' + COMMIT_HASH}

[User State]
------------------------------------------------------

autoConnectAfterLogin: ${state.autoConnectAfterLogin}
locationLoad: ${state.locationLoad}
contextMenu: ${state.contextMenu}
allowSystemNotifications: ${state.allowSystemNotifications}
smokeWall:  ${state.connection.smokeWall}
autoConnect:  ${state.connection.autoConnect}
failover:  ${state.connection.failover}
proxyPort:  ${state.connection.smokeWall}
blocker:  ${state.blocker.blockLists}
languageWarpEnabled:  ${state.languageWarpEnabled}
locationWarp:  ${state.locationWarp}
workerBlock:  ${state.workerBlock}
timeWarpEnabled:  ${state.timeWarpEnabled}
webRtcEnabled:  ${state.webRtcEnabled}
splitPersonalityEnabled:  ${state.splitPersonalityEnabled}
notificationBlockerEnabled:  ${state.notificationBlockerEnabled}
adPrivacyEnabled:  ${state.adPrivacyEnabled}
theme: ${state.theme.value}
`
  return userInfo
}
