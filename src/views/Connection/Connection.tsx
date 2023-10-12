import { Box } from 'theme-ui'

import { setProxyPort } from 'state/slices/proxyPort'
import { useDispatch, useSelector } from 'state/hooks'
import { setAutoConnect, setSmokeWall, setFailover } from 'state/slices/connection'
import { Header, OptionBox, ToggleSwitch, DropDown } from 'components'
import type { FailoverOption, ProxyPort, ThemeUiElement } from 'utils/types'

import AutoConnectIcon from 'assets/img/autoconnecticon.svg'
import FailoverIcon from 'assets/img/failover.svg'
import SmokewallIcon from 'assets/img/smokewall.svg'
import ProxyPortIcon from 'assets/img/proxyPort.svg'

const Connection: ThemeUiElement = () => {
  const autoConnect = useSelector(s => s.connection.autoConnect)
  const smokewall = useSelector(s => s.connection.smokeWall)
  const failover = useSelector(s => s.connection.failover)
  const proxyPort = useSelector(s => s.proxyPort)
  const dispatch = useDispatch()

  return (
    <Box data-testid="connection-page" bg="background">
      <Header title="Connection" />
      <Box mx="16px">
        <OptionBox
          Icon={AutoConnectIcon}
          title="Auto-Connect"
          subTitle="Automatically connect on browser start."
        >
          <ToggleSwitch
            onChange={() => dispatch(setAutoConnect(!autoConnect))}
            checked={autoConnect}
          />
        </OptionBox>
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
            items={['Auto / Best', 'Same Country', 'None'] as FailoverOption[]}
            setValue={setFailover}
          />
        </OptionBox>
        <OptionBox
          Icon={ProxyPortIcon}
          title="Proxy Port"
          subTitle="Select which port to connect with."
        >
          <DropDown
            current={proxyPort}
            items={[443, 9443] as ProxyPort[]}
            setValue={setProxyPort}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Connection
