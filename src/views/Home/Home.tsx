import { useEffect } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import HeaderButton from './HeaderButton'
import FlagBackground from './FlagBackground'
import { useGoTo } from 'services/navigation'
import { footerHeight } from 'styles/constants'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { connectProxy, disconnectProxy, CONNECT_TO_BEST_LOCATION } from 'state/slices/proxy'
import { ACCOUNT_PLAN } from 'utils/constants'
import UsageBar from './UsageBar'
import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import WhitelistOff from 'assets/img/whitelistOff.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import PrivacyIcon from 'assets/img/privacy.svg'
import BlockerIcon from 'assets/img/blocker.svg'
import ArrowRight from 'assets/img/arrowRight.svg'
import Flags from 'assets/flags'

const Home: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const goToLocations = useGoTo('Locations')
  const goToPreferences = useGoTo('Preferences')

  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const bestLocationLoading = useSelector(s => s.bestLocation.loading)
  const countryCode = useSelector(s => s.currentLocation?.country_code) || 'AUTO'
  const isConnected = useSelector(state => state.proxy.isConnected)
  const isPremium = useSelector(s => s.session.is_premium)
  const trafficMax = useSelector(s => s.session.traffic_max)
  const locHash = useSelector(s => s.session.loc_hash)
  const serverListLoading = useSelector(s => s.servers.loading)
  const autopilotSelected = useSelector(state => state.servers.autopilotSelected)
  const FlagSvg = Flags[autopilotSelected ? 'AUTO' : countryCode]

  useEffect(() => {
    if (serverListLoading === 'idle' && locHash) {
      dispatchAlias(FETCH_SERVER_LIST)
    }
  }, [locHash, isPremium, serverListLoading, dispatchAlias])

  useEffect(() => {
    // TODO Review this condition. Every time serverList updated we set best location as current
    if (serverListLoading === 'fulfilled' && bestLocationLoading === 'idle') {
      dispatchAlias(CONNECT_TO_BEST_LOCATION)
    }
  }, [serverListLoading, dispatchAlias])

  const toggleProxy = async () => {
    if (isConnected) {
      await dispatch(disconnectProxy())
    } else {
      if (currentDataCenter?.hosts?.[0]) {
        await dispatch(connectProxy(currentDataCenter.hosts[0].hostname))
      } else {
        dispatchAlias(CONNECT_TO_BEST_LOCATION)
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
            <Button variant="simple" onClick={goToPreferences}>
              <Menu
                sx={{
                  fill: 'white',
                  opacity: '0.5',
                  mx: '24px',
                  transition: '0.3s',
                  ':hover': {
                    opacity: '1',
                  },
                }}
              />
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
            <HeaderButton Icon={PrivacyIcon} isConnected={isConnected} count={0} />
            <HeaderButton Icon={BlockerIcon} isConnected={isConnected} count={0} />
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
                {autopilotSelected ? 'Autopilot' : currentDataCenter?.city}
              </Text>
            </Box>
            {!autopilotSelected && currentDataCenter?.nick && (
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
              onClick={goToLocations}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: '4px',
                ':hover': {
                  'svg:nth-of-type(1)': {
                    mr: '8px',
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
                  transform: 'scale(0.9)',
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
