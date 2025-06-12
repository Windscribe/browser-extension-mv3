import UAParser from 'ua-parser-js'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button } from 'theme-ui'
import { clearLogDB, createLogDB } from 'services/storage'

import { AlignItemsCenter } from 'components/Flexbox'
import { useSelector } from 'state/hooks'
import './DebugLog.css'
import { LogItem } from 'utils/types'
import { handleDownloadLogs } from './handleDownload'
import { parseLogToStrings } from 'services/debugLog'
import { Dexie } from 'dexie'
import { useVirtualizer } from '@tanstack/react-virtual'

const DebugLog: React.FC = () => {
  const [isShowUserInfo, setIsShowUserInfo] = useState(false)

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
  const logContainerRef = useRef<HTMLDivElement>(null)

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

[Migration Logs]

${
  migrations.migrations.length > 0
    ? JSON.stringify(migrations.migrations, undefined, 2)
    : 'No migration logs found'
}
`

  const header = `${userInfo}\n\n[Start of log]\n------------------------------------------------------\n`
  const [logs, setLogs] = useState<(LogItem & { header?: string })[]>([
    {
      header,
      message: '',
    },
  ])

  useEffect(() => {
    const fetchLogs = async () => {
      const logDB = await createLogDB()
      if (logDB instanceof Dexie) {
        // IndexedDB path
        const debugLog = await logDB.table('logs').toArray()
        setLogs([
          {
            header,
            message: '',
          },
          ...debugLog,
        ])
      } else {
        // Chrome storage path
        const data = await logDB.get('debugLog')
        const debugLog = data?.debugLog ?? []
        setLogs([
          {
            header,
            message: '',
          },
          ...debugLog,
        ])
      }
    }

    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run only on mount

  const count = logs.length
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => logContainerRef.current,
    estimateSize: () => 30,
    overscan: 4,
    gap: 2,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <Box
      data-testid="debug-page"
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <AlignItemsCenter
        sx={{
          height: '50px',
          backgroundColor: 'darkBackground',
          color: 'primaryText',
          width: '100%',
          px: '10px',
          gap: '12px',
          position: 'fixed',
          zIndex: 10,
        }}
      >
        <span sx={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Debug Log</span>
        <Button
          variant="debug"
          onClick={() => {
            clearLogDB()

            setLogs([
              {
                header: `${userInfo}\n\n[Start of log]\n------------------------------------------------------\n`,
                message: '',
              },
            ])
            virtualizer.scrollToIndex(0, { align: 'start' })
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
        <Button
          variant="debug"
          onClick={() => handleDownloadLogs(userInfo, parseLogToStrings(logs.slice(1)).join(''))}
        >
          Download Logs
        </Button>
      </AlignItemsCenter>

      <Button
        sx={{
          cursor: 'pointer',
          backgroundColor: 'darkBackground',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: '60px', //48 + 8 margin for the button below
          width: 150,
          zIndex: 20,
          right: '24px',
          ':hover': {
            backgroundColor: 'lakeBlue',
            color: 'primaryText',
          },
        }}
        onClick={() => {
          virtualizer.scrollToIndex(0, { align: 'start' })
        }}
      >
        Scroll To Top
      </Button>

      <Button
        sx={{
          cursor: 'pointer',
          backgroundColor: 'darkBackground',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: '24px',
          right: '24px',
          width: 150,
          zIndex: 20,
          ':hover': {
            backgroundColor: 'lakeBlue',
            color: 'primaryText',
          },
        }}
        onClick={() => {
          virtualizer.scrollToIndex(count - 1, { align: 'start' })
        }}
      >
        Scroll To Bottom
      </Button>

      <Box
        ref={logContainerRef}
        sx={{
          p: '18px',
          fontSize: '16px',
          lineHeight: '30px',
          marginTop: '50px',
          height: 'calc(100vh - 50px)', // Subtract header height
          overflowY: 'auto',
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {items.map(virtualRow => {
              if (logs[virtualRow.index]?.header) {
                return (
                  <div
                    key={virtualRow.key.toString()}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    sx={{ whiteSpace: 'pre', display: 'flex' }}
                  >
                    {userInfo}
                    {`\n\n[Start of log]\n------------------------------------------------------\n`}
                  </div>
                )
              } else {
                const { date, tag, level, message, data } = logs[virtualRow.index]
                const levelColor = level === 'INFO' ? 'green' : level === 'ERROR' ? 'red' : 'yellow'
                return (
                  <div
                    key={virtualRow.key.toString()}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    sx={{ gap: 2, whiteSpace: 'pre', display: 'flex' }}
                  >
                    <span>{date}</span>
                    <span>
                      <span>[</span>
                      <span sx={{ color: levelColor, fontWeight: 'bold' }}>{level}</span>
                      <span>]</span>
                    </span>
                    <span>[{tag}]</span>
                    <span>{message}</span>
                    {data ? <span>{JSON.stringify(data)}</span> : null}
                  </div>
                )
              }
            })}

            {/* accounts for the header */}
            {items.length === 1 && (
              <div>
                <span>No logs found</span>
              </div>
            )}
          </div>
        </div>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
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
          zIndex: 25,
          transform: isShowUserInfo ? 'translateX(0)' : 'translateX(110%)',
          overflowY: 'auto',
        }}
        data-testid="user-info-panel"
      >
        {userInfo}
      </Box>
    </Box>
  )
}

export default DebugLog
