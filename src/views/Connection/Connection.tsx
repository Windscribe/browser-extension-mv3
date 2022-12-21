import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, DropDown } from 'components'
import { setSmokeWall, setFailover } from 'state/slices/connection'
import FailoverIcon from 'assets/img/failover.svg'
import SmokewallIcon from 'assets/img/smokewall.svg'

const Connection: ThemeUiElement = () => {
  const smokewall = useSelector(s => s.connection.smokeWall)
  const failover = useSelector(s => s.connection.failover)
  const dispatch = useDispatch()

  return (
    <Box data-testid="connection-page" bg="background">
      <Header title="Connection" />
      <Box mx="16px">
        <OptionBox
          Icon={SmokewallIcon}
          title="Smokewall"
          subTitle="Do not disconnect even on proxy failure."
        >
          <ToggleSwitch onChange={() => dispatch(setSmokeWall(!smokewall))} checked={smokewall} />
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

export default Connection
