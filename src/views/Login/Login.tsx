import { useEffect, useRef, useState } from 'react'
import { Button, Flex, Text, Input, Label, Box, Link, Spinner } from 'theme-ui'

import { LOGIN, LOGIN_AUTH_TOKEN } from 'state/slices/session'
import { useGoTo } from 'services/navigation'
import { Header, HeaderLink } from 'components'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { setUsername as saveUsername } from 'state/slices/userStashes'

import ShowPassword from 'assets/img/showPassword.svg'
import HidePassword from 'assets/img/hidePassword.svg'
import Upload from 'assets/img/upload.svg'
import { Either, type ThemeUiElement } from 'utils/types'
import CaptchaSlider from 'components/CaptchaSlider'
import { ApiErrorResponse, AuthTokenData } from 'api/types'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import { accountHashFromFile, isValidAccountHash } from 'utils/accountHash'

type LoginMode = 'username' | 'hash'

const isEmail = (value: string) => {
  const v = value.trim()
  const input = document.createElement('input')
  input.type = 'email'
  input.value = v
  return input.validity.valid && v.includes('@')
}

const Login: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const goToHome = useGoTo('Home')
  const errorMessage = useSelector(s => s.session.error?.errorMessage)
  const errorCode = useSelector(s => s.session.error?.errorCode)
  const sessionAuthHash = useSelector(s => s.session.sessionData?.session_auth_hash)
  const loginStatus = useSelector(s => s.session.loading)
  const savedUsername = useSelector(s => s.userStashes.username)
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  const [username, setUsername] = useState(savedUsername)
  const [password, setPassword] = useState('')
  const [accountHash, setAccountHash] = useState('')
  const [loginMode, setLoginMode] = useState<LoginMode>('username')
  const [twoFa, setTwoFa] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [use2fa, setUse2fa] = useState(false)
  const [error2fa, setError2fa] = useState<string | undefined>('')
  const authTokenData = useSelector(s => s.session.authTokenData)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const hashFileInput = useRef<HTMLInputElement>(null)

  const isPending = loginStatus === 'pending'
  const isHashLogin = loginMode === 'hash'
  const loginUsername = isHashLogin ? accountHash.trim() : username.trim()
  const loginPassword = isHashLogin ? accountHash.trim() : password
  const hasLoginCredentials = isHashLogin
    ? isValidAccountHash(accountHash)
    : loginUsername.length > 0 && loginPassword.length > 0

  useEffect(() => {
    // Maybe we need to store these error codes as constants somewhere? We can discuss
    if (errorCode === 1340 || errorCode === 1341) {
      setError2fa(errorMessage)
      setUse2fa(true)
      return
    }
    setError(errorMessage)
  }, [errorMessage, errorCode])

  useEffect(() => {
    setError('')
  }, [username, password])

  useEffect(() => {
    if (sessionAuthHash) {
      goToHome()
    }
  }, [sessionAuthHash, goToHome])

  type HandleLogin = (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  const handleLogin: HandleLogin = async e => {
    e.preventDefault()

    if (!hasLoginCredentials) return

    // Check if username looks like an email
    if (!isHashLogin && isEmail(loginUsername)) {
      setError(getLocalizedMessage('wsext_username_should_not_be_email', currentLanguage))
      return
    }

    // make auth token request
    const authTokenResult = (await dispatchAlias(LOGIN_AUTH_TOKEN, {
      username: loginUsername,
      password: loginPassword,
    })) as Either<AuthTokenData, ApiErrorResponse>

    if (authTokenResult.errorMessage) return // Stop if auth token failed

    if (!authTokenResult?.captcha && authTokenResult?.token) {
      await dispatchAlias(LOGIN, {
        username: loginUsername,
        password: loginPassword,
        twoFa,
        secureToken: authTokenResult?.token,
      })
    } else {
      setShowCaptcha(true)
    }
  }

  const selectLoginMode = (mode: LoginMode) => {
    if (mode === loginMode) return
    setLoginMode(mode)
    setAccountHash('')
    setError('')
    setError2fa('')
    setTwoFa('')
    setUse2fa(false)
    setShowCaptcha(false)
  }

  const onHashFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setAccountHash(await accountHashFromFile(file))
    setError('')
    e.target.value = ''
  }

  return (
    <Flex
      data-testid="login-page"
      bg="background"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Header
        title={getLocalizedMessage('wsext_login', currentLanguage)}
        sx={{ borderBottom: '2px solid', borderColor: 'border', mb: '16px' }}
      >
        <HeaderLink
          buttonRoute="Signup"
          buttonText={getLocalizedMessage('wsext_sign_up', currentLanguage)}
        />
      </Header>
      <Box sx={{ mx: '16px' }}>
        {showCaptcha &&
          authTokenData?.captcha &&
          authTokenData?.captcha?.top &&
          authTokenData?.captcha?.background &&
          authTokenData?.captcha?.slider && (
            <Flex
              sx={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                mb: '16px',
              }}
            >
              <Text sx={{ color: 'white', fontSize: '14px' }}>
                {getLocalizedMessage('wsext_complete_puzzle_to_continue', currentLanguage)}
              </Text>
              <CaptchaSlider
                width={221}
                top={authTokenData?.captcha.top}
                background={authTokenData?.captcha.background}
                slider={authTokenData?.captcha.slider}
                onComplete={async (solution, trail) => {
                  setShowCaptcha(false)
                  await dispatchAlias(LOGIN, {
                    username: loginUsername,
                    password: loginPassword,
                    twoFa,
                    secureToken: authTokenData?.token,
                    captchaSolution: solution,
                    captchaTrail: trail,
                  })
                }}
              />
            </Flex>
          )}

        {!showCaptcha && (
          <>
            <Flex
              sx={{
                mb: '8px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              <Button
                type="button"
                data-testid="login-mode-tab-username"
                aria-pressed={!isHashLogin}
                disabled={isPending}
                onClick={() => selectLoginMode('username')}
                variant="simple"
                sx={{
                  color: isHashLogin ? 'secondaryText' : 'white',
                  transition: '0.3s',
                  '&:hover': { color: 'white' },
                  '&:disabled': { cursor: 'not-allowed' },
                }}
              >
                {getLocalizedMessage('wsext_username', currentLanguage)}
              </Button>
              <Text sx={{ color: 'secondaryText' }}>|</Text>
              <Button
                type="button"
                data-testid="login-mode-tab-hash"
                aria-pressed={isHashLogin}
                disabled={isPending}
                onClick={() => selectLoginMode('hash')}
                variant="simple"
                sx={{
                  color: isHashLogin ? 'white' : 'secondaryText',
                  transition: '0.3s',
                  '&:hover': { color: 'white' },
                  '&:disabled': { cursor: 'not-allowed' },
                }}
              >
                {getLocalizedMessage('wsext_hash', currentLanguage)}
              </Button>
            </Flex>
            <form onSubmit={handleLogin}>
            <Flex
              sx={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '16px',
              }}
            >
              <Label
                sx={{
                  fontWeight: '600',
                  color: 'primaryText',
                  height: '16px',
                  mb: '8px',
                  mr: '16px',
                  flexShrink: 0,
                }}
                htmlFor={isHashLogin ? 'accountHash' : 'username'}
              >
                {getLocalizedMessage(
                  isHashLogin ? 'wsext_hash' : 'wsext_username',
                  currentLanguage,
                )}
              </Label>
              {error && (
                <Text
                  sx={{
                    width: 'auto',
                    fontSize: '12px',
                    color: 'bloodRed',
                    marginBottom: '8px',
                  }}
                >
                  {error}
                </Text>
              )}
            </Flex>
            {isHashLogin ? (
              <Flex sx={{ position: 'relative' }}>
                <Input
                  required
                  type="text"
                  name="accountHash"
                  data-testid="account-hash-input"
                  spellCheck="false"
                  autoComplete="off"
                  disabled={isPending}
                  value={accountHash}
                  autoFocus
                  aria-invalid={accountHash.length > 0 && !isValidAccountHash(accountHash)}
                  onChange={e => {
                    setAccountHash(e.target.value)
                    setError('')
                  }}
                  sx={{
                    pr: '2rem',
                    borderColor: error ? 'bloodRed' : 'transparent',
                  }}
                />
                <Button
                  variant="simple"
                  type="button"
                  data-testid="account-hash-upload-button"
                  title={getLocalizedMessage('wsext_import', currentLanguage)}
                  aria-label={getLocalizedMessage('wsext_import', currentLanguage)}
                  disabled={isPending}
                  onClick={() => hashFileInput.current?.click()}
                  sx={{
                    position: 'absolute',
                    right: '9px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primaryText',
                    opacity: 0.5,
                    transition: '0.3s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Upload />
                </Button>
                <input
                  ref={hashFileInput}
                  data-testid="account-hash-file-input"
                  type="file"
                  hidden
                  onChange={onHashFileChange}
                />
              </Flex>
            ) : (
              <>
                <Input
                  required
                  type="text"
                  name="username"
                  data-testid="username-input"
                  spellCheck="false"
                  disabled={isPending}
                  value={username}
                  autoFocus
                  onChange={e => {
                    setUsername(e.target.value)
                    dispatch(saveUsername(e.target.value))
                  }}
                  sx={{
                    borderColor: error ? 'bloodRed' : 'transparent',
                    ':autofill': {
                      boxShadow: 'none !important',
                    },
                  }}
                />
                <Label
                  sx={{
                    fontWeight: '600',
                    color: 'primaryText',
                    height: '16px',
                    mt: '16px',
                    mb: '8px',
                    mr: '16px',
                  }}
                  htmlFor="password"
                >
                  {getLocalizedMessage('wsext_password', currentLanguage)}
                </Label>
                <Flex>
                  <Input
                    required
                    disabled={isPending}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    data-testid="password-input"
                    onChange={e => setPassword(e.target.value)}
                    sx={{
                      pr: '38px',
                      borderColor: error ? 'bloodRed' : 'transparent',
                      '::-ms-reveal': { display: 'none' },
                    }}
                  />
                  <Box
                    sx={{
                      minWidth: '16px',
                      fill: 'primaryText',
                      position: 'absolute',
                      mt: '12px',
                      right: '28px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HidePassword /> : <ShowPassword />}
                  </Box>
                </Flex>
              </>
            )}

            {use2fa && (
              <>
                <Flex sx={{ justifyContent: 'space-between', gap: '16px', mt: '16px' }}>
                  <Button
                    variant="simple"
                    type="button"
                    sx={{
                      color: 'secondaryText',
                      mb: '8px',
                      transition: '0.3s',
                      ':hover': { color: 'primaryText' },
                    }}
                    onClick={() => setUse2fa(false)}
                  >
                    {getLocalizedMessage('wsext_two_fa_code', currentLanguage)}
                  </Button>
                  {error2fa && (
                    <Text
                      sx={{
                        width: 'auto',
                        fontSize: '12px',
                        mb: '8px',
                        color: 'bloodRed',
                      }}
                    >
                      {error2fa}
                    </Text>
                  )}
                </Flex>

                <Input
                  disabled={loginStatus === 'pending'}
                  onChange={e => setTwoFa(e.target.value)}
                  required
                  type="text"
                  name="twoFa"
                  mb="10px"
                />
                <Box sx={{ color: 'secondaryText', fontSize: '12px', width: '181px' }}>
                  {getLocalizedMessage('wsext_two_fa_help', currentLanguage)}
                </Box>
              </>
            )}
            <Flex sx={{ my: '16px', justifyContent: 'space-between' }}>
              <Flex sx={{ flexDirection: 'column' }}>
                {!use2fa && (
                  <Button
                    variant="simple"
                    type="button"
                    sx={{
                      color: 'secondaryText',
                      transition: '0.3s',
                      ':hover': { color: 'primaryText' },
                    }}
                    onClick={() => setUse2fa(true)}
                  >
                    {getLocalizedMessage('wsext_two_fa_code_question', currentLanguage)}
                  </Button>
                )}
                {!isHashLogin && (
                  <Link
                    href="https://windscribe.com/forgotpassword"
                    target="_blank"
                    variant="primary"
                    sx={{ mt: '8px' }}
                  >
                    {getLocalizedMessage('wsext_forgot_password', currentLanguage)}
                  </Link>
                )}
              </Flex>
              <Button
                variant="rounded"
                type="submit"
                data-testid="login-button"
                sx={{
                  width: '103px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'softBlack',
                  backgroundColor: hasLoginCredentials ? 'neonGreen' : 'foreground',
                  transition: '0.3s',
                  ':hover': {
                    backgroundColor: hasLoginCredentials ? 'white' : 'foreground',
                  },
                }}
                disabled={isPending || !hasLoginCredentials}
              >
                {isPending ? (
                  <Spinner sx={{ width: '24px', height: '24px' }} />
                ) : (
                  getLocalizedMessage('wsext_login', currentLanguage)
                )}
              </Button>
            </Flex>
          </form>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Login
