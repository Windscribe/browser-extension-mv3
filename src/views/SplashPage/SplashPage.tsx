import { Button, Flex, Text, useThemeUI } from 'theme-ui'

import { type ThemeUiElement } from 'components/types'
import splashBackground from 'assets/img/splashBackground.png'
import rotatingLogo from 'assets/img/rotatingLogo.gif'
import { useGoTo } from 'services/navigation'
import { useSelector } from 'state/hooks'

const SplashPage: ThemeUiElement = () => {
  const { theme } = useThemeUI()

  const goToSignup = useGoTo('Signup')
  const goToLogin = useGoTo('Login')
  const goToHome = useGoTo('Home')

  const sessionData = useSelector(state => state.session?.data)

  if (sessionData) {
    goToHome()
  }


  if (sessionData) goTo('Home')()

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${splashBackground})`,
        backgroundRepeat: 'no-repeat',
        height: '298px',
      }}
    >
      <img
        src={rotatingLogo}
        alt="logo"
        sx={{
          mt: '48px',
          width: '40px',
          height: '40px',
        }}
      />
      <Text
        sx={{
          mt: '24px',
          fontSize: '24px',
          fontWeight: '600',
          color: theme.colors?.white,
        }}
      >
        Keep Your Secrets.
      </Text>
      <Button
        data-testid="get-started-button"
        onClick={goToSignup}
        variant="rounded"
        sx={{
          mt: '52px',
          fontSize: '14px',
          width: '228px',
          height: '40px',
          color: theme.colors?.black,
          backgroundColor: theme.colors?.green,
          textAlign: 'center',
          ':hover': {
            backgroundColor: theme.colors?.white,
          },
        }}
      >
        Get Started
      </Button>
      <Button
        onClick={goToLogin}
        variant="simple"
        sx={{
          mt: '24px',
          opacity: '0.5',
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors?.white,
          ':hover': {
            opacity: '1',
          },
        }}
      >
        Login
      </Button>
    </Flex>
  )
}

export default SplashPage
