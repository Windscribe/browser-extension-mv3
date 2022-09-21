import { useState } from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import HeaderButton from './HeaderButton'
import FlagBackground from './FlagBackground'
import { useGoTo } from 'services/navigation'
import { useSelector } from 'state/hooks'
import { footerHeight } from 'styles/constants'

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
  const gotToLocations = useGoTo('Locations')
  const city = useSelector(s => s.servers.currentDataCenter?.city)
  const nick = useSelector(s => s.servers.currentDataCenter?.nick)
  const countryCode = useSelector(s => s.servers.currentDataCenter?.countryCode) || 'AUTO'
  const FlagSvg = Flags[countryCode] || Flags['AUTO']
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false)

  const handlePowerButtonClick = () => setIsPowerOn(!isPowerOn)

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
              backgroundColor: isPowerOn ? 'halfBlack' : 'background',
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
              fill: isPowerOn ? 'halfBlack' : 'background',
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
                  color: isPowerOn ? 'neonGreen' : 'primaryText',
                  mr: '8px',
                }}
              >
                {isPowerOn ? 'ON' : 'OFF'}
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                  color: isPowerOn ? 'neonGreen' : 'secondaryText',
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
            <Box
              sx={{
                transition: '0.3s',
                ':hover': {
                  fill: 'white',
                  transform: 'scale(1.1)',
                },
                ...(isPowerOn && {
                  borderRadius: '50%',
                  border: 'solid 3px',
                  borderColor: 'neonGreen',
                }), // TODO use separate absolute positioned element instead of border
              }}
            >
              <Button
                variant="simple"
                onClick={handlePowerButtonClick}
                sx={{
                  display: 'flex',
                  width: '74px',
                  height: '74px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: '0.3s',
                  transform: isPowerOn ? 'rotate(0deg)' : 'rotate(-180deg)',
                }}
              >
                <PowerButton />
              </Button>
            </Box>
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
      <FlagBackground isPowerOn={isPowerOn} FlagSvg={FlagSvg} />
    </Box>
  )
}

export default Home
