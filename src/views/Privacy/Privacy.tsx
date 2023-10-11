import { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { GetNewButton, OptionBox, ToggleSwitch, Header, ScrollableBox } from 'components'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import { toggleWebRtcBlocker } from 'state/slices/webRtcEnabled'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import {
  ACTIVATE_SPLIT_PERSONALITY,
  TOGGLE_SPLIT_PERSONALITY,
} from 'state/slices/splitPersonalityEnabled'
import { setTimeWarpEnabled } from 'state/slices/timeWarpEnabled'
import { setLocationWarp } from 'state/slices/locationWarp'
import { setWorkerBlock } from 'state/slices/workerBlock'
import { setAdPrivacyEnabled } from 'state/slices/adPrivacyEnabled'
import ToolTip from 'components/ToolTip'
import getTimeZoneInfo from 'utils/getTimeZoneInfo'

import DoNotDisturbIcon from 'assets/img/doNotDisturb.svg'
import WebRtcLeakIcon from 'assets/img/webRtcLeak.svg'
import SplitPersonalityIcon from 'assets/img/splitPersonality.svg'
import LanguageWarpIcon from 'assets/img/languageWarp.svg'
import LocationWarpIcon from 'assets/img/locationWarp.svg'
import WorkerBlockIcon from 'assets/img/workerBlock.svg'
import TimeWarpIcon from 'assets/img/timeWarp.svg'
import TimeIcon from 'assets/img/time.svg'
import AdPrivacyIcon from 'assets/img/adPrivacy.svg'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const locationWarp = useSelector(s => s.locationWarp)
  const languageWarpEnabled = useSelector(s => s.languageWarpEnabled)
  const timeWarpEnabled = useSelector(s => s.timeWarpEnabled)
  const splitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const workerBlockEnabled = useSelector(s => s.workerBlock)
  const autopilotSelected = useSelector(s => s.autopilot.autopilotSelected)
  const currentLocationTimezone = useSelector(s => s.currentLocation.tz)
  const adPrivacyEnabled = useSelector(s => s.adPrivacyEnabled)

  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  return (
    <Box data-testid={'privacy-page'} bg="background">
      <Header title="Privacy" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <ScrollableBox>
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
          Icon={LocationWarpIcon}
          path={'features/location-warp'}
          title="Location Warp"
          subTitle="Fakes your GPS location to match the connected proxy."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(setLocationWarp(!locationWarp))
            }}
            checked={locationWarp}
            disabled={autopilotSelected}
            data-testid="location-warp-toggle"
          />
        </OptionBox>
        <OptionBox
          Icon={TimeWarpIcon}
          path={'features/timezone-spoofing'}
          title="Time Warp"
          subTitle="Sets your browser time to match the connected proxy."
        >
          <Flex sx={{ gap: '8px', alignItems: 'center' }}>
            {timeWarpEnabled && !autopilotSelected && (
              <Box sx={{ maxHeight: '16px' }}>
                <ToolTip message={getTimeZoneInfo(currentLocationTimezone)}>
                  <TimeIcon
                    sx={{
                      fill: 'primaryText',
                    }}
                  />
                </ToolTip>
              </Box>
            )}
            <ToggleSwitch
              onChange={() => dispatch(setTimeWarpEnabled(!timeWarpEnabled))}
              checked={timeWarpEnabled}
              disabled={autopilotSelected}
            />
          </Flex>
        </OptionBox>
        <OptionBox
          Icon={LanguageWarpIcon}
          path={'features/languagewarp'}
          title="Language Warp"
          subTitle="Sets your language and locale settings to match the connected proxy."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(setLanguageWarpEnabled(!languageWarpEnabled))
            }}
            checked={languageWarpEnabled}
            disabled={autopilotSelected}
            data-testid="language-warp-toggle"
          />
        </OptionBox>
        <OptionBox
          Icon={SplitPersonalityIcon}
          path={'features/split-personality'}
          title="Split Personality"
          subTitle="Randomly rotates your user agent."
        >
          <Flex sx={{ gap: '8px', alignItems: 'center' }}>
            {splitPersonalityEnabled && (
              <Box sx={{ maxHeight: '16px' }}>
                <ToolTip message="Rotate User Agent">
                  <GetNewButton
                    onClick={() => {
                      showReloadAlert(true)
                      dispatchAlias(ACTIVATE_SPLIT_PERSONALITY)
                    }}
                  />
                </ToolTip>
              </Box>
            )}
            <ToggleSwitch
              onChange={() => {
                showReloadAlert(true)
                dispatchAlias(TOGGLE_SPLIT_PERSONALITY)
              }}
              checked={splitPersonalityEnabled}
            />
          </Flex>
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
        <OptionBox
          Icon={AdPrivacyIcon}
          // path={'features/worker-block'}
          title="Ad Privacy"
          subTitle="Disable contextual ad topics and suggestions."
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(setAdPrivacyEnabled(!adPrivacyEnabled))
            }}
            checked={adPrivacyEnabled}
          />
        </OptionBox>
      </ScrollableBox>
    </Box>
  )
}

export default Privacy
