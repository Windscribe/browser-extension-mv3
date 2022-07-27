import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'state/hooks'
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
  const { theme } = useThemeUI()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: any) => {
    e.preventDefault()
    login(e.target.username.value, e.target.password.value).then(response => {
      if (response.errorMessage) {
        setError(response.errorMessage)
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
      <Box as="form" onSubmit={e => handleLogin(e)} sx={{ mx: '16px' }}>
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
        <Flex sx={{ mt: '16px', mb: '18px', justifyContent: 'space-between' }}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text sx={{ color: theme.colors?.secondaryText }}>2FA Code?</Text>
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
      </Box>
    </Flex>
  )
}

export default Login
