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
import { getLocalizedMessage } from 'utils/getLocalisedString'

const failoverLabelKey = (value: FailoverOption) => {
  switch (value) {
    case 'Auto / Best':
      return 'wsext_failover_auto_best'
    case 'Same Country':
      return 'wsext_failover_same_country'
    case 'None':
      return 'wsext_failover_none'
  }
}

const Connection: ThemeUiElement = () => {
  const autoConnect = useSelector(s => s.connection.autoConnect)
  const smokewall = useSelector(s => s.connection.smokeWall)
  const failover = useSelector(s => s.connection.failover)
  const proxyPort = useSelector(s => s.proxyPort)
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const dispatch = useDispatch()

  return (
    <Box data-testid="connection-page" bg="background">
      <Header title={getLocalizedMessage('wsext_connection', currentLanguage)} />
      <Box mx="16px">
        <OptionBox
          Icon={AutoConnectIcon}
          title={getLocalizedMessage('wsext_auto_connect', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_auto_connect_description', currentLanguage)}
        >
          <ToggleSwitch
            onChange={() => dispatch(setAutoConnect(!autoConnect))}
            checked={autoConnect}
          />
        </OptionBox>
        <OptionBox
          Icon={SmokewallIcon}
          title={getLocalizedMessage('wsext_smokewall', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_smokewall_description', currentLanguage)}
        >
          <ToggleSwitch onChange={() => dispatch(setSmokeWall(!smokewall))} checked={smokewall} />
        </OptionBox>
        <OptionBox
          Icon={FailoverIcon}
          title={getLocalizedMessage('wsext_failover', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_failover_description', currentLanguage)}
        >
          <DropDown
            current={failover}
            items={['Auto / Best', 'Same Country', 'None'] as FailoverOption[]}
            onItemClick={(value: FailoverOption) => dispatch(setFailover(value))}
            getLabel={value => getLocalizedMessage(failoverLabelKey(value), currentLanguage)}
          />
        </OptionBox>
        <OptionBox
          Icon={ProxyPortIcon}
          title={getLocalizedMessage('wsext_proxy_port', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_proxy_port_description', currentLanguage)}
        >
          <DropDown
            current={proxyPort}
            items={[443, 9443] as ProxyPort[]}
            onItemClick={(value: ProxyPort) => dispatch(setProxyPort(value))}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Connection
