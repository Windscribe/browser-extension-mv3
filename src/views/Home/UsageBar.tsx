import { Box, Button, Flex, Text, type BoxProps } from 'theme-ui'
import bytes from 'bytes'

import { useSelector } from 'state/hooks'
import { SpaceBetween } from 'components/Flexbox'
import Branch from 'components/Branch'
import { type Colors } from 'styles'
import { ACCOUNT_PLAN, ENVS } from 'utils/constants'
import { useGoTo } from 'services/navigation'

const getUsageColor = (percentage: number) => {
  if (percentage < 50) return 'green'
  if (percentage < 75) return 'yellow'
  return 'red'
}

const UsageText: React.FC<{ color: Colors; children: React.ReactNode }> = ({ color, children }) => (
  <Text
    sx={{
      color,
      fontSize: '12px',
      fontWeight: 'bold',
    }}
  >
    {children}
  </Text>
)

const UsageBar: React.FC<BoxProps> = props => {
  const goToSignup = useGoTo('Signup')
  const data = useSelector(s => s.session)
  const { traffic_max, traffic_used, username } = data
  const percentageUsed = (traffic_used / traffic_max) * 100
  const remainingDataBytes = bytes(traffic_max - traffic_used)

  const handleClick = async () => {
    if (username) {
      //TODO Implement separate, browser-agnostic service. Get rid of hardcoded url.
      const url = `${ENVS.PROD.ROOT_URL}/upgrade?pcpid=upgrade_ext1`
      await chrome.tabs.create({ url })
    } else {
      //ghost-mode
      goToSignup()
    }
  }

  return (
    <Box
      aria-label="Usage Bar"
      tabIndex={0}
      onClick={handleClick}
      bg="black"
      sx={{
        width: '100%',
        zIndex: 'bottomBar',
        cursor: 'pointer',
        '&:hover': {
          '.upgrade': {
            color: 'white',
          },
        },
      }}
      {...props}
    >
      <SpaceBetween>
        <Box
          sx={{
            height: '2px',
            width: `${100 - percentageUsed}%`,
          }}
          bg={getUsageColor(percentageUsed)}
        />
        <Box
          sx={{
            height: '2px',
            width: `${percentageUsed}%`,
          }}
          bg={getUsageColor(percentageUsed)}
          opacity=".25"
        />
      </SpaceBetween>
      <SpaceBetween
        px="16px"
        bg="black"
        sx={{
          alignItems: 'center',
          height: '24px',
        }}
      >
        {/* <WithTooltip tip={`${'Reset Date'}: ${addOneMonthToDate(last_reset)}`}> */}
        <Flex>
          <Branch
            if={traffic_max === ACCOUNT_PLAN.UNLIMITED}
            Then={<Text color="green">Unlimited</Text>}
            Else={
              <UsageText color={getUsageColor(percentageUsed)}>
                <Branch
                  if={parseFloat(remainingDataBytes) <= 0}
                  Then="Out of data"
                  Else={`${remainingDataBytes} ${'Left'}`}
                />
              </UsageText>
            }
          />
        </Flex>
        {/* </WithTooltip> */}
        <Button variant="simple" tabIndex={0} p="0px">
          <Text
            className="upgrade"
            sx={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'secondaryText',
              fontWeight: 'bold',
              transition: 'color 0.3s ease',
            }}
          >
            {username ? 'upgrade' : 'get more data'}
          </Text>
        </Button>
      </SpaceBetween>
    </Box>
  )
}

export default UsageBar
