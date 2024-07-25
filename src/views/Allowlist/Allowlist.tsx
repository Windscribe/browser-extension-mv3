import { useState } from 'react'
import { Box, Flex } from 'theme-ui'

import { Header, CircleButton, Rectangle, IconButton, Subheader, ScrollableBox } from 'components'
import { Column } from 'components/Flexbox'
import { useCurrentTabHostname, useManageAllowlist } from 'components/hooks'
import AllowlistPopup from './AllowlistPopup'
import Hostname from './Hostname'
import { type ThemeUiElement } from 'utils/types'
import { useSelector } from 'state/hooks'

import PlusIcon from 'assets/img/plus-icon.svg'
import EditIcon from 'assets/img/editIcon.svg'
import GarbageIcon from 'assets/img/garbageIcon.svg'
import { getScriptForId, toExcludeMatchesURL, updateScript } from 'utils/scriptController'
import {
  languageWarpScriptId,
  locationWarpScriptId,
  splitPersonalityScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'

const Allowlist: ThemeUiElement = () => {
  const allowlist = useSelector(s => s.allowlist)
  const allowlistedDomains = Object.keys(allowlist)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [domainToEdit, setDomainToEdit] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)

  const currentTabHostname = useCurrentTabHostname()
  const { removeFromAllowlist } = useManageAllowlist()

  const openSettingsFor = (candidate: string): void => {
    setDomainToEdit(candidate)
    setIsPopupOpen(true)
  }

  const openSettingsToUpdate = (candidate: string): void => {
    setIsEditMode(true)
    openSettingsFor(candidate)
  }

  const closePopup = (showRefreshHeader: boolean, currentDomain: string) => {
    if (showRefreshHeader && currentDomain === currentTabHostname) {
      showReloadAlert(true)
    }
    setIsEditMode(false)
    setIsPopupOpen(false)
  }

  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  return (
    <Column data-testid="allowlist-page" bg="background">
      <Header title="Allowlist" {...{ shouldShowReloadAlert, showReloadAlert }}>
        <CircleButton
          data-testid="add-to-allowlist-button"
          Icon={PlusIcon}
          onClick={() => openSettingsFor('')}
          sx={{
            background: 'lakeBlue',
            transition: '0.3s',
            svg: {
              fill: 'white',
            },
            ':hover': {
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #006AFF',
              svg: {
                fill: 'white',
              },
            },
          }}
        />
      </Header>
      <Box
        sx={{
          height: '336px',
        }}
      >
        <Box sx={{ mt: '8px', mx: '16px' }}>
          <Subheader>current page</Subheader>
          <Rectangle>
            <Hostname>{currentTabHostname}</Hostname>
            <IconButton
              onClick={() => openSettingsFor(currentTabHostname)}
              sx={{ p: 0, ml: '16px' }}
            >
              <PlusIcon />
            </IconButton>
          </Rectangle>
        </Box>
        <Subheader mt="20px" pl="16px">
          allowlisted
        </Subheader>
        <ScrollableBox data-testid="allowlist-items-list" sx={{ maxHeight: '212px' }}>
          {allowlistedDomains.map(domain => (
            <Rectangle key={domain} sx={{ mb: '12px' }}>
              <Hostname>{domain}</Hostname>
              <Flex sx={{ flexShrink: 0 }}>
                <IconButton onClick={() => openSettingsToUpdate(domain)} sx={{ p: 0, ml: '16px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    await removeFromAllowlist({ hostname: domain, level: 3 })
                    // only show alerts if changes are made to the domain that is in the currently active tab
                    if (currentTabHostname === domain) {
                      showReloadAlert(true)
                    }

                    const workerBlockScriptExcludeMatches = (
                      await getScriptForId(workerBlockScriptId)
                    )?.excludeMatches

                    const splitPersonalityScriptExcludeMatches = (
                      await getScriptForId(splitPersonalityScriptId)
                    )?.excludeMatches

                    const locationWarpScriptExcludeMatches = (
                      await getScriptForId(locationWarpScriptId)
                    )?.excludeMatches

                    const languageWarpScriptExcludeMatches = (
                      await getScriptForId(languageWarpScriptId)
                    )?.excludeMatches

                    const timeZoneWarpScriptExcludeMatches = (
                      await getScriptForId(timeZoneWarpScriptId)
                    )?.excludeMatches

                    if (workerBlockScriptExcludeMatches) {
                      const newExcludeMatches = workerBlockScriptExcludeMatches.filter(
                        urlScheme => urlScheme !== toExcludeMatchesURL(domain),
                      )

                      updateScript({
                        id: workerBlockScriptId,
                        excludeMatches: newExcludeMatches,
                      })
                    }

                    if (splitPersonalityScriptExcludeMatches) {
                      const newExcludeMatches = splitPersonalityScriptExcludeMatches.filter(
                        urlScheme => urlScheme !== toExcludeMatchesURL(domain),
                      )

                      updateScript({
                        id: splitPersonalityScriptId,
                        excludeMatches: newExcludeMatches,
                      })
                    }

                    if (locationWarpScriptExcludeMatches) {
                      const newExcludeMatches = locationWarpScriptExcludeMatches.filter(
                        urlScheme => urlScheme !== toExcludeMatchesURL(domain),
                      )

                      updateScript({
                        id: locationWarpScriptId,
                        excludeMatches: newExcludeMatches,
                      })
                    }

                    if (languageWarpScriptExcludeMatches) {
                      const newExcludeMatches = languageWarpScriptExcludeMatches.filter(
                        urlScheme => urlScheme !== toExcludeMatchesURL(domain),
                      )

                      updateScript({
                        id: languageWarpScriptId,
                        excludeMatches: newExcludeMatches,
                      })
                    }

                    if (timeZoneWarpScriptExcludeMatches) {
                      const newExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(
                        urlScheme => urlScheme !== toExcludeMatchesURL(domain),
                      )

                      updateScript({
                        id: timeZoneWarpScriptId,
                        excludeMatches: newExcludeMatches,
                      })
                    }
                  }}
                  sx={{ p: 0, ml: '16px' }}
                >
                  <GarbageIcon />
                </IconButton>
              </Flex>
            </Rectangle>
          ))}
        </ScrollableBox>
      </Box>
      <AllowlistPopup
        domain={domainToEdit}
        isOpen={isPopupOpen}
        isEditMode={isEditMode}
        closePopup={closePopup}
      />
    </Column>
  )
}

export default Allowlist
