import { Box, Button, Flex, Text } from 'theme-ui'
import { useEffect, useState } from 'react'

import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import Badge from 'components/Badge'
import log from 'utils/log'
import UsageBar from './UsageBar'
import HeaderButton from './HeaderButton'
import FlagBackground from './FlagBackground'
import DomainControlBar from './DomainControlBar'
import { checkIp } from 'services'
import { useGoTo } from 'services/navigation'
import { CONNECT_TO_AUTOPILOT } from 'state/slices/autopilot'
import { connectProxy, disconnectProxy } from 'state/slices/proxy'
import { useInitialDataFetching } from 'components/hooks'
import { ACCOUNT_PLAN } from 'utils/constants'
import { type ThemeUiElement } from 'utils/types'
import Flags from 'assets/flags'

import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import PrivacyIcon from 'assets/img/privacy.svg'
import BlockerIcon from 'assets/img/blocker.svg'
import ArrowRight from 'assets/img/arrowRight.svg'

const Home: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const goToLocations = useGoTo('Locations')
  const goToPreferences = useGoTo('Preferences')
  const goToNewsfeed = useGoTo('Newsfeed')
  const goToBlocker = useGoTo('Blocker')

  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const countryCode = useSelector(s => s.currentLocation?.country_code) || 'AUTO'
  const isConnected = useSelector(state => state.proxy.isConnected)
  const isPremium = useSelector(s => s.session.is_premium)
  const trafficMax = useSelector(s => s.session.traffic_max)
  const autopilotSelected = useSelector(state => state.autopilot.autopilotSelected)
  const viewedNewsIds = useSelector(state => state.newsfeed.viewedNewsIds)
  const notifications = useSelector(state => state.newsfeed.notifications)
  const unreadNewsAmount = notifications.length - viewedNewsIds.length
  const workingApi = useSelector(state => state.workingApi)

  const FlagSvg = Flags[autopilotSelected ? 'AUTO' : countryCode]

  const [currentIp, setCurrentIp] = useState('')

  useEffect(() => {
    checkIp(workingApi).then(ip => setCurrentIp(ip))
  }, [workingApi])

  useInitialDataFetching()

  const toggleProxy = async () => {
    // This is example of how to use logger in React components
    log('Proxy toggled ' + (isConnected ? 'off' : 'on'))

    if (isConnected) {
      await dispatch(disconnectProxy())
    } else {
      const hosts = currentDataCenter?.hosts
      if (!autopilotSelected && hosts) {
        await dispatch(connectProxy(hosts))
      } else {
        await dispatchAlias(CONNECT_TO_AUTOPILOT)
      }
    }
    setCurrentIp(await checkIp(workingApi))
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
            <Button variant="simple" data-testid="go-to-preferences" onClick={goToPreferences}>
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
            <Button
              sx={{
                position: 'relative',
                transition: 'scale ease 0.3s',
                ':hover': { scale: '1.03' },
              }}
              data-testid="go-to-newsfeed-button"
              variant="simple"
              onClick={goToNewsfeed}
            >
              <Logo sx={{ fill: 'white' }} />
              <Badge
                data-testid="newsfeed-badge"
                count={unreadNewsAmount}
                sx={{ top: '-7px', right: '-14px' }}
              />
            </Button>
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
            <HeaderButton
              Icon={BlockerIcon}
              isConnected={isConnected}
              count={0}
              onClick={goToBlocker}
            />
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
                {currentIp}
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
      <DomainControlBar />
      <FlagBackground isConnected={isConnected} FlagSvg={FlagSvg} />
      {!hideUsageBar && <UsageBar />}
    </Box>
  )
}

export default Home
