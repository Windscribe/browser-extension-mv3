import React from 'react'
import { Box, Button, Flex, Label } from 'theme-ui'
import { ToggleSwitch } from 'components'
import { useSelector, useDispatch } from 'state/hooks'
import { clearDebugLog } from 'state/slices/debugLog'
import './DebugLog.css'

const DebugLog: React.FC = () => {
  const log = useSelector(s => s.debugLog.log)
  const dispatch = useDispatch()

  // console.log(log)

  const userInfo = `[DeviceInfo]
  -------------
  [OS]: ${navigator.userAgent}
  [UserAgent OS]: ${navigator.userAgent}
  [UserAgent Browser]: ${navigator.userAgent}
  [Extension]: ${navigator.userAgent}

  [User State]
  ------------------------------------------------------
  `

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
          <ToggleSwitch />
        </Label>
        <Button variant="debug" onClick={() => dispatch(clearDebugLog())}>
          Clear Log
        </Button>
        <Button variant="debug">Show User Info</Button>
      </Flex>
      <Button
        sx={{
          cursor: 'pointer',
          backgroundColor: 'background',
          position: 'absolute',
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
        {log}
      </Box>
    </div>
  )
}

export default DebugLog
