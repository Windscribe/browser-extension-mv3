import { useRef, useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'

import { ENVS } from 'utils/constants'
import { pushToDebugLog, sendDebugLog } from 'services/debugLog'
import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, ScrollableBox, DropDown } from 'components'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { setLocationLoad } from 'state/slices/locationLoad'

import LinkIcon from 'assets/img/link.svg'
import EllipseIcon from 'assets/img/ellipse.svg'
import DebugLogIcon from 'assets/img/debugLog.svg'
import DebugMenuIcon from 'assets/img/debugMenu.svg'
import NotificationsIcon from 'assets/img/notifications.svg'
import LocationLoadIcon from 'assets/img/locationLoad.svg'
import LanguageIcon from 'assets/img/languages.svg'
import {
  getLocalizedMessage,
  localeNativeLabels,
  SupportedLocaleOptions,
  supportedLocaleOptions,
} from 'utils/getLocalisedString'
import { setCurrentLanguageSelection } from 'state/slices/currentLanguage'
import ImportExportIcon from 'assets/img/importExport.svg'

import { useManageAllowlist } from 'components/hooks'
import { exportSettings } from 'services/importExport/exportSettings'
import { importSettings } from 'services/importExport/importSettings'
import { addOverlay } from 'state/slices/overlay'
import getErrorMessage from 'utils/getErrorMessage'
import { getFileExtension } from 'utils/getFileExtension'
import KeyboardIcon from 'assets/img/keyboard.svg'

