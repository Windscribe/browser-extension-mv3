import { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Text, Image } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import splashBackground from 'assets/img/splashBackground.png'
import rotatingLogo from 'assets/img/rotatingLogo.gif'
import GlobeIcon from 'assets/img/globe.svg'
import { useGoTo } from 'services/navigation'
import { useDispatch, useSelector } from 'state/hooks'
import {
  getLocalizedMessage,
  localeNativeLabels,
  SupportedLocaleOptions,
  supportedLocaleOptions,
} from 'utils/getLocalisedString'
import { setCurrentLanguageSelection } from 'state/slices/currentLanguage'

const SplashPage: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const goToSignup = useGoTo('Signup')
  const goToLogin = useGoTo('Login')
  const goToHome = useGoTo('Home')

  const authHash = useSelector(state => state.session?.sessionData?.session_auth_hash)
  const { currentLanguage, currentSelection } = useSelector(state => state.currentLanguage)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showLanguageMenu) {
      return undefined
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showLanguageMenu])

  const handleLanguageSelection = (selection: SupportedLocaleOptions) => {
    dispatch(setCurrentLanguageSelection(selection))
    setShowLanguageMenu(false)
  }

  if (authHash) {
    goToHome()
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${splashBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      data-testid="splash-page"
    >
      <Box
        ref={languageMenuRef}
        sx={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          zIndex: 1,
        }}
      >
        <Button
          aria-label={getLocalizedMessage('wsext_language', currentLanguage)}
          aria-haspopup="menu"
          aria-expanded={showLanguageMenu}
          onClick={() => setShowLanguageMenu(isOpen => !isOpen)}
          sx={{
            p: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.24)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: 'white',
            opacity: 0.72,
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ':hover': {
              opacity: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.36)',
            },
          }}
        >
          <Box
            sx={{
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              svg: {
                width: '14px',
                height: '14px',
                minWidth: '14px',
                display: 'block',
                fill: 'currentColor',
              },
            }}
          >
            <GlobeIcon viewBox="0 0 24 24" />
          </Box>
        </Button>
        {showLanguageMenu && (
          <Box
            role="menu"
            sx={{
              position: 'absolute',
              bottom: '40px',
              right: 0,
              width: '132px',
              p: '4px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            {supportedLocaleOptions.map(selection => (
              <Button
                key={selection}
                variant="simple"
                role="menuitem"
                onClick={() => handleLanguageSelection(selection)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '28px',
                  px: '8px',
                  borderRadius: '6px',
                  color: currentSelection === selection ? 'neonGreen' : 'rgba(255, 255, 255, 0.72)',
                  fontSize: '12px',
                  fontWeight: currentSelection === selection ? '700' : '600',
                  justifyContent: 'flex-start',
                  transition: '0.2s',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  },
                }}
              >
                {selection === 'system'
                  ? getLocalizedMessage('wsext_system', currentLanguage)
                  : localeNativeLabels[selection]}
              </Button>
            ))}
          </Box>
        )}
      </Box>
      <Image
        src={rotatingLogo}
        alt="logo"
        sx={{
          mt: '48px',
          width: '40px',
          height: '40px',
        }}
      />
      <Box
        sx={{
          mt: '24px',
          mx: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {getLocalizedMessage('wsext_keep_your_secrets', currentLanguage)}
        </Text>
      </Box>
      <Button
        data-testid="get-started-button"
        onClick={goToSignup}
        variant="rounded"
        sx={{
          mt: '52px',
          fontSize: '14px',
          width: '228px',
          height: '40px',
          color: 'softBlack',
          backgroundColor: 'neonGreen',
          textAlign: 'center',
          transition: '0.3s',
          ':hover': {
            backgroundColor: 'white',
          },
        }}
      >
        {getLocalizedMessage('wsext_get_started', currentLanguage)}
      </Button>
      <Button
        data-testid="go-to-login-button"
        onClick={goToLogin}
        variant="simple"
        sx={{
          my: '24px',
          opacity: '0.5',
          fontSize: '14px',
          fontWeight: '600',
          color: 'white',
          transition: '0.3s',
          ':hover': {
            opacity: '1',
          },
        }}
      >
        {getLocalizedMessage('wsext_login', currentLanguage)}
      </Button>
    </Flex>
  )
}

export default SplashPage
