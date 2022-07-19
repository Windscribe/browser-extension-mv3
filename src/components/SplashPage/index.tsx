import React from 'react'
import { Button, Flex, Text, useThemeUI } from 'theme-ui'
import splashBackground from '../../assets/img/splashBackground.png'
import rotatingLogo from '../../assets/img/rotatingLogo.gif'

const SplashPage = () => {
  const { theme } = useThemeUI()
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
        sx={{
          all: 'unset',
          cursor: 'pointer',
          mt: '52px',
          fontSize: '14px',
          width: '228px',
          height: '40px',
          backgroundColor: theme.colors?.green,
          borderRadius: '20px',
          textAlign: 'center',
          ':hover': {
            backgroundColor: theme.colors?.white,
          },
        }}
      >
        Get Started
      </Button>
      <Button
        sx={{
          all: 'unset',
          cursor: 'pointer',
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
