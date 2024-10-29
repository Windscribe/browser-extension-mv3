import UAParser from 'ua-parser-js'
import React, { useEffect, useState } from 'react'
import { Box, Button } from 'theme-ui'
import { clearLogDB, getStorage } from 'services/storage'

// import { ToggleSwitch } from 'components'
import { AlignItemsCenter } from 'components/Flexbox'
import { useSelector } from 'state/hooks'
import { parseLogToStrings } from 'services/debugLog'
import './DebugLog.css'

const DebugLog: React.FC = () => {
  // const [isAutoScroll, setIsAutoScroll] = useState(false)
  const [isShowUserInfo, setIsShowUserInfo] = useState(false)
  const [parsedLog, setParsedLog] = useState([''])

  const autoConnect = useSelector(s => s.connection.autoConnect)
  const allowSystemNotifications = useSelector(s => s.allowSystemNotifications)
  const locationLoad = useSelector(s => s.locationLoad)
  const contextMenu = useSelector(s => s.contextMenu)
  const smokewall = useSelector(s => s.connection.smokeWall)
  const failover = useSelector(s => s.connection.failover)
  const proxyPort = useSelector(s => s.proxyPort)
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const locationWarp = useSelector(s => s.locationWarp)
  const languageWarpEnabled = useSelector(s => s.languageWarpEnabled)
  const timeWarpEnabled = useSelector(s => s.timeWarpEnabled)
  const splitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const workerBlockEnabled = useSelector(s => s.workerBlock)
  const migrations = useSelector(s => s.migrations)

  const parser = new UAParser(navigator.userAgent)

  const userInfo = `[DeviceInfo]
------------------------------------------------------
[OS]: ${navigator.userAgent}
[UserAgent OS]: ${parser.getOS().name} ${parser.getOS().version}
[UserAgent Browser]: ${parser.getBrowser().name} ${parser.getBrowser().version}
[Extension]:  ${chrome.runtime.getManifest().version_name ?? chrome.runtime.getManifest().version}

[User State]
------------------------------------------------------
Auto-connect: ${autoConnect}
Notification: ${allowSystemNotifications}
Show Location Load: ${locationLoad}
Debug Context Menu: ${contextMenu}

Smokewall: ${smokewall}
Failover: ${failover}
Proxy Port: ${proxyPort}

Do Not Disturb: ${notificationBlockerEnabled}
WebRTC Slayer: ${webRtcEnabled}
Location Warp: ${locationWarp}
Time Warp: ${timeWarpEnabled}
Language Warp: ${languageWarpEnabled}
Spilt Personality: ${splitPersonalityEnabled}
Worker Block: ${workerBlockEnabled}
Build Version: ${
    (chrome.runtime.getManifest().version_name ?? chrome.runtime.getManifest().version) +
    '-' +
    COMMIT_HASH
  }

------------------------------------------------------

Migration Logs

${
  migrations.migrations.length > 0
    ? JSON.stringify(migrations.migrations, undefined, 2)
    : 'No migration logs found'
}
`

  useEffect(() => {
    getStorage().then(debugLog => {
      debugLog && setParsedLog(parseLogToStrings(debugLog))
    })
  }, [])

  return (
    <Box data-testid="debug-page">
      <AlignItemsCenter
        sx={{
          height: '50px',
          backgroundColor: 'background',
          color: 'primaryText',
          width: '100%',
          px: '10px',
          gap: '24px',
        }}
      >
        {/* <Label sx={{ alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          Toggle Autoscroll
          <ToggleSwitch onChange={() => setIsAutoScroll(!isAutoScroll)} />
        </Label> */}
        <Button
          variant="debug"
          onClick={() => {
            clearLogDB()
            setParsedLog([''])
          }}
        >
          Clear Log
        </Button>
        <Button
          variant="debug"
          data-testid="user-info-button"
          onClick={() => setIsShowUserInfo(!isShowUserInfo)}
        >
          Show User Info
        </Button>
      </AlignItemsCenter>
      <Button
        sx={{
          cursor: 'pointer',
          backgroundColor: 'background',
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          ':hover': {
            backgroundColor: 'lakeBlue',
            color: 'primaryText',
          },
        }}
        onClick={() => {
          window.scrollTo(0, document.body.scrollHeight)
        }}
      >
        Scroll To Bottom
      </Button>
      <Box sx={{ whiteSpace: 'pre', p: '18px', fontSize: '16px', lineHeight: '30px' }}>
        {userInfo}
        {`\n\n[Start of log]\n------------------------------------------------------\n`}
        {parsedLog}
      </Box>
      <Box
        sx={{
          backgroundColor: 'primaryText',
          position: 'fixed',
          height: '100vh',
          width: '500px',
          top: '0',
          right: '0',
          whiteSpace: 'pre-wrap',
          p: '18px',
          fontSize: '16px',
          lineHeight: '30px',
          boxShadow: '2px 0 30px rgb(0 0 0 / 10%)',
          transition: 'transform ease 0.3s',
          transform: isShowUserInfo ? 'translateX(0)' : 'translateX(110%)',
        }}
        data-testid="user-info-panel"
      >
        {userInfo}
      </Box>
    </Box>
  )
}

export default DebugLog
