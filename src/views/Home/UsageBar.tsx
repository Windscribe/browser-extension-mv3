import { MouseEventHandler } from 'react'
import { Box, Button, Flex, Text, type ButtonProps } from 'theme-ui'
import bytes from 'bytes'
import { useSelector } from 'state/hooks'
import { SpaceBetween } from 'components/Flexbox'
import { ACCOUNT_PLAN, ENVS } from 'utils/constants'

const getUsageColor = (percentage: number) => {
  if (percentage < 50) return 'neonGreen'
  if (percentage < 75) return 'lemonYellow'
  return 'rubyRed'
}

const UsageBar: React.FC<ButtonProps> = () => {
  const traffic_max = useSelector(s => s.session.sessionData?.traffic_max) || 0
  const traffic_used = useSelector(s => s.session.sessionData?.traffic_used) || 0
  const username = useSelector(s => s.session.sessionData?.username)

  const percentageUsed = (traffic_used / traffic_max) * 100
  const remainingDataBytes = bytes(traffic_max - traffic_used)

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    const url = `${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`
    await chrome.tabs.create({ url })
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
        display: 'block',
        borderRadius: 0,
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
          {traffic_max === ACCOUNT_PLAN.UNLIMITED ? (
            <Text color="green">Unlimited</Text>
          ) : (
            <Text
              sx={{
                color: getUsageColor(percentageUsed),
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {`${remainingDataBytes} ${'Left'}`}
            </Text>
          )}
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
