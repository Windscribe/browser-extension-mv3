import { Box, Button, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { Header, OptionBox, ToggleSwitch } from 'components'

import EllipseIcon from 'assets/img/ellipse.svg'
import LinkIcon from 'assets/img/link.svg'
import AutoConnectIcon from 'assets/img/autoconnecticon.svg'
import DebugMenuIcon from 'assets/img/debugMenu.svg'
import { useDispatch, useSelector } from 'state/hooks'
import { setAutoConnect } from 'state/slices/connection'
import { showDebugContextMenu } from 'state/slices/contextMenu'

const General: ThemeUiElement = () => {
  const autoConnect = useSelector(s => s.connection.autoConnect)
  const contextMenu = useSelector(s => s.contextMenu)
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
        <Flex sx={{ justifyContent: 'center', mb: '16px' }}>
          <EllipseIcon />
        </Flex>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Button
            onClick={() => window.open('https://windscribe.com/terms/oss')}
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
