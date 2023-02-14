import { Box } from 'theme-ui'

import type { FailoverOption, ProxyPort, ThemeUiElement } from 'utils/types'
import { useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, DropDown } from 'components'
import { setFailover } from 'state/slices/connection'
import { setProxyPort } from 'state/slices/proxyPort'
import FailoverIcon from 'assets/img/failover.svg'
import SmokewallIcon from 'assets/img/smokewall.svg'
import ProxyPortIcon from 'assets/img/proxyPort.svg'

const Connection: ThemeUiElement = () => {
  const failover = useSelector(s => s.connection.failover)
  const proxyPort = useSelector(s => s.proxyPort)

  return (
    <Box data-testid="connection-page" bg="background">
      <Header title="Connection" />
      <Box mx="16px">
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
