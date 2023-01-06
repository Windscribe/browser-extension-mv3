import UAParser from 'ua-parser-js'
import React, { useEffect, useState } from 'react'
import { Box, Button, Label, Select, Text } from 'theme-ui'

import { ToggleSwitch } from 'components'
import { AlignItemsCenter } from 'components/Flexbox'
import { useSelector, useDispatch } from 'state/hooks'
import { clearDebugLog, parseLogToStrings } from 'state/slices/debugLog'
import type { LogItem, LogLevel, LogTag } from 'utils/types'
import './DebugLog.css'

type OrAny<T> = T | 'any'

const DebugLog: React.FC = () => {
  const dispatch = useDispatch()
  const log = useSelector(s => s.debugLog)
  const autoConnect = useSelector(s => s.connection.autoConnect)
  const contextMenu = useSelector(s => s.contextMenu)

  const failover = useSelector(s => s.connection.failover)
  const [isAutoScroll, setIsAutoScroll] = useState(false)
  const [isShowUserInfo, setIsShowUserInfo] = useState(false)
  const [tagOption, setTagOption] = useState<OrAny<LogTag>>('any')
  const [levelOption, setLevelOption] = useState<OrAny<LogLevel>>('any')
  const [parsedLog, setParsedLog] = useState<string[]>([])

  const parser = new UAParser(navigator.userAgent)

  const userInfo = `[DeviceInfo]
------------------------------------------------------
[OS]: ${navigator.userAgent}
[UserAgent OS]: ${parser.getOS().name} ${parser.getOS().version}
[UserAgent Browser]: ${parser.getBrowser().name} ${parser.getBrowser().version}
[Extension]:  ${chrome.runtime.getManifest().version}

[User State]
------------------------------------------------------
Auto-connect: ${autoConnect}
Debug Context Menu: ${contextMenu}
Failover: ${failover}`

  useEffect(() => {
    if (isAutoScroll) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [isAutoScroll, log])

  useEffect(() => {
    let filteredLog: LogItem[] = log
    if (tagOption != 'any') {
      filteredLog = filteredLog.filter(logItem => logItem.tag === tagOption)
    }
    if (levelOption != 'any') {
      filteredLog = filteredLog.filter(logItem => logItem.level === levelOption)
    }
    setParsedLog(parseLogToStrings(filteredLog))
  }, [log, tagOption, levelOption])

  const handleTagFilterChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setTagOption(e.target.value as LogTag)
  }

  const handleLevelFilterChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setLevelOption(e.target.value as LogLevel)
  }

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
        <Label sx={{ alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          Toggle Autoscroll
          <ToggleSwitch onChange={() => setIsAutoScroll(!isAutoScroll)} />
        </Label>
        <Button variant="debug" onClick={() => dispatch(clearDebugLog())}>
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
        <Box mt="24px">
          <h3>Filtered by</h3>
          <AlignItemsCenter
            sx={{
              svg: {
                marginLeft: '-32px',
              },
            }}
          >
            <AlignItemsCenter mr="32px">
              <Text>Tag:</Text>
              <Select
                sx={{
                  mx: '12px',
                  height: '40px',
                  py: '4px',
                  px: '8px',
                  backgroundColor: 'rgba(2, 13, 28, 0.1)',
                }}
                value={tagOption}
                onChange={handleTagFilterChange}
              >
                <option value="any">any</option>
                <option value="popup">popup</option>
                <option value="background">background</option>
                <option value="debugLog">debugLog</option>
                <option value="contentScript">contentScript</option>
              </Select>
            </AlignItemsCenter>
            <AlignItemsCenter>
              <Text>Level:</Text>
              <Select
                sx={{
                  mx: '12px',
                  height: '40px',
                  py: '4px',
                  px: '8px',
                  backgroundColor: 'rgba(2, 13, 28, 0.1)',
                }}
                value={levelOption}
                onChange={handleLevelFilterChange}
              >
                <option value="any">any</option>
                <option value="INFO">info</option>
                <option value="WARN">warn</option>
                <option value="ERROR">error</option>
              </Select>
            </AlignItemsCenter>
          </AlignItemsCenter>
        </Box>
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
