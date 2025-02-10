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
import InfoIcon from 'assets/img/infoIcon.svg'
import { doesBundleExistInBuild, registerScript, unregisterScript } from 'utils/scriptController'
import {
  CONTENT_SETTINGS,
  languageWarpScriptId,
  locationWarpScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'
import { SHA256 } from 'crypto-js'
import { getBundleNamePostFix } from 'utils/getBundleName'
import { getNearestValidDataCenter } from 'utils/getNearestValidLocation'
import { pushToDebugLog } from 'services/debugLog'
import { addOverlay } from 'state/slices/overlay'
import { useState } from 'react'

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
  const currentLocationTimezone = useSelector(s => s.currentLocation.tz)
  const adPrivacyEnabled = useSelector(s => s.adPrivacyEnabled)
  const allowList = useSelector(s => s.allowlist)
  const autopilot = useSelector(s => s.autopilot)
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const currentLocation = useSelector(s => s.currentLocation)
  const serverList = useSelector(s => s.servers.serverList)
  const isUserPro = useSelector(s => s.session.sessionData?.is_premium)

  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  const isContentSettingsGranted = useSelector(s => s.permissions.grantedPermissions).includes(
    CONTENT_SETTINGS,
  )

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
          <Flex
            sx={{
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {!isContentSettingsGranted && (
              <ToolTip
                childWrapperProps={{ sx: { height: 16 } }}
                message={'Click to grant permission.'}
              >
                <InfoIcon
                  sx={{ cursor: 'pointer', fill: 'primaryText' }}
                  onClick={async () => {
                    const enabled = await chrome.permissions.contains({
                      permissions: ['contentSettings'],
                    })

                    if (!enabled) {
                      dispatch(addOverlay('notificationBlockerPermission'))
                    }
                  }}
                >
                  Grant permission
                </InfoIcon>
              </ToolTip>
            )}

            <ToggleSwitch
              disabled={!isContentSettingsGranted}
              message="Unavailable until permission is granted."
              onChange={async () => {
                dispatch(toggleNotificationBlocker())
                showReloadAlert(true)
              }}
              checked={notificationBlockerEnabled}
            />
          </Flex>
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
            onChange={async () => {
              showReloadAlert(true)
              const isLocationWarpActive = !locationWarp
              dispatch(setLocationWarp(isLocationWarpActive))

              const dataCenterId = currentDataCenter.id

              if (autopilot.autopilotSelected) return
              if (dataCenterId === undefined || dataCenterId === null) return

              const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)

              if (isLocationWarpActive) {
                const bundleFileName =
                  SHA256(dataCenterId.toString()) +
                  getBundleNamePostFix('locationWarpScript') +
                  '.bundle.js'

                const bundleExists = await doesBundleExistInBuild(bundleFileName)

                if (bundleExists) {
                  await registerScript(
                    locationWarpScriptId,
                    [bundleFileName],
                    excludeMatchesFromAllowList,
                  )
                } else {
                  const possibleNearestDataCenterId = await getNearestValidDataCenter(
                    dataCenterId,
                    serverList,
                    currentDataCenter,
                    isUserPro,
                    'locationWarpScript',
                  )

                  if (
                    possibleNearestDataCenterId !== undefined &&
                    possibleNearestDataCenterId !== null
                  ) {
                    const bundleFileName =
                      SHA256(possibleNearestDataCenterId.toString()) +
                      getBundleNamePostFix('locationWarpScript') +
                      '.bundle.js'

                    await registerScript(
                      locationWarpScriptId,
                      [bundleFileName],
                      excludeMatchesFromAllowList,
                    )
                  } else {
                    await pushToDebugLog({
                      message: 'Could not find any fallback data center',
                      tag: 'popup',
                      level: 'ERROR',
                    })
                  }
                }
              } else {
                await unregisterScript(locationWarpScriptId)
              }
            }}
            checked={locationWarp}
            disabled={autopilot.autopilotSelected}
            message="Not Available in Autopilot"
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
            {timeWarpEnabled && !autopilot.autopilotSelected && (
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
              onChange={async () => {
                const isTimeWarpActive = !timeWarpEnabled
                dispatch(setTimeWarpEnabled(isTimeWarpActive))

                const locationId = currentLocation.id

                if (autopilot.autopilotSelected) return
                if (locationId === undefined || locationId === null) return

                const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)

                if (isTimeWarpActive) {
                  await registerScript(
                    timeZoneWarpScriptId,
                    [
                      SHA256(locationId.toString()) +
                        getBundleNamePostFix('timeZoneWarpScript') +
                        '.bundle.js',
                    ],
                    excludeMatchesFromAllowList,
                  )
                } else {
                  await unregisterScript(timeZoneWarpScriptId)
                }
              }}
              checked={timeWarpEnabled}
              disabled={autopilot.autopilotSelected}
              message="Not Available in Autopilot"
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
            onChange={async () => {
              showReloadAlert(true)
              const isLanguageWarpActive = !languageWarpEnabled
              dispatch(setLanguageWarpEnabled(isLanguageWarpActive))
              const locationId = currentLocation.id

              if (autopilot.autopilotSelected) return
              if (locationId === undefined || locationId === null) return

              const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)

              if (isLanguageWarpActive) {
                await registerScript(
                  languageWarpScriptId,
                  [
                    SHA256(locationId.toString()) +
                      getBundleNamePostFix('languageWarpScript') +
                      '.bundle.js',
                  ],
                  excludeMatchesFromAllowList,
                )
              } else {
                await unregisterScript(languageWarpScriptId)
              }
            }}
            checked={languageWarpEnabled}
            disabled={autopilot.autopilotSelected}
            data-testid="language-warp-toggle"
            message="Not Available in Autopilot"
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
            onChange={async () => {
              showReloadAlert(true)
              const isWorkerBlockEnabled = !workerBlockEnabled
              dispatch(setWorkerBlock(isWorkerBlockEnabled))
              const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)

              if (isWorkerBlockEnabled) {
                await registerScript(
                  workerBlockScriptId,
                  ['workerBlockContentScript.bundle.js'],
                  excludeMatchesFromAllowList,
                )
              } else {
                await unregisterScript(workerBlockScriptId)
              }
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
