import { Box, Flex, Text, Button as SimpleButton } from 'theme-ui'

// import { OverrideAppHeight } from 'components/Utils';
import Header from 'components/Header'
import Button from './Button'
import { useDispatch } from 'state/hooks'
import { set } from 'state/slices/view'

export default () => {
  const dispatch = useDispatch()
  const goLogin = () => dispatch(set('Login'))
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
          RightSideComponent={
            <SimpleButton
              variant="simple"
              onClick={goLogin}
              sx={{
                fontSize: '14px',
                color: 'secondaryText',
              }}
            >
              Login
            </SimpleButton>
          }
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
        }}
      >
        <Text
          color="warmgrey"
          pt="24px"
          sx={{
            fontSize: 1,
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