const General: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const contextMenu = useSelector(s => s.contextMenu)
  const sessionData = useSelector(s => s.session.sessionData)
  const allowSystemNotifications = useSelector(s => s.allowSystemNotifications)
  const locationLoad = useSelector(s => s.locationLoad)
  const { currentLanguage, currentSelection } = useSelector(s => s.currentLanguage)

  const state = useSelector(s => s)
  const serverList = useSelector(s => s.servers.serverList)
  const existingAllowList = useSelector(s => s.allowlist)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToAllowlist } = useManageAllowlist()
  const favoriteLocations = useSelector(s => s.favoriteLocations)
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)
  const isSplitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const spoofedUserAgent = useSelector(s => s.userAgent.spoofed)
  const isUrlCleanerEnabled = useSelector(s => s.urlCleanerEnabled)
  const linkSanitizer = useSelector(s => s.linkSanitizer)

  const autopilot = useSelector(s => s.autopilot)
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const currentLocation = useSelector(s => s.currentLocation)

  const isUserPro = useSelector(s => s.session.sessionData?.is_premium)

  const [sentDebugLog, setSentDebugLog] = useState<string | undefined>(undefined)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      pushToDebugLog({
        message: 'File not found when importing settings',
        level: 'WARN',
      })
      return
    }

    // check if uploaded settigs file is the correct extension, note you can only perform **real** validation on the server side only
    // BUT using zod schema validators is the next best thing on the client side.

    const fileName = fileInputRef.current?.value

    if (!fileName) {
      pushToDebugLog({
        message: 'No file name found in input',
        level: 'WARN',
      })
      return
    }

    const fileExtension = getFileExtension(fileName)

    if (fileExtension !== 'json') {
      pushToDebugLog({
        message: 'File extension is not json',
        data: JSON.stringify(fileExtension),
        level: 'WARN',
      })
      dispatch(addOverlay('wrongFileExtension'))
      return
    }

    try {
      await importSettings({
        file,
        serverList,
        existingAllowList,
        addToAllowlist,
        favoriteLocations,
        dispatch,
        autopilotSelected: autopilot.autopilotSelected,
        isUserPro: isUserPro,
        currentDataCenter,
        locationId: currentLocation.id,
        isSplitPersonalityEnabled,
        spoofedUserAgent,
        isUrlCleanerEnabled,
        linkSanitizer,
      })
      showReloadAlert(true)
    } catch (err) {
      // show overlays etc
      dispatch(addOverlay('errorDuringImport'))
      const message = getErrorMessage(err)
      pushToDebugLog({
        message: message,
        level: 'ERROR',
      })
    }
  }

  return (
    <Box data-testid="general-page" bg="background">
      <Header
        title={getLocalizedMessage('wsext_general', currentLanguage)}
        {...{ shouldShowReloadAlert, showReloadAlert }}
      />
      <ScrollableBox>
        <OptionBox
          Icon={NotificationsIcon}
          title={getLocalizedMessage('wsext_notifications', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_show_connect_disconnect_notifications', currentLanguage)}
        >
          <ToggleSwitch
            onChange={() => dispatch(setAllowSystemNotifications(!allowSystemNotifications))}
            checked={allowSystemNotifications}
          />
        </OptionBox>
        <OptionBox
          Icon={LocationLoadIcon}
          title={getLocalizedMessage('wsext_show_location_load', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_show_location_load_description', currentLanguage)}
        >
          <ToggleSwitch
            onChange={() => dispatch(setLocationLoad(!locationLoad))}
            checked={locationLoad}
          />
        </OptionBox>
        <OptionBox
          Icon={DebugMenuIcon}
          title={getLocalizedMessage('wsext_debug_context_menu', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_debug_context_menu_description', currentLanguage)}
        >
          <ToggleSwitch
            onChange={() => dispatch(showDebugContextMenu(!contextMenu))}
            checked={contextMenu}
          />
        </OptionBox>

        <OptionBox
          Icon={LanguageIcon}
          title={getLocalizedMessage('wsext_language', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_language_description', currentLanguage)}
        >
          <DropDown
            current={currentSelection}
            items={supportedLocaleOptions}
            getLabel={(value: SupportedLocaleOptions) =>
              value === 'system'
                ? getLocalizedMessage('wsext_system', currentLanguage)
                : localeNativeLabels[value]
            }
            menuMaxHeight={240}
            onItemClick={(val: SupportedLocaleOptions) => {
              dispatch(setCurrentLanguageSelection(val))
            }}
          />
        </OptionBox>

        <OptionBox
          Icon={KeyboardIcon}
          title={getLocalizedMessage('wsext_keyboard_shortcuts', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_keyboard_shortcuts_description', currentLanguage)}
        >
          <Button
            variant="option"
            onClick={() => chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })}
            sx={{ transition: '0.3s' }}
          >
            {getLocalizedMessage('wsext_edit', currentLanguage)}
          </Button>
        </OptionBox>
        <OptionBox
          Icon={DebugLogIcon}
          title={getLocalizedMessage('wsext_debug_log', currentLanguage)}
        >
          {sentDebugLog ? (
            <Box sx={{ padding: 0, color: 'secondaryText', fontWeight: 'normal' }}>
              {sentDebugLog}
            </Box>
          ) : (
            <Flex sx={{ gap: '16px' }}>
              <Button
                variant="option"
                data-testid="view-debug-log"
                onClick={() => window.open(chrome.runtime.getURL('debugLog.html'))}
                sx={{ transition: '0.3s' }}
              >
                {getLocalizedMessage('wsext_view', currentLanguage)}
              </Button>
              <Button
                variant="option"
                data-testid="send-debug-log"
                onClick={async () => {
                  if (sessionData?.session_auth_hash && sessionData?.username) {
                    await sendDebugLog(
                      dispatch,
                      sessionData?.session_auth_hash,
                      sessionData?.username,
                      state,
                    ).then(response => {
                      setSentDebugLog(
                        response
                          ? getLocalizedMessage('wsext_sent', currentLanguage)
                          : getLocalizedMessage('wsext_error', currentLanguage),
                      )
                    })
                  }
                }}
                sx={{ transition: '0.3s' }}
              >
                {getLocalizedMessage('wsext_send', currentLanguage)}
              </Button>
            </Flex>
          )}
        </OptionBox>

        <OptionBox
          Icon={ImportExportIcon}
          title={getLocalizedMessage('wsext_preferences', currentLanguage)}
        >
          <Flex sx={{ gap: '16px' }}>
            <Button
              variant="option"
              onClick={() => {
                exportSettings(state)
              }}
              sx={{ transition: '0.3s' }}
            >
              {getLocalizedMessage('wsext_export', currentLanguage)}
            </Button>
            <Button
              variant="option"
              onClick={async () => {
                fileInputRef.current?.click()
              }}
              sx={{ transition: '0.3s' }}
            >
              {getLocalizedMessage('wsext_import', currentLanguage)}
            </Button>
            <input
              accept="application/JSON"
              onChange={handleFileChange}
              multiple={false}
              ref={fileInputRef}
              type="file"
              hidden
            />
          </Flex>
        </OptionBox>
        <Flex sx={{ justifyContent: 'center', mb: '16px' }}>
          <EllipseIcon />
        </Flex>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Button
            onClick={() => window.open(`${ENVS.ROOT_URL}/terms/oss`)}
            variant="simple"
            sx={{
              display: 'flex',
              borderRadius: '8px',
              border: '1px',
              borderColor: 'foreground',
              borderStyle: 'solid',
              width: '100%',
              color: 'secondaryText',
              fontSize: '14px',
              alignItems: 'center',
              px: '16px',
              fontWeight: 'bold',
              height: '48px',
              justifyContent: 'space-between',
              transition: '0.3s',
              'svg > path': {
                transition: '0.3s',
              },
              ':hover': {
                color: 'primaryText',
              },
              '&:hover > svg > path': {
                fill: 'primaryText',
              },
            }}
          >
            {getLocalizedMessage('wsext_view_licenses', currentLanguage)}
            <LinkIcon sx={{ fill: 'secondaryText' }} />
          </Button>
        </Box>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Box
            sx={{
              display: 'flex',
              borderRadius: '8px',
              border: '1px',
              borderColor: 'foreground',
              borderStyle: 'solid',
              width: '100%',
              color: 'secondaryText',
              fontSize: '14px',
              alignItems: 'center',
              px: '16px',
              fontWeight: 'bold',
              height: '48px',
              justifyContent: 'space-between',
            }}
          >
            {getLocalizedMessage('wsext_version', currentLanguage)}
            <span
              sx={{
                fontWeight: '400',
              }}
            >
              {'v' +
                (chrome.runtime.getManifest().version_name ??
                  chrome.runtime.getManifest().version) +
                '-' +
                COMMIT_HASH}
            </span>
          </Box>
        </Box>
      </ScrollableBox>
    </Box>
  )
}

export default General
