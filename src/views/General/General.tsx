import { useRef, useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'

import { ENVS } from 'utils/constants'
import { pushToDebugLog, sendDebugLog } from 'services/debugLog'
import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch, ScrollableBox } from 'components'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { setLocationLoad } from 'state/slices/locationLoad'

import LinkIcon from 'assets/img/link.svg'
import EllipseIcon from 'assets/img/ellipse.svg'
import DebugLogIcon from 'assets/img/debugLog.svg'
import DebugMenuIcon from 'assets/img/debugMenu.svg'
import NotificationsIcon from 'assets/img/notifications.svg'
import LocationLoadIcon from 'assets/img/locationLoad.svg'
import ImportExportIcon from 'assets/img/importExport.svg'

import { useManageAllowlist } from 'components/hooks'
import { exportSettings } from 'services/importExport/exportSettings'
import { importSettings } from 'services/importExport/importSettings'
import { addOverlay } from 'state/slices/overlay'

const General: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const contextMenu = useSelector(s => s.contextMenu)
  const sessionData = useSelector(s => s.session.sessionData)
  const allowSystemNotifications = useSelector(s => s.allowSystemNotifications)
  const locationLoad = useSelector(s => s.locationLoad)
  const state = useSelector(s => s)
  const serverList = useSelector(s => s.servers.serverList)
  const existingAllowList = useSelector(s => s.allowlist)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToAllowlist } = useManageAllowlist()
  const favoriteLocations = useSelector(s => s.favoriteLocations)
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  const autopilot = useSelector(s => s.autopilot)
  const currentDataCenter = useSelector(s => s.currentDataCenter)
  const currentLocation = useSelector(s => s.currentLocation)

  const isUserPro = useSelector(s => s.session.sessionData?.is_premium)

  const [sentDebugLog, setSentDebugLog] = useState<string | undefined>(undefined)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      await pushToDebugLog({
        message: 'File not found when importing settings',
        level: 'WARN',
      })
      return
    }

    // check if uploaded settigs file is the correct extension, note you can only perform **real** validation on the server side only
    // BUT using zod schema validators is the next best thing on the client side.

    const fileName = fileInputRef.current?.value

    if (!fileName) {
      await pushToDebugLog({
        message: 'No file name found in input',
        level: 'WARN',
      })
      return
    }

    /*
        Gets the file extension, this check is just to loosely prevent uploading the wrong file
        https://stackoverflow.com/a/12900504

        ""                            -->   ""
        "name"                        -->   ""
        "name.txt"                    -->   "txt"
        ".htpasswd"                   -->   ""
        "name.with.many.dots.myext"   -->   "myext"
    */
    const fileExtension = fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1)

    if (fileExtension !== 'json') {
      await pushToDebugLog({
        message: 'File extension is not json',
        data: JSON.stringify(fileExtension),
        level: 'WARN',
      })
      await dispatch(addOverlay('wrongFileExtension'))
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
      })
      showReloadAlert(true)
    } catch (err) {
      // show overlays etc
    }
  }

  return (
    <Box data-testid="general-page" bg="background">
      <Header title="General" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <ScrollableBox>
        <OptionBox
          Icon={NotificationsIcon}
          title="Notifications"
          subTitle="Show connect/disconnect OS notifications."
        >
          <ToggleSwitch
            onChange={() => dispatch(setAllowSystemNotifications(!allowSystemNotifications))}
            checked={allowSystemNotifications}
          />
        </OptionBox>
        <OptionBox
          Icon={LocationLoadIcon}
          title="Show Location Load"
          subTitle="Show Location Load of each data center."
        >
          <ToggleSwitch
            onChange={() => dispatch(setLocationLoad(!locationLoad))}
            checked={locationLoad}
          />
        </OptionBox>
        <OptionBox
          Icon={DebugMenuIcon}
          title="Debug Context Menu"
          subTitle="Show the debug log in the context menu."
        >
          <ToggleSwitch
            onChange={() => dispatch(showDebugContextMenu(!contextMenu))}
            checked={contextMenu}
          />
        </OptionBox>
        <OptionBox Icon={DebugLogIcon} title="Debug Log">
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
                View
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
                      setSentDebugLog(response ? 'Sent!' : 'Error')
                    })
                  }
                }}
                sx={{ transition: '0.3s' }}
              >
                Send
              </Button>
            </Flex>
          )}
        </OptionBox>

        <OptionBox Icon={ImportExportIcon} title="Preferences">
          <Flex sx={{ gap: '16px' }}>
            <Button
              variant="option"
              onClick={() => {
                exportSettings(state)
              }}
              sx={{ transition: '0.3s' }}
            >
              Export
            </Button>
            <Button
              variant="option"
              onClick={async () => {
                fileInputRef.current?.click()
              }}
              sx={{ transition: '0.3s' }}
            >
              Import
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
            View Licenses
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
            Version
            <span
              sx={{
                fontWeight: '400',
              }}
            >
              {'v' + chrome.runtime.getManifest().version + '-' + COMMIT_HASH}
            </span>
          </Box>
        </Box>
      </ScrollableBox>
    </Box>
  )
}

export default General
