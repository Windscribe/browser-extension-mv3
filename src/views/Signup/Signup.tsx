import { Box, Flex, Text } from 'theme-ui'

// import { OverrideAppHeight } from 'components/Utils';
import { type ThemeUiElement } from 'utils/types'
import { Header, HeaderLink } from 'components'
import Button from './Button'

const Signup: ThemeUiElement = () => {
  return (
    <Box data-testid="signup-page" bg="background">
      {/* <OverrideAppHeight height={'300px'} /> */}
      <Flex
        sx={{
          flexDirection: 'column',
        }}
      >
        <Header
          title="Sign up"
          RightSideComponent={<HeaderLink buttonRoute="Login" buttonText="Login" />}
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
        }}
      >
        <Text
          color="secondaryText"
          pt="24px"
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
            bg="lowWhite"
            color="white"
            text="Free"
            subtext="Up to 10GB/month"
            url="https://windscribe.com/signup?cpid=ext_chrome&platform=chrome"
          />
        </Box>
        <Box mx="32px" mb="24px">
          <Button
            bg="neonGreen"
            color="black"
            text="Pro"
            subtext="Unlimited GB & more"
            url="https://windscribe.com/upgrade?pcpid=upgrade_ext1"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Signup
