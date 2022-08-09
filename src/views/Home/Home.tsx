import { Box, Button, Flex, Text, useThemeUI } from 'theme-ui'
import HeaderButton from './HeaderButton'
import HeaderBlade from 'assets/img/headerBlade.svg'
import Menu from 'assets/img/menu.svg'
import Logo from 'assets/img/logo.svg'
import WhitelistOff from 'assets/img/whitelistOff.svg'
import Autopilot from 'assets/flags/autopilot.svg'
import PowerButton from 'assets/img/powerButton.svg'
import Globe from 'assets/img/globe.svg'
import Shield from 'assets/img/shield.svg'
import Blocker from 'assets/img/blocker.svg'
import ArrowRight from 'assets/img/arrowRight.svg'

export default () => {
  const { theme } = useThemeUI()

  return (
    <Box sx={{ height: '208px', width: '100%' }}>
      <Box
        sx={{
          height: '160px',
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.blue}, rgba(0, 106, 255, 0))`,
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
              backgroundColor: theme.colors?.halfBlack,
            }}
          >
            <Button variant="simple">
              <Menu sx={{ fill: theme.colors?.white, opacity: '0.5', mx: '24px' }} />
            </Button>
            <Logo sx={{ fill: theme.colors?.white }} />
          </Flex>
          <HeaderBlade
            sx={{
              width: '46px',
              height: '56px',
              fill: theme.colors?.halfBlack,
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
                  color: theme.colors?.white,
                  mr: '8px',
                }}
              >
                OFF
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                  color: theme.colors?.halfWhite,
                }}
              >
                000.000.00.000
              </Text>
            </Flex>
            <Text
              sx={{
                fontSize: '16px',
                color: theme.colors?.white,
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
              sx={{
                mr: '8px',
                ':hover': {
                  'svg:nth-child(1)': {
                    mr: '12.8px',
                    fill: theme.colors?.white,
                  },
                  'svg:nth-child(2)': {
                    visibility: 'initial',
                    fill: theme.colors?.white,
                  },
                },
              }}
            >
              <Globe
                sx={{
                  transition: '0.25s',
                  fill: theme.colors?.halfWhite,
                  visibility: 'initial',
                }}
              />
              <ArrowRight
                sx={{
                  transition: '0.1s',
                  ml: '-8px',
                  fill: theme.colors?.halfWhite,
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
                border: `solid 3px ${theme.colors?.green}`,
                transition: '0.3s',
                ':hover': {
                  fill: theme.colors?.white,
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
          backgroundColor: theme.colors?.background,
          px: '16px',
          justifyContent: 'space-between',
        }}
      >
        <Text sx={{ fontWeight: '600', fontSize: '14px', color: theme.colors?.halfWhite }}>
          Windscribe.com
        </Text>
        <WhitelistOff sx={{ fill: theme.colors?.halfWhite }} />
      </Flex>
      <Box
        sx={{
          position: 'absolute',
          opacity: '0.2',
          top: '26px',
          zIndex: '-1',
          backgroundImage: `linear-gradient(to bottom, ${theme.colors?.black}, rgba(2, 13, 28, 0))`,
        }}
      >
        <Autopilot />
      </Box>
    </Box>
  )
}

export default Home
