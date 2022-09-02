import { Box, Button, Flex, Text, useThemeUI } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import HeaderButton from './HeaderButton'
import { useGoTo } from 'services/navigation'
import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import WhitelistOff from 'assets/img/whitelistOff.svg'
import Autopilot from 'assets/flags/AUTOPILOT.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import Shield from 'assets/img/shield.svg'
import Blocker from 'assets/img/blocker.svg'
import ArrowRight from 'assets/img/arrowRight.svg'

const Home: ThemeUiElement = () => {
  const { theme } = useThemeUI()
  const gotToLocations = useGoTo('Locations')

  return (
    <Box data-testid="home-page" sx={{ height: '208px', width: '100%' }}>
      <Box
        sx={{
          height: '160px',
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.lakeBlue}, rgba(0, 106, 255, 0))`,
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
              backgroundColor: 'halfBlack',
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
              fill: 'halfBlack',
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
                mb: '10px',
              }}
            >
              <Text
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white',
                  mr: '8px',
                }}
              >
                OFF
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                  color: 'halfWhite',
                }}
              >
                000.000.00.000
              </Text>
            </Flex>
            <Text
              sx={{
                fontSize: '16px',
                color: 'white',
              }}
            >
              Autopilot
            </Text>
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
        }}
      >
        <Text sx={{ fontWeight: '600', fontSize: '14px', color: 'halfWhite' }}>Windscribe.com</Text>
        <WhitelistOff sx={{ fill: 'halfWhite' }} />
      </Flex>
      <Box
        sx={{
          position: 'absolute',
          opacity: '0.2',
          top: '26px',
          zIndex: '-1',
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.softBlack}, rgba(2, 13, 28, 0))`,
        }}
      >
        <Autopilot />
      </Box>
    </Box>
  )
}

export default Home
