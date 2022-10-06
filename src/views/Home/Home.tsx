import { useEffect } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import HeaderButton from './HeaderButton'
import FlagBackground from './FlagBackground'
import { useGoTo } from 'services/navigation'
import { footerHeight } from 'styles/constants'
import { setIsConnected, fetchServerList, SET_AUTOPILOT_AS_CURRENT } from 'state/slices/servers'
import { ACCOUNT_PLAN } from 'utils/constants'
import UsageBar from './UsageBar'
import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import WhitelistOff from 'assets/img/whitelistOff.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import Shield from 'assets/img/shield.svg'
import Blocker from 'assets/img/blocker.svg'
import ArrowRight from 'assets/img/arrowRight.svg'
import Flags from 'assets/flags'

import { connectProxy, disconnectProxy } from 'utils/proxyConfig'

const Home: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const gotToLocations = useGoTo('Locations')
  const currentDataCenter = useSelector(s => s.servers.currentDataCenter)
  const serverListLoading = useSelector(s => s.servers.loading)
  const bestLocationLoading = useSelector(s => s.bestLocation.loading)
  const countryCode = useSelector(s => s.servers.currentLocation?.country_code) || 'AUTO'
  const isConnected = useSelector(state => state.servers.isConnected)
  const isPremium = useSelector(s => s.session.is_premium)
  const trafficMax = useSelector(s => s.session.traffic_max)
  const FlagSvg = Flags[countryCode] || Flags['AUTO']

  useEffect(() => {
    dispatch(fetchServerList())
  }, [])

  useEffect(() => {
    // TODO Review this condition
    if (serverListLoading === 'fulfilled' && bestLocationLoading === 'idle') {
      dispatchAlias(SET_AUTOPILOT_AS_CURRENT)
    }
  }, [serverListLoading, bestLocationLoading])

  const toggleProxy = () => {
    // TODO: Move dispatch calls to connectProxy and disconnectProxy functions
    if (currentDataCenter) {
      if (isConnected) {
        disconnectProxy()
        dispatch(setIsConnected(false))
      } else {
        connectProxy(currentDataCenter.hosts[0].hostname)
        dispatch(setIsConnected(true))
      }
    }
  }

  const hideUsageBar = isPremium || trafficMax === ACCOUNT_PLAN.UNLIMITED
  return (
    <Box
      data-testid="home-page"
      sx={{
        height: '208px',
        width: '100%',
        backgroundColor: 'background',
      }}
    >
      <Box
        sx={{
          height: '160px',
          width: '100%',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
          }}
        >
          <Flex
            sx={{
              height: '56px',
              width: '186px',
              alignItems: 'center',
              transition: 'background-color  1s ease',
              backgroundColor: isConnected ? 'halfBlack' : 'background',
            }}
          >
            <Button variant="simple">
              <Menu sx={{ fill: 'white', opacity: '0.5', mx: '24px' }} />
            </Button>
            <Logo sx={{ fill: 'white' }} />
          </Flex>
          <HeaderBlade
            sx={{
              mr: '4px',
              width: '46px',
              height: '56px',
              transition: 'fill 1s ease',
              fill: isConnected ? 'halfBlack' : 'background',
            }}
          />
          <Flex sx={{ gap: '8px' }}>
            <HeaderButton Icon={<Shield />} isConnected={isConnected} count={0} />
            <HeaderButton Icon={<Blocker />} isConnected={isConnected} count={0} />
          </Flex>
        </Flex>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mx: '16px',
            height: '104px',
          }}
        >
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
                  color: isConnected ? 'neonGreen' : 'primaryText',
                  mr: '8px',
                }}
              >
                {isConnected ? 'ON' : 'OFF'}
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                  color: isConnected ? 'neonGreen' : 'secondaryText',
                }}
              >
                000.000.00.000
              </Text>
            </Flex>
            <Box mb="8px">
              <Text
                data-testid="city"
                sx={{
                  fontSize: '16px',
                  color: 'primaryText',
                  fontWeight: 600,
                }}
              >
                {currentDataCenter?.city}
              </Text>
            </Box>
            {currentDataCenter?.nick && (
              <Text
                data-testid="nick"
                sx={{
                  fontSize: '14px',
                  color: 'secondaryText',
                }}
              >
                {currentDataCenter?.nick}
              </Text>
            )}
          </Box>
          <Flex
            sx={{
              alignItems: 'center',
            }}
          >
            <Button
              variant="simple"
              data-testid="globe-button"
              onClick={gotToLocations}
              sx={{
                mr: '8px',
                ':hover': {
                  'svg:nth-of-type(1)': {
                    mr: '12.8px',
                    fill: 'white',
                  },
                  'svg:nth-of-type(2)': {
                    visibility: 'initial',
                    fill: 'white',
                  },
                },
              }}
            >
              <Globe
                sx={{
                  transition: '0.25s',
                  fill: 'secondaryText',
                  visibility: 'initial',
                }}
              />
              <ArrowRight
                sx={{
                  transition: '0.1s',
                  ml: '-8px',
                  fill: 'secondaryText',
                  visibility: 'hidden',
                }}
              />
            </Button>

            <Button
              variant="simple"
              sx={{
                display: 'flex',
                width: '74px',
                height: '74px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'solid 3px',
                borderColor: `${isConnected ? 'neonGreen' : 'transparent'}`,
                transform: `rotate(${isConnected ? '0' : '-180deg'})`,
                transition: '0.3s',
                ':hover': {
                  transform: `scale(1.1) rotate(${isConnected ? '0' : '-180deg'})`,
                },
              }}
              onClick={toggleProxy}
            >
              <PowerButton />
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          height: `${footerHeight}`,
          width: '100%',
          backgroundColor: 'background',
          px: '16px',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Text sx={{ fontWeight: '600', fontSize: '14px', color: 'secondaryText' }}>
          Windscribe.com
        </Text>
        <WhitelistOff sx={{ fill: 'secondaryText' }} />
      </Flex>
      <FlagBackground isConnected={isConnected} FlagSvg={FlagSvg} />
      {!hideUsageBar && <UsageBar />}
    </Box>
  )
}

export default Home
