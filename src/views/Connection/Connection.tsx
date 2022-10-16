import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, DropDown } from 'components'
import { setFailover } from 'state/slices/connection'
import FailoverIcon from 'assets/img/failover.svg'
import SmokewallIcon from 'assets/img/smokewall.svg'

const Account: ThemeUiElement = () => {
  const failover = useSelector(s => s.connection.failover)

  return (
    <Box data-testid="connection-page" bg="background">
      <Header title="Connection" />
      <Box sx={{ mx: '16px' }}>
        <OptionBox
          Icon={SmokewallIcon}
          title="Smokewall"
          subTitle="Do not disconnect even on proxy failure."
        >
          <ToggleSwitch />
        </OptionBox>
        <OptionBox
          Icon={FailoverIcon}
          title="Failover"
          subTitle="On proxy failure, auto switch locations."
        >
          <DropDown
            current={failover}
            items={['Auto / Best', 'Same Country', 'None']}
            setValue={setFailover}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Account
