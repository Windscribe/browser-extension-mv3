import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Label } from 'theme-ui'
import { ToggleSwitch } from 'components'
import { useSelector, useDispatch } from 'state/hooks'
import { clearDebugLog } from 'state/slices/debugLog'
import './DebugLog.css'
import UAParser from 'ua-parser-js'

const DebugLog: React.FC = () => {
  const dispatch = useDispatch()
  const log = useSelector(s => s.debugLog.log)
  const failover = useSelector(s => s.connection.failover)
  const [isAutoScroll, setIsAutoScroll] = useState(false)
  const [isShowUserInfo, setIsShowUserInfo] = useState(false)

  const parser = new UAParser(navigator.userAgent)

  const userInfo = `[DeviceInfo]
------------------------------------------------------
[OS]: ${navigator.userAgent}
[UserAgent OS]: ${parser.getOS().name} ${parser.getOS().version}
[UserAgent Browser]: ${parser.getBrowser().name} ${parser.getBrowser().version}
[Extension]:  ${chrome.runtime.getManifest().version}

[User State]
------------------------------------------------------
failover: ${failover}`

  useEffect(() => {
    if (isAutoScroll) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [isAutoScroll, log])

  return (
    <div className="container">
      <Flex
        sx={{
          height: '50px',
          backgroundColor: 'background',
          color: 'primaryText',
          width: '100%',
          px: '10px',
          alignItems: 'center',
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
        <Button variant="debug" onClick={() => setIsShowUserInfo(!isShowUserInfo)}>
          Show User Info
        </Button>
      </Flex>
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
        {log}
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
      >
        {userInfo}
      </Box>
    </div>
  )
}

export default DebugLog
