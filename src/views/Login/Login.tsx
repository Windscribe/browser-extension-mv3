import { useState } from 'react'
import { useDispatch } from 'state/hooks'
import { Button, Flex, Text, Input, Label, Box, Link, useThemeUI } from 'theme-ui'

import { login } from '../../api/index'
import { set } from 'state/slices/view'
import { setSession } from 'state/slices/session'

import Header from 'components/Header'
import HeaderLink from 'components/HeaderLink'
import ShowPassword from 'assets/img/showPassword.svg'
import HidePassword from 'assets/img/hidePassword.svg'
import { type ThemeUiElement } from 'components/types'

const Login: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const { theme } = useThemeUI()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [use2fa, setUse2fa] = useState(false)
  const [error2fa, setError2fa] = useState('')

  type HandleLogin = (e: React.FormEvent<HTMLFormElement>) => void
  const handleLogin: HandleLogin = e => {
    e.preventDefault()
    const twoFa = e.currentTarget.twoFa ? e.currentTarget.twoFa.value : undefined
    login(e.currentTarget.username.value, e.currentTarget.password.value, twoFa).then(response => {
      console.log(response)
      if (response.errorMessage) {
        //2FA error codes
        if (response.errorCode === 1340 || response.errorCode === 1341) {
          setError2fa(response.errorMessage)
          setUse2fa(true)
        } else {
          setError(response.errorMessage)
        }
      } else if (response.data?.session_auth_hash) {
        dispatch(setSession(response.data))
        dispatch(set('Home'))
      }
    })
  }

  return (
    <Flex
      data-testid="login-page"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Header
        title="Login"
        RightSideComponent={<HeaderLink buttonRoute="Signup" buttonText="Sign up" />}
      />
      <Box sx={{ mx: '16px' }}>
        <form onSubmit={handleLogin}>
          <Flex sx={{ justifyContent: 'space-between', gap: '16px' }}>
            <Label htmlFor="username">Username</Label>
            {error && (
              <Text
                sx={{
                  width: 'auto',
                  fontSize: '12px',
                  mt: '16px',
                  mb: '8px',
                  color: 'red',
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
            autofillBackgroundColor="foreground"
            onChange={e => setUsername(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Flex>
            <Input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={e => setPassword(e.target.value)}
              sx={{ pr: '38px' }}
            />
            <Box
              sx={{
                minWidth: '16px',
                fill: theme.colors?.primaryText,
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
                    color: theme.colors?.secondaryText,
                    mb: '8px',
                    ':hover': { color: theme.colors?.primaryText },
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
                      color: 'red',
                    }}
                  >
                    {error2fa}
                  </Text>
                )}
              </Flex>

              <Input
                required
                type="text"
                name="twoFa"
                autofillBackgroundColor="foreground"
                sx={{ mb: '10px' }}
              />
              <Box sx={{ color: theme.colors?.secondaryText, fontSize: '12px', width: '181px' }}>
                If enabled, use an authentication app to generate the code.
              </Box>
            </>
          )}
          <Flex sx={{ mt: '16px', mb: '18px', justifyContent: 'space-between' }}>
            <Flex sx={{ flexDirection: 'column' }}>
              {!use2fa && (
                <Button
                  variant="simple"
                  type="button"
                  sx={{
                    color: theme.colors?.secondaryText,
                    ':hover': { color: theme.colors?.primaryText },
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
              sx={{
                width: '103px',
                height: '40px',
                color: theme.colors?.softText,
                backgroundColor:
                  !!username && !!password ? theme.colors?.green : theme.colors?.foreground,
              }}
            >
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  )
}

export default Login
