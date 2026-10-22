import { Box, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { GetNewButton, OptionBox, ToggleSwitch, Header, ScrollableBox } from 'components'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import { toggleWebRtcBlocker } from 'state/slices/webRtcEnabled'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import {
  activateSplitPersonality,
  TOGGLE_SPLIT_PERSONALITY,
} from 'state/slices/splitPersonalityEnabled'
import { setSplitPersonalityCompatMode } from 'state/slices/splitPersonalityCompatMode'
import { setTimeWarpEnabled } from 'state/slices/timeWarpEnabled'
import { setLocationWarp } from 'state/slices/locationWarp'
import { setWorkerBlock } from 'state/slices/workerBlock'
import { setAdPrivacyEnabled } from 'state/slices/adPrivacyEnabled'
import { setUrlCleanerEnabled } from 'state/slices/urlCleanerEnabled'
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
import IncognitoIcon from 'assets/img/incognito.svg'
import UrlCleanerIcon from 'assets/img/link.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import { doesBundleExistInBuild, registerScript, unregisterScript } from 'utils/scriptController'
import {
  audioAntiFingerprintingScriptId,
  canvasAntiFingerprintingScriptId,
  CONTENT_SETTINGS,
  fingerprintjsAntiFingerprintingScriptId,
  fingerprintMessageListenerScriptId,
  fontAntiFingerprintingScriptId,
  languageWarpScriptId,
  locationWarpScriptId,
  screenResAntiFingerprintingScriptId,
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
import { setAntiFingerprinting } from 'state/slices/antiFingerprinting'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import { useGoTo } from 'services/navigation'
import {
  enableUrlCleaner,
  disableUrlCleaner,
} from 'services/declarativeNetRequest/updateDynamicRules'
import { getPrivacyFeatureEnabledDomains } from 'utils/networkSpoofing'
import { getLinkSanitizerRemoveParamsFromState } from 'utils/linkSanitizerParams'
import { useIsUblockLiteStatus } from 'services/detectUblock'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)
  const webRtcEnabled = useSelector(s => s.webRtcEnabled)
  const locationWarp = useSelector(s => s.locationWarp)
  const languageWarpEnabled = useSelector(s => s.languageWarpEnabled)
  const timeWarpEnabled = useSelector(s => s.timeWarpEnabled)
  const splitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const splitPersonalityCompatMode = useSelector(s => s.splitPersonalityCompatMode)
  const workerBlockEnabled = useSelector(s => s.workerBlock)
  const currentLocationTimezone = useSelector(s => s.currentLocation.tz)
  const adPrivacyEnabled = useSelector(s => s.adPrivacyEnabled)
  const urlCleanerEnabled = useSelector(s => s.urlCleanerEnabled)
  const linkSanitizer = useSelector(s => s.linkSanitizer)
  const allowList = useSelector(s => s.allowlist)
  const autopilot = useSelector(s => s.autopilot)
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const currentLocation = useSelector(s => s.currentLocation)
  const serverList = useSelector(s => s.servers.serverList)
  const isUserPro = useSelector(s => s.session.sessionData?.is_premium)
  const antiFingerprintingActive = useSelector(s => s.antiFingerprinting)
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const goToLinkSanitizer = useGoTo('LinkSanitizer')
  const ublockStatus = useIsUblockLiteStatus()
  const showUblockWarningAtLinkSanitizer = useSelector(
    s => s.blocker.showUblockWarningAtLinkSanitizer !== false,
  )

  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  const isContentSettingsGranted = useSelector(s => s.permissions.grantedPermissions).includes(
    CONTENT_SETTINGS,
  )

  return (
    <Box data-testid={'privacy-page'} bg="background">
      <Header
        title={getLocalizedMessage('wsext_privacy', currentLanguage)}
        {...{ shouldShowReloadAlert, showReloadAlert }}
      />
      <ScrollableBox>
        <OptionBox
          Icon={DoNotDisturbIcon}
          path={'features/dnd'}
          title={getLocalizedMessage('wsext_do_not_disturb', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_do_not_disturb_description', currentLanguage)}
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
                message={getLocalizedMessage('wsext_click_to_grant_permission', currentLanguage)}
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
                  {getLocalizedMessage('wsext_grant_permission', currentLanguage)}
                </InfoIcon>
              </ToolTip>
            )}

            <ToggleSwitch
              disabled={!isContentSettingsGranted}
              message={getLocalizedMessage(
                'wsext_unavailable_until_permission_granted',
                currentLanguage,
              )}
              onChange={async () => {
                dispatch(toggleNotificationBlocker())
                showReloadAlert(true)
              }}
              checked={notificationBlockerEnabled}
            />
          </Flex>
        </OptionBox>

        <OptionBox
          Icon={IncognitoIcon}
          path={'features/anti-fingerprinting'}
          title={getLocalizedMessage('wsext_anti_fingerprinting', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_anti_fingerprinting_description', currentLanguage)}
        >
          <ToggleSwitch
            onChange={async () => {
              showReloadAlert(true)
              const isAntiFingerprintingActive = !antiFingerprintingActive
              dispatch(setAntiFingerprinting(isAntiFingerprintingActive))
              const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)

              if (isAntiFingerprintingActive) {
                await registerScript(
                  fontAntiFingerprintingScriptId,
                  ['fontAntiFingerprinting.bundle.js'],
                  excludeMatchesFromAllowList,
                )

                await registerScript(
                  screenResAntiFingerprintingScriptId,
                  ['screenResAntiFingerprinting.bundle.js'],
                  excludeMatchesFromAllowList,
                )

                await registerScript(
                  canvasAntiFingerprintingScriptId,
                  ['canvasAntiFingerprinting.bundle.js'],
                  excludeMatchesFromAllowList,
                )

                await registerScript(
                  audioAntiFingerprintingScriptId,
                  ['audioAntiFingerprinting.bundle.js'],
                  excludeMatchesFromAllowList,
                )

                await registerScript(
                  fingerprintjsAntiFingerprintingScriptId,
                  ['fingerprintjsAntiFingerprinting.bundle.js'],
                  excludeMatchesFromAllowList,
                )

                await registerScript(
                  fingerprintMessageListenerScriptId,
                  ['fingerprintMessageListener.bundle.js'],
                  excludeMatchesFromAllowList,
                  'ISOLATED',
                )
              } else {
                await unregisterScript(fontAntiFingerprintingScriptId)
                await unregisterScript(screenResAntiFingerprintingScriptId)
                await unregisterScript(canvasAntiFingerprintingScriptId)
                await unregisterScript(audioAntiFingerprintingScriptId)
                await unregisterScript(fingerprintjsAntiFingerprintingScriptId)
                await unregisterScript(fingerprintMessageListenerScriptId)
              }
            }}
            checked={antiFingerprintingActive}
          />
        </OptionBox>

        <OptionBox
          Icon={WebRtcLeakIcon}
          path={'features/webrtc-slayer'}
          title={getLocalizedMessage('wsext_webrtc_slayer', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_webrtc_slayer_description', currentLanguage)}
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
          title={getLocalizedMessage('wsext_location_warp', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_location_warp_description', currentLanguage)}
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
            message={getLocalizedMessage('wsext_not_available_in_autopilot', currentLanguage)}
            data-testid="location-warp-toggle"
          />
        </OptionBox>
        <OptionBox
          Icon={TimeWarpIcon}
          path={'features/timezone-spoofing'}
          title={getLocalizedMessage('wsext_time_warp', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_time_warp_description', currentLanguage)}
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
              message={getLocalizedMessage('wsext_not_available_in_autopilot', currentLanguage)}
            />
          </Flex>
        </OptionBox>
        <OptionBox
          Icon={LanguageWarpIcon}
          path={'features/languagewarp'}
          title={getLocalizedMessage('wsext_language_warp', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_language_warp_description', currentLanguage)}
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
            message={getLocalizedMessage('wsext_not_available_in_autopilot', currentLanguage)}
          />
        </OptionBox>
        <OptionBox
          Icon={SplitPersonalityIcon}
          path={'features/split-personality'}
          title={getLocalizedMessage('wsext_split_personality', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_split_personality_description', currentLanguage)}
        >
          <Flex sx={{ gap: '8px', alignItems: 'center' }}>
            {splitPersonalityEnabled && (
              <Box sx={{ maxHeight: '16px' }}>
                <ToolTip message={getLocalizedMessage('wsext_rotate_user_agent', currentLanguage)}>
                  <GetNewButton
                    onClick={() => {
                      showReloadAlert(true)
                      dispatch(activateSplitPersonality(splitPersonalityCompatMode))
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
          Icon={SplitPersonalityIcon}
          path={'features/split-personality'}
          title={getLocalizedMessage('wsext_split_personality_compat_mode', currentLanguage)}
          subTitle={getLocalizedMessage(
            'wsext_split_personality_compat_mode_description',
            currentLanguage,
          )}
        >
          <Flex sx={{ gap: '8px', alignItems: 'center' }}>
            <ToggleSwitch
              disabled={!splitPersonalityEnabled}
              message={getLocalizedMessage(
                'wsext_not_available_when_split_personality_disabled',
                currentLanguage,
              )}
              onChange={() => {
                const isCompatMode = !splitPersonalityCompatMode

                dispatch(setSplitPersonalityCompatMode(isCompatMode))

                dispatch(activateSplitPersonality(isCompatMode))

                showReloadAlert(true)
              }}
              checked={splitPersonalityCompatMode}
            />
          </Flex>
        </OptionBox>

        <OptionBox
          Icon={WorkerBlockIcon}
          path={'features/worker-block'}
          title={getLocalizedMessage('wsext_worker_block', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_worker_block_description', currentLanguage)}
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
          title={getLocalizedMessage('wsext_ad_privacy', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_ad_privacy_description', currentLanguage)}
        >
          <ToggleSwitch
            onChange={() => {
              showReloadAlert(true)
              dispatch(setAdPrivacyEnabled(!adPrivacyEnabled))
            }}
            checked={adPrivacyEnabled}
          />
        </OptionBox>

        <Box onClick={goToLinkSanitizer} sx={{ cursor: 'pointer' }}>
          <OptionBox
            Icon={UrlCleanerIcon}
            path={'features/link-sanitizer'}
            title={getLocalizedMessage('wsext_link_sanitizer', currentLanguage)}
            subTitle={
              ublockStatus.status === 'enabled' ? (
                <>
                  <Box>
                    {getLocalizedMessage('wsext_link_sanitizer_description', currentLanguage)}
                  </Box>
                  <Box sx={{ mt: '8px' }}>
                    {getLocalizedMessage('wsext_link_sanitizer_ublock_warning', currentLanguage)}
                  </Box>
                </>
              ) : (
                getLocalizedMessage('wsext_link_sanitizer_description', currentLanguage)
              )
            }
          >
            <Flex
              sx={{
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box
                onClick={event => {
                  event.stopPropagation()
                }}
              >
                <ToggleSwitch
                  onChange={async () => {
                    showReloadAlert(true)
                    const isUrlCleanerActive = !urlCleanerEnabled
                    dispatch(setUrlCleanerEnabled(isUrlCleanerActive))

                    if (isUrlCleanerActive) {
                      await enableUrlCleaner(
                        getPrivacyFeatureEnabledDomains(allowList),
                        getLinkSanitizerRemoveParamsFromState(linkSanitizer),
                      )
                    } else {
                      await disableUrlCleaner()
                    }

                    if (
                      ublockStatus.status === 'enabled' &&
                      showUblockWarningAtLinkSanitizer
                    ) {
                      dispatch(addOverlay('ublockLinkSanitizer'))
                    }
                  }}
                  checked={urlCleanerEnabled}
                />
              </Box>
              <ArrowRightIcon
                sx={{
                  fill: 'secondaryText',
                }}
              />
            </Flex>
          </OptionBox>
        </Box>
      </ScrollableBox>
    </Box>
  )
}

export default Privacy
