import { Box, Button, Flex } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'state/hooks'
import Badge from 'components/Badge'
import UsageBar from './UsageBar'
import PrivacyButton from './PrivacyButton'
import BlockerButton from './BlockerButton'
import FlagBackground from './FlagBackground'
import DomainControlBar from './DomainControlBar'
import { useGoTo } from 'services/navigation'
import { setIsRightAfterLogin } from 'state/slices/isRightAfterLogin'
import { addOverlay } from 'state/slices/overlay'
import { useInitialDataFetching } from 'components/hooks'
import Onboarding from 'components/Onboarding'
import { ACCOUNT_PLAN } from 'utils/constants'
import { type ThemeUiElement } from 'utils/types'
import Flags from 'assets/flags'
import { SpinAnim } from 'styles/constants'
import ConnectionInfo from './ConnectionInfo'
import ToolTip from 'components/ToolTip'
import detectUblock from 'services/detectUblock'

import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import ArrowRight from 'assets/img/arrowRight.svg'
import ConnectingRing from 'assets/img/connectingRing.svg'
import ProxyFailureRing from 'assets/img/proxyFailureRing.svg'

const Home: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const goToLocations = useGoTo('Locations')
  const goToPreferences = useGoTo('Preferences')
  const goToNewsfeed = useGoTo('Newsfeed')

  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const countryCode = useSelector(s => s.currentLocation?.country_code) || 'AUTO'
  const status = useSelector(state => state.proxy.status)
  const isPremium = useSelector(s => s.session.is_premium)
  const trafficMax = useSelector(s => s.session.traffic_max)
  const autopilotSelected = useSelector(state => state.autopilot.autopilotSelected)
  const viewedNewsIds = useSelector(state => state.newsfeed.viewedNewsIds)
  const notifications = useSelector(state => state.newsfeed.notifications)
  const unreadNewsAmount = notifications.length - viewedNewsIds.length
  const hasProxyError = useSelector(state => state.proxy.errorMessage)
  const isRightAfterLogin = useSelector(state => state.isRightAfterLogin)

  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const [lastClick, setLastClick] = useState(Date.now())
  const [loadingStatus, setLoadingStatus] = useState(
    status === 'connecting' ? 'connecting' : status === 'disconnecting' ? 'disconnecting' : null,
  )

  const proxyFailure = status === 'on' && hasProxyError && !loadingStatus

  const FlagSvg = Flags[autopilotSelected ? 'AUTO' : countryCode]

  useEffect(() => {
    if (isRightAfterLogin) {
      dispatch(setIsRightAfterLogin(false))
      detectUblock().then(isUblockInstalled => {
        isUblockInstalled && dispatch(addOverlay('ublockDetected'))
        dispatch(addOverlay('welcome'))
      })
    }
  }, [isRightAfterLogin, dispatch])

  useEffect(() => {
    if (status === 'on' || status === 'off') {
      setLoadingStatus(null)
    } else {
      setLoadingStatus(status)
    }
  }, [status])

  useInitialDataFetching()

  const setProxy = async () => {
    if (status === 'on' || status === 'connecting') {
      await chrome.runtime.sendMessage({ what: 'disconnectProxy' })
    } else {
      const hosts = currentDataCenter?.hosts
      if (!autopilotSelected && hosts) {
        await chrome.runtime.sendMessage({ what: 'connectProxy', hosts: hosts })
      } else {
        await chrome.runtime.sendMessage({ what: 'connectAutopilot' })
      }
    }
  }

  const toggleProxy = async () => {
    let newLoadingStatus = null

    if (loadingStatus === 'connecting' || status === 'on') {
      newLoadingStatus = 'disconnecting'
    } else if (loadingStatus === 'disconnecting' || status === 'off') {
      newLoadingStatus = 'connecting'
    }
    setLoadingStatus(newLoadingStatus)

    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
    }

    if (Date.now() - lastClick > 1000) {
      setProxy()
    } else {
      const newTimeout = setTimeout(() => {
        setProxy()
      }, 1000)
      setClickTimeout(newTimeout)
    }
    setLastClick(Date.now())
  }

  const hideUsageBar = isPremium || trafficMax === ACCOUNT_PLAN.UNLIMITED

  return (
    <Box
      data-testid="home-page"
      sx={{
        width: '100%',
        backgroundColor: 'darkBackground',
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
              backgroundColor: status === 'on' ? 'halfBlack' : 'darkBackground',
            }}
          >
            <Button variant="simple" data-testid="go-to-preferences" onClick={goToPreferences}>
              <Menu
                className="joyride-element-opt-out"
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
              fill: status === 'on' ? 'halfBlack' : 'darkBackground',
            }}
          />
          <Flex sx={{ gap: '8px' }}>
            <PrivacyButton />
            <BlockerButton />
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
          <ConnectionInfo
            status={status}
            loadingStatus={loadingStatus}
            autopilotSelected={autopilotSelected}
            currentDataCenter={currentDataCenter}
            proxyFailure={!!proxyFailure}
          />
          <Flex
            sx={{
              alignItems: 'center',
            }}
          >
            <ToolTip
              message="Locations Menu"
              sx={{
                mr: '30px',
              }}
            >
              <Button
                variant="simple"
                className="joyride-element-change-location"
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
                    fill: 'halfWhite',
                    visibility: 'initial',
                  }}
                />
                <ArrowRight
                  sx={{
                    transition: '0.1s',
                    ml: '-8px',
                    fill: 'halfWhite',
                    visibility: 'hidden',
                    transform: 'scale(0.9)',
                  }}
                />
              </Button>
            </ToolTip>

            <Button
              className="joyride-element-proxy-button"
              variant="simple"
              sx={{
                display: 'flex',
                width: '74px',
                height: '74px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'solid 3px',
                borderColor:
                  status === 'on' && !hasProxyError && !loadingStatus ? 'neonGreen' : 'transparent',
                transition: '0.3s',
                ':hover': {
                  transform: `scale(1.1)`,
                },
              }}
              onClick={toggleProxy}
            >
              <PowerButton
                sx={{
                  transform: `rotate(${
                    loadingStatus === 'connecting'
                      ? '0'
                      : loadingStatus === 'disconnecting'
                      ? '-180deg'
                      : status === 'on'
                      ? '0'
                      : '-180deg'
                  })`,
                  transition: '0.3s',
                }}
              />
              {loadingStatus ? (
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 12,
                    height: '72px',
                  }}
                >
                  <ConnectingRing sx={{ animation: `${SpinAnim} 1s linear infinite` }} />
                </Box>
              ) : (
                proxyFailure && (
                  <Box
                    sx={{
                      position: 'absolute',
                      zIndex: 12,
                      height: '72px',
                    }}
                  >
                    <ProxyFailureRing sx={{ fill: 'neonGreen' }} />
                  </Box>
                )
              )}
            </Button>
          </Flex>
        </Flex>
      </Box>
      <DomainControlBar />
      <FlagBackground isConnected={status === 'on'} FlagSvg={FlagSvg} />
      {!hideUsageBar && <UsageBar />}
      <Onboarding />
    </Box>
  )
}

export default Home
