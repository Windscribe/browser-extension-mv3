import { Button, Flex, Text, useThemeUI } from 'theme-ui'
import splashBackground from 'assets/img/splashBackground.png'
import rotatingLogo from 'assets/img/rotatingLogo.gif'
import { set } from 'state/slices/view'
import { useDispatch } from 'state/hooks'

const SplashPage = () => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const goLogin = () => dispatch(set('Login'))

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${splashBackground})`,
        backgroundRepeat: 'no-repeat',
        height: '100vh',
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
        onClick={goLogin}
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
