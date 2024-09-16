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
import { domainDependents, removeFromExludeScriptMatches } from 'utils/allowListDependants'
import { CONTROL_D_DOMAIN } from 'utils/constants'
import {
  defaultUblockRulesetId,
  ruleIdForMatomo,
  updateStaticRules,
} from 'services/declarativeNetRequest/updateStaticRules'
import { spoofUserAgentHeader } from 'services/declarativeNetRequest/updateDynamicRules'
import { getPrivacyFeatureEnabledDomains } from 'utils/networkSpoofing'

const Allowlist: ThemeUiElement = () => {
  const allowlist = useSelector(s => s.allowlist)
  const allowlistedDomains = Object.entries(allowlist)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [domainToEdit, setDomainToEdit] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)
  const isSplitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const spoofedUserAgent = useSelector(s => s.userAgent.spoofed)
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
          {allowlistedDomains.map(([domain, value]) => (
            <Rectangle
              sx={{
                height: value?.addedBy ? 'auto' : '48px',
                mb: '12px',
              }}
              key={domain}
            >
              <div sx={{ display: 'flex', flexDirection: 'column', rowGap: '4px' }}>
                <Hostname>{domain}</Hostname>
                {value?.addedBy && (
                  <p
                    sx={{
                      margin: 0,
                      fontSize: 10.5,
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    Added to support: {value.addedBy}
                  </p>
                )}
              </div>

              <Flex sx={{ flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => openSettingsToUpdate(domain)} sx={{ p: 0, ml: '16px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    const toRemove = []

                    const allowlistItemsWithPrivacyFeatures =
                      getPrivacyFeatureEnabledDomains(allowlist)

                    let domainsToKeepSpoofing = allowlistItemsWithPrivacyFeatures.slice()

                    await removeFromExludeScriptMatches(domain, value.includeAllSubdomains)

                    toRemove.push({ hostname: domain, level: 3 })

                    const dependentsArray = domainDependents(domain)

                    for (const dependentDomain of dependentsArray) {
                      if (allowlist[dependentDomain]) {
                        await removeFromExludeScriptMatches(
                          dependentDomain,
                          allowlist[dependentDomain].includeAllSubdomains,
                        )
                        toRemove.push({ hostname: dependentDomain, level: 3 })
                      }
                    }

                    if (domain === CONTROL_D_DOMAIN) {
                      updateStaticRules({
                        rulesetId: defaultUblockRulesetId,
                        enableRuleIds: ruleIdForMatomo,
                      })
                    }

                    if (isSplitPersonalityEnabled) {
                      domainsToKeepSpoofing = domainsToKeepSpoofing.filter(
                        d => !dependentsArray.includes(d) && d !== domain,
                      )

                      await spoofUserAgentHeader(spoofedUserAgent, domainsToKeepSpoofing)
                    }

                    removeFromAllowlist(toRemove)

                    if (currentTabHostname === domain) {
                      showReloadAlert(true)
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
