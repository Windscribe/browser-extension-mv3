import { useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'

import { ENVS } from 'utils/constants'
import { sendDebugLog } from 'services/debugLog'
import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, ScrollableBox } from 'components'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { setLocationLoad } from 'state/slices/locationLoad'

import LinkIcon from 'assets/img/link.svg'
import EllipseIcon from 'assets/img/ellipse.svg'
import DebugLogIcon from 'assets/img/debugLog.svg'
import DebugMenuIcon from 'assets/img/debugMenu.svg'
import NotificationsIcon from 'assets/img/notifications.svg'
import LocationLoadIcon from 'assets/img/locationLoad.svg'

const General: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const contextMenu = useSelector(s => s.contextMenu)
  const sessionData = useSelector(s => s.session.sessionData)
  const allowSystemNotifications = useSelector(s => s.allowSystemNotifications)
  const locationLoad = useSelector(s => s.locationLoad)

  const [sentDebugLog, setSentDebugLog] = useState<string | undefined>(undefined)

  return (
    <Box data-testid="general-page" bg="background">
      <Header title="General" />
      <ScrollableBox>
        <OptionBox
          Icon={NotificationsIcon}
          title="Notifications"
          subTitle="Show connect/disconnect OS notifications."
        >
          <ToggleSwitch
            onChange={() => dispatch(setAllowSystemNotifications(!allowSystemNotifications))}
            checked={allowSystemNotifications}
          />
        </OptionBox>
        <OptionBox
          Icon={LocationLoadIcon}
          title="Show Location Load"
          subTitle="Show Location Load of each data center."
        >
          <ToggleSwitch
            onChange={() => dispatch(setLocationLoad(!locationLoad))}
            checked={locationLoad}
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
                sx={{ transition: '0.3s' }}
              >
                View
              </Button>
              <Button
                variant="option"
                data-testid="send-debug-log"
                onClick={() => {
                  if (sessionData?.session_auth_hash && sessionData?.username) {
                    sendDebugLog(
                      dispatch,
                      sessionData?.session_auth_hash,
                      sessionData?.username,
                    ).then(response => {
                      setSentDebugLog(response ? 'Sent!' : 'Error')
                    })
                  }
                }}
                sx={{ transition: '0.3s' }}
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
              transition: '0.3s',
              'svg > path': {
                transition: '0.3s',
              },
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
      </ScrollableBox>
    </Box>
  )
}

export default General
