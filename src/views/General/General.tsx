import { useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'

import { ENVS } from 'utils/constants'
import { sendDebugLog } from 'services'
import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { setAutoConnect } from 'state/slices/connection'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { showDebugContextMenu } from 'state/slices/contextMenu'

import LinkIcon from 'assets/img/link.svg'
import EllipseIcon from 'assets/img/ellipse.svg'
import DebugLogIcon from 'assets/img/debugLog.svg'
import DebugMenuIcon from 'assets/img/debugMenu.svg'
import AutoConnectIcon from 'assets/img/autoconnecticon.svg'

const General: ThemeUiElement = () => {
  const [sentDebugLog, setSentDebugLog] = useState<string | undefined>(undefined)

  const autoConnect = useSelector(s => s.connection.autoConnect)
  const contextMenu = useSelector(s => s.contextMenu)
  const workingApi = useSelector(s => s.workingApi)
  const session = useSelector(s => s.session)
  const debugLog = useSelector(s => s.debugLog)
  const dispatch = useDispatch()

  return (
    <Box data-testid="general-page" bg="background">
      <Header title="General" />
      <Box mx="16px">
        <OptionBox
          Icon={AutoConnectIcon}
          title="Auto-Connect"
          subTitle="Automatically connect on browser start."
        >
          <ToggleSwitch
            onChange={() => dispatch(setAutoConnect(!autoConnect))}
            checked={autoConnect}
          />
        </OptionBox>
        <OptionBox
          Icon={DebugMenuIcon}
          title="Debug Context Menu"
          subTitle="Show the debug log in the context menu."
        >
          <ToggleSwitch
            onChange={() => dispatch(showDebugContextMenu(!contextMenu))}
            checked={contextMenu}
          />
        </OptionBox>
        <OptionBox Icon={DebugLogIcon} title="Debug Log">
          {sentDebugLog ? (
            <Box sx={{ padding: 0, color: 'secondaryText', fontWeight: 'normal' }}>
              {sentDebugLog}
            </Box>
          ) : (
            <Flex sx={{ gap: '16px' }}>
              <Button
                variant="option"
                data-testid="view-debug-log"
                onClick={() => window.open(chrome.runtime.getURL('debugLog.html'))}
              >
                View
              </Button>
              <Button
                variant="option"
                data-testid="send-debug-log"
                onClick={() => {
                  if (session.session_auth_hash && session.username) {
                    sendDebugLog(
                      session.session_auth_hash,
                      session.username,
                      debugLog,
                      workingApi,
                    ).then(response => {
                      setSentDebugLog(response ? 'Sent!' : 'Error')
                    })
                  }
                }}
              >
                Send
              </Button>
            </Flex>
          )}
        </OptionBox>
        <Flex sx={{ justifyContent: 'center', mb: '16px' }}>
          <EllipseIcon />
        </Flex>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Button
            onClick={() => window.open(`${ENVS.ROOT_URL}/terms/oss`)}
            variant="simple"
            sx={{
              display: 'flex',
              borderRadius: '8px',
              border: '1px',
              borderColor: 'foreground',
              borderStyle: 'solid',
              width: '100%',
              color: 'secondaryText',
              fontSize: '14px',
              alignItems: 'center',
              px: '16px',
              fontWeight: 'bold',
              height: '48px',
              justifyContent: 'space-between',
              ':hover': {
                color: 'primaryText',
              },
              '&:hover > svg > path': {
                fill: 'primaryText',
              },
            }}
          >
            View Licenses
            <LinkIcon sx={{ fill: 'secondaryText' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default General
