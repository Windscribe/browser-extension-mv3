import { MouseEventHandler } from 'react'
import { Box, Button, Flex, Text, type ButtonProps } from 'theme-ui'
import bytes from 'bytes'

import { useSelector } from 'state/hooks'
import { SpaceBetween } from 'components/Flexbox'
import Branch from 'components/Branch'
import { ACCOUNT_PLAN, ENVS } from 'utils/constants'
import { useGoTo } from 'services/navigation'

const getUsageColor = (percentage: number) => {
  if (percentage < 50) return 'green'
  if (percentage < 75) return 'yellow'
  return 'red'
}

const UsageBar: React.FC<ButtonProps> = () => {
  const goToSignup = useGoTo('Signup')
  const data = useSelector(s => s.session)
  const { traffic_max = 0, traffic_used = 0, username } = data
  const percentageUsed = (traffic_used / traffic_max) * 100
  const remainingDataBytes = bytes(traffic_max - traffic_used)

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
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
    <Button
      variant="simple"
      aria-label="Usage Bar"
      tabIndex={0}
      onClick={handleClick}
      bg="black"
      sx={{
        width: '100%',
        '&:hover': {
          '.upgrade': {
            color: 'white',
          },
        },
      }}
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
              <Text
                sx={{
                  color: getUsageColor(percentageUsed),
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                <Branch
                  if={parseFloat(remainingDataBytes) <= 0}
                  Then="Out of data"
                  Else={`${remainingDataBytes} ${'Left'}`}
                />
              </Text>
            }
          />
        </Flex>
        {/* </WithTooltip> */}
        <Box>
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
        </Box>
      </SpaceBetween>
    </Button>
  )
}

export default UsageBar
