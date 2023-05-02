import { Box, Text } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { Header, HeaderLink } from 'components'
import Button from './Button'
import { Column } from 'components/Flexbox'

const Signup: ThemeUiElement = () => {
  return (
    <Box data-testid="signup-page" bg="background">
      <Column>
        <Header title="Sign up" sx={{ borderBottom: '2px solid', borderColor: 'border' }}>
          <HeaderLink buttonRoute="Login" buttonText="Login" />
        </Header>
      </Column>
      <Column>
        <Text
          color="secondaryText"
          pt="26px"
          sx={{
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Pick your plan
        </Text>
        <Box mx="32px" my="24px">
          <Button
            dataTestId="windscribe-signup-button"
            bg="foreground"
            color="primaryText"
            text="Free"
            subtext="Up to 10GB/month"
            url="https://windscribe.com/signup?cpid=ext_chrome&platform=chrome"
          />
        </Box>
        <Box mx="32px" mb="46px">
          <Button
            bg="neonGreen"
            color="black"
            text="Pro"
            subtext="Unlimited GB & more"
            url="https://windscribe.com/upgrade?pcpid=upgrade_ext1"
          />
        </Box>
      </Column>
    </Box>
  )
}

export default Signup
