import { Box, Flex, Text } from 'theme-ui'
import { useDispatch, useSelector } from 'state/hooks'
import { type ThemeUiElement, Status } from 'utils/types'
import { DataCenter } from 'api/types'
import { addOverlay } from 'state/slices/overlay'
import IpAddress from './IpAddress'
import InfoIcon from 'assets/img/infoIcon.svg'
import NoInternet from 'assets/img/noInternet.svg'

type ConnectionStatusProps = {
  status: Status
  autopilotSelected: boolean
  currentDataCenter: Partial<DataCenter>
  proxyFailure: boolean
}

const ConnectionStatus: ThemeUiElement<ConnectionStatusProps> = ({
  status,
  autopilotSelected,
  currentDataCenter,
  proxyFailure,
}) => {
  const dispatch = useDispatch()
  const isOnline = useSelector(state => state.isOnline)

  return (
    <Box>
      <Flex
        sx={{
          alignItems: 'center',
          mb: '12px',
        }}
      >
        <Text
          sx={{
            fontSize: '12px',
            fontWeight: '600',
            color: status !== 'off' ? 'neonGreen' : isOnline ? 'white' : 'warningYellow',
            mr: '8px',
          }}
        >
          {status === 'connecting' ? (
            'CONNECTING...'
          ) : status === 'disconnecting' ? (
            'DISCONNECTING...'
          ) : status === 'on' ? (
            'ON'
          ) : isOnline ? (
            'OFF'
          ) : (
            <Flex sx={{ alignItems: 'center', gap: '8px' }}>
              <NoInternet sx={{ fill: 'warningYellow' }} />
              OFFLINE
            </Flex>
          )}
        </Text>
        <Text
          sx={{
            fontSize: '12px',
            color: status === 'on' && !proxyFailure ? 'neonGreen' : 'halfWhite',
            fontWeight: proxyFailure ? '600' : '400',
          }}
        >
          {proxyFailure ? (
            <Flex sx={{ alignItems: 'center', gap: '8px' }}>
              PROXY FAILURE
              <InfoIcon
                sx={{
                  cursor: 'pointer',
                  fill: 'halfWhite',
                  transition: '0.3s',
                  ':hover': {
                    fill: 'white',
                  },
                }}
                onClick={() => dispatch(addOverlay('somethingWeird'))}
              />
            </Flex>
          ) : isOnline && (status === 'on' || status === 'off') ? (
            <IpAddress />
          ) : null}
        </Text>
      </Flex>
      <Box mb="8px">
        <Text
          data-testid="city"
          sx={{
            fontSize: '16px',
            color: 'white',
            fontWeight: 600,
          }}
        >
          {autopilotSelected ? 'Autopilot' : currentDataCenter?.city}
        </Text>
      </Box>
      {!autopilotSelected && currentDataCenter?.nick && (
        <Text
          data-testid="nick"
          sx={{
            fontSize: '14px',
            color: 'halfWhite',
          }}
        >
          {currentDataCenter?.nick}
        </Text>
      )}
    </Box>
  )
}

export default ConnectionStatus
