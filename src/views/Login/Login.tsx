import { useEffect, useState } from 'react'
import { Button, Flex, Text, Input, Label, Box, Link, Spinner } from 'theme-ui'

import { LOGIN } from 'state/slices/session'
import { useGoTo } from 'services/navigation'
import { Header, HeaderLink } from 'components'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { setUsername as saveUsername } from 'state/slices/userStashes'

import ShowPassword from 'assets/img/showPassword.svg'
import HidePassword from 'assets/img/hidePassword.svg'
import { type ThemeUiElement } from 'utils/types'

const Login: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const goToHome = useGoTo('Home')
  const errorMessage = useSelector(s => s.session.error?.errorMessage)
  const errorCode = useSelector(s => s.session.error?.errorCode)
  const sessionAuthHash = useSelector(s => s.session.sessionData?.session_auth_hash)
  const loginStatus = useSelector(s => s.session.loading)
  const savedUsername = useSelector(s => s.userStashes.username)

  const [username, setUsername] = useState(savedUsername)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [use2fa, setUse2fa] = useState(false)
  const [error2fa, setError2fa] = useState<string | undefined>('')

  const isPending = loginStatus === 'pending'

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
    const { username, password, twoFa } = e.currentTarget
    await dispatchAlias(LOGIN, {
      username: username?.value,
      password: password?.value,
      twoFa: twoFa?.value,
    })
  }

  return (
    <Flex
      data-testid="login-page"
      bg="background"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Header title="Login" sx={{ borderBottom: '2px solid', borderColor: 'border', mb: '16px' }}>
        <HeaderLink buttonRoute="Signup" buttonText="Sign up" />
      </Header>
      <Box sx={{ mx: '16px' }}>
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
              htmlFor="username"
            >
              Username
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
          <Input
            required
            type="text"
            name="username"
            data-testid="username-input"
            spellCheck="false"
            value={username}
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
            Password
          </Label>
          <Flex>
            <Input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              data-testid="password-input"
              onChange={e => setPassword(e.target.value)}
              sx={{ pr: '38px', borderColor: error ? 'bloodRed' : 'transparent' }}
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
                  2FA Code
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

              <Input required type="text" name="twoFa" mb="10px" />
              <Box sx={{ color: 'secondaryText', fontSize: '12px', width: '181px' }}>
                If enabled, use an authentication app to generate the code.
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
                  2FA Code?
                </Button>
              )}
              <Link
                href="https://windscribe.com/forgotpassword"
                target="_blank"
                variant="primary"
                sx={{ mt: '8px' }}
              >
                Forgot password?
              </Link>
            </Flex>
            <Button
              variant="rounded"
              type="submit"
              data-testid="login-button"
              sx={{
                width: '103px',
                height: '40px',
                color: 'softBlack',
                backgroundColor: !!username && !!password ? 'neonGreen' : 'foreground',
                transition: '0.3s',
                ':hover': {
                  backgroundColor: !!username && !!password ? 'white' : 'foreground',
                },
              }}
              disabled={isPending}
            >
              {isPending ? <Spinner sx={{ width: '24px', height: '24px' }} /> : 'Login'}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  )
}

export default Login
