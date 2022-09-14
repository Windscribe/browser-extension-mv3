import { useState } from 'react'
import { Box, Button, Flex, Text, useThemeUI } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import HeaderButton from './HeaderButton'
import FlagBackground from './FlagBackground'
import { useGoTo } from 'services/navigation'
import { useSelector } from 'state/hooks'

import FlagGradientMask from 'assets/img/flag-gradient-mask.svg'
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

const Home: ThemeUiElement = () => {
  const { theme } = useThemeUI()
  const gotToLocations = useGoTo('Locations')
  const city = useSelector(s => s.servers.currentDataCenter?.city)
  const nick = useSelector(s => s.servers.currentDataCenter?.nick)
  const countryCode = useSelector(s => s.servers.currentDataCenter?.countryCode) || 'AUTO'
  const FlagSvg = Flags[countryCode] || Flags['AUTO']
  const [power, setPower] = useState<boolean>(false)

  const handlePowerButtonClick = () => setPower(!power)

  // TODO connect with a store instead of mocks
  const status = 'connected' // mock proxy.status slice
  const online = true // mock online slice
  // useCallback?
  const getOpacity = (): number => {
    if (status === 'disconnected') return 0
    if (status === 'connected' && !online) return 0.3
    if (status === 'connecting' || !online) return 0.3
    if (status === 'connected' && online) return 1
    return 1
  }

  return (
    <Box
      data-testid="home-page"
      sx={{
        height: '208px',
        width: '100%',
        // TODO add color transition
        // backgroundColor: power ? 'lakeBlue' : 'background',
        // transition: 'all 1s ease',
        backgroundColor: 'background',
      }}
    >
      <Box
        sx={{
          height: '160px',
          width: '100%',
          zIndex: 2,
          position: 'relative',
          // idea - move this to flagsvg container
          // transition: 'all 1s ease',
          // opacity: power ? 1 : 0,
          // backgroundImage: `linear-gradient(to bottom, ${
          //   power ? theme.colors?.lakeBlue : theme.colors?.background
          // }, rgba(0, 106, 255, 0))`,
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              height: '56px',
              width: '186px',
              backgroundColor: power ? 'halfBlack' : 'background',
            }}
          >
            <Button variant="simple">
              <Menu sx={{ fill: 'white', opacity: '0.5', mx: '24px' }} />
            </Button>
            <Logo sx={{ fill: 'white' }} />
          </Flex>
          <HeaderBlade
            sx={{
              width: '46px',
              height: '56px',
              fill: power ? 'halfBlack' : 'background',
              mr: '4px',
            }}
          />
          <Flex sx={{ gap: '8px' }}>
            <HeaderButton Icon={<Shield />} count={0} />
            <HeaderButton Icon={<Blocker />} count={0} />
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
                  color: 'primaryText',
                  mr: '8px',
                }}
              >
                OFF
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                  color: 'secondaryText',
                }}
              >
                000.000.00.000
              </Text>
            </Flex>
            {/* TODO Check fonts */}
            <Box mb="8px">
              <Text
                data-testid="city"
                sx={{
                  fontSize: '16px',
                  color: 'primaryText',
                }}
              >
                {city}
              </Text>
            </Box>
            {nick && (
              <Text
                data-testid="nick"
                sx={{
                  fontSize: '14px',
                  color: 'secondaryText',
                }}
              >
                {nick}
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
              onClick={handlePowerButtonClick}
              sx={{
                display: 'flex',
                width: '74px',
                height: '74px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'solid 3px',
                borderColor: 'neonGreen',
                transition: '0.3s',
                ':hover': {
                  fill: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <PowerButton />
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          height: '48px',
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
      <Box
        sx={{
          width: '100%',
          height: 'calc(100% - 48px)',
          position: 'absolute',
          top: '0px',
          zIndex: 1,
          transition: 'opacity 1s ease',
          opacity: power ? 0 : 1,
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.softBlack}, rgba(2, 13, 28, 0))`,
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: 'calc(100% - 48px)',
          position: 'absolute',
          top: '0px',
          zIndex: 1,
          transition: 'opacity 1s ease',
          opacity: power ? 1 : 0,
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.lakeBlue}, rgba(0, 106, 255, 0))`,
        }}
      />
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          opacity: 0.5, //getOpacity(),
          top: '26px',
        }}
      >
        <FlagGradientMask
          sx={{
            position: 'absolute',
            height: '100%',
            zIndex: 1,
          }}
        />
        <FlagSvg /* sx={{ opacity: 0.7 }} */ />
      </Box>
    </Box>
  )
}

export default Home
