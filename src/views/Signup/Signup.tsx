import { Box, Flex, Text } from 'theme-ui'

// import { OverrideAppHeight } from 'components/Utils';
import Header from 'components/Header'
import HeaderLink from 'components/HeaderLink'
import Button from './Button'

export default () => {
  return (
    <Box bg="background">
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
            bg="lowwhite"
            color="white"
            text="Free"
            subtext="Up to 10GB/month"
            // path="signup"
          />
        </Box>
        <Box mx="32px" mb="24px">
          <Button
            bg="green"
            color="black"
            text="Pro"
            subtext="Unlimited GB & more"
            // path="upgrade"
            // isPro
          />
        </Box>
      </Flex>
    </Box>
  )
}
