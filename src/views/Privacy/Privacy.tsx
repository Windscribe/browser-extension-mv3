import { Box } from 'theme-ui'
import { useState } from 'react'

import { type ThemeUiElement } from 'utils/types'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { useDispatch, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import { toggleWebRtcBlocker } from 'state/slices/webRtcEnabled'
import DoNotDisturbIcon from 'assets/img/doNotDisturb.svg'
import WebRtcLeakIcon from 'assets/img/webRtcLeak.svg'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  return (
    <Box data-testid="privacy-page" bg="background">
      <Header title="Privacy" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <Box mx="16px">
        <OptionBox
          Icon={DoNotDisturbIcon}
          title="Do Not Disturb"
          subTitle="Block all sites from spamming you with notifications."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(toggleNotificationBlocker())
            }}
            checked={notificationBlockerEnabled}
          />
        </OptionBox>
      </Box>
      <Box mx="16px">
        <OptionBox
          Icon={WebRtcLeakIcon}
          title="WebRTC Slayer"
          subTitle="Limits WebRTC requests to prevent leaks. This may break some applications."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(toggleWebRtcBlocker())
            }}
            checked={webRtcEnabled}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Privacy
