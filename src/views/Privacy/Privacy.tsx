import { Box } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { useDispatch, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import { toggleWebRtcBlocker } from 'state/slices/webRtcEnabled'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import { toggleSplitPersonality } from 'state/slices/splitPersonalityEnabled'

import { setLocationWarp } from 'state/slices/locationWarp'
import DoNotDisturbIcon from 'assets/img/doNotDisturb.svg'
import WebRtcLeakIcon from 'assets/img/webRtcLeak.svg'
import SplitPersonalityIcon from 'assets/img/splitPersonality.svg'
import LanguageWarpIcon from 'assets/img/languageWarp.svg'
import LocationWarpIcon from 'assets/img/locationWarp.svg'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const locationWarp = useSelector(s => s.locationWarp)
  const languageWarpEnabled = useSelector(s => s.languageWarpEnabled)
  const splitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)

  return (
    <Box data-testid="privacy-page" bg="background">
      <Header title="Privacy" />
      <Box mx="16px">
        <OptionBox
          Icon={DoNotDisturbIcon}
          title="Do Not Disturb"
          subTitle="Block all sites from spamming you with notifications."
        >
          <ToggleSwitch
            onChange={() => dispatch(toggleNotificationBlocker())}
            checked={notificationBlockerEnabled}
          />
        </OptionBox>
        <OptionBox
          Icon={WebRtcLeakIcon}
          title="WebRTC Slayer"
          subTitle="Limits WebRTC requests to prevent leaks. This may break some applications."
        >
          <ToggleSwitch onChange={() => dispatch(toggleWebRtcBlocker())} checked={webRtcEnabled} />
        </OptionBox>
        <OptionBox
          Icon={LanguageWarpIcon}
          title="Language Warp"
          subTitle="Sets your language and locale settings to match the connected proxy."
        >
          <ToggleSwitch
            onChange={() => dispatch(setLanguageWarpEnabled(!languageWarpEnabled))}
            checked={languageWarpEnabled}
          />
        </OptionBox>
        <OptionBox
          Icon={SplitPersonalityIcon}
          title="Split Personality"
          subTitle="Randomly rotates your user agent."
        >
          <ToggleSwitch
            onChange={() => dispatch(toggleSplitPersonality())}
            checked={splitPersonalityEnabled}
          />
        </OptionBox>
      </Box>
      <Box mx="16px">
        <OptionBox
          Icon={LocationWarpIcon}
          title="Location Warp"
          subTitle="Fakes your GPS location to match the connected proxy."
        >
          <ToggleSwitch
            onChange={() => dispatch(setLocationWarp(!locationWarp))}
            checked={locationWarp}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Privacy
