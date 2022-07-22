import { useState } from 'react'
import { Button, Flex, Text, Input, Label, Box, Link, useThemeUI } from 'theme-ui'
import Header from 'components/Header'
import ShowPassword from 'assets/img/showPassword.svg'
import HidePassword from 'assets/img/hidePassword.svg'
import { useDispatch } from 'state/hooks'
import { set } from 'state/slices/view'

export default () => {
  const { theme } = useThemeUI()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const goSignup = () => dispatch(set('Signup'))

  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Header
        title="Login"
        RightSideComponent={
          <Button
            variant="simple"
            onClick={goSignup}
            sx={{
              fontSize: '14px',
              color: 'secondaryText',
            }}
          >
            Sign up
          </Button>
        }
      />
      <Box as="form" sx={{ mx: '16px' }}>
        <Flex sx={{ justifyContent: 'space-between' }}>
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
        <Flex sx={{ mt: '16px', justifyContent: 'space-between' }}>
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
