import { useState } from 'react'
import { Box, Flex } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { GetNewButton, Header, OptionBox, ToggleSwitch } from 'components'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import { toggleWebRtcBlocker } from 'state/slices/webRtcEnabled'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import {
  ACTIVATE_SPLIT_PERSONALITY,
  TOGGLE_SPLIT_PERSONALITY,
} from 'state/slices/splitPersonalityEnabled'

import { setLocationWarp } from 'state/slices/locationWarp'
import { setWorkerBlock } from 'state/slices/workerBlock'
import DoNotDisturbIcon from 'assets/img/doNotDisturb.svg'
import WebRtcLeakIcon from 'assets/img/webRtcLeak.svg'
import SplitPersonalityIcon from 'assets/img/splitPersonality.svg'
import LanguageWarpIcon from 'assets/img/languageWarp.svg'
import LocationWarpIcon from 'assets/img/locationWarp.svg'
import WorkerBlockIcon from 'assets/img/workerBlock.svg'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const locationWarp = useSelector(s => s.locationWarp)
  const languageWarpEnabled = useSelector(s => s.languageWarpEnabled)
  const splitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const workerBlockEnabled = useSelector(s => s.workerBlock)
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  return (
    <Box data-testid="privacy-page" bg="background">
      <Header title="Privacy" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <Box mx="16px">
        <OptionBox
          Icon={DoNotDisturbIcon}
          path={'features/dnd'}
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
        <OptionBox
          Icon={WebRtcLeakIcon}
          path={'features/webrtc-slayer'}
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
        <OptionBox
          Icon={LanguageWarpIcon}
          path={'features/languagewarp'}
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
          path={'features/split-personality'}
          title="Split Personality"
          subTitle="Randomly rotates your user agent."
        >
          <Flex>
            {splitPersonalityEnabled && (
              <GetNewButton onClick={() => dispatchAlias(ACTIVATE_SPLIT_PERSONALITY)} />
            )}
            <ToggleSwitch
              onChange={() => dispatchAlias(TOGGLE_SPLIT_PERSONALITY)}
              checked={splitPersonalityEnabled}
            />
          </Flex>
        </OptionBox>
        <OptionBox
          Icon={LocationWarpIcon}
          path={'features/location-warp'}
          title="Location Warp"
          subTitle="Fakes your GPS location to match the connected proxy."
        >
          <ToggleSwitch
            onChange={() => dispatch(setLocationWarp(!locationWarp))}
            checked={locationWarp}
          />
        </OptionBox>
        <OptionBox
          Icon={WorkerBlockIcon}
          path={'features/worker-block'}
          title="Worker Block"
          subTitle="Blocks web workers from running in the background."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(setWorkerBlock(!workerBlockEnabled))
            }}
            checked={workerBlockEnabled}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Privacy
