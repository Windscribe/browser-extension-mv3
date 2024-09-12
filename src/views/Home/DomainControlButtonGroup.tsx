import { useState } from 'react'
import { Flex } from 'theme-ui'

import IconButton, { type IconButtonProps } from 'components/IconButton'
import { type ThemeUiElement } from 'utils/types'
import { useSelector } from 'state/hooks'
import { reloadCurrentTab } from 'services/currentTab'
import { useManageAllowlist } from 'components/hooks'

import AdsDeselected from 'assets/img/adsDeselected.svg'
import AdsSelected from 'assets/img/adsSelected.svg'
import CloseAllowlist from 'assets/img/closeAllowlist.svg'
import ConnectionDeselected from 'assets/img/connectionDeselected.svg'
import ConnectionSelected from 'assets/img/connectionSelected.svg'
import PrivacySelected from 'assets/img/privacySelected.svg'
import PrivacyDeselected from 'assets/img/privacyDeselected.svg'
import Refresh from 'assets/img/refresh.svg'
import ToolTip from 'components/ToolTip'
import { spoofUserAgentHeader } from 'services/declarativeNetRequest/updateDynamicRules'
import {
  addToExcludeScriptMatches,
  domainDependents,
  removeFromExludeScriptMatches,
} from 'utils/allowListDependants'
import { pushToDebugLog } from 'services/debugLog'

type DomainControlButtonGroupProps = {
  currentTabHostname: string
  isDomainSettingsOpen: boolean
  setIsDomainSettingsOpen: (isOpen: boolean) => void
}

const DomainControlButtonGroup: ThemeUiElement<DomainControlButtonGroupProps> = ({
  currentTabHostname,
  isDomainSettingsOpen,
  setIsDomainSettingsOpen,
}) => {
  const [wasSettingsUpdated, setWasSettingsUpdated] = useState(false)

  const { addToAllowlist, removeFromAllowlist } = useManageAllowlist()
  const allowlist = useSelector(s => s.allowlist)
  const isSplitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const spoofedUserAgent = useSelector(s => s.userAgent.spoofed)

  const settings = allowlist[currentTabHostname]
  const allowAdsState = !!settings?.allowAds
  const allowPrivacyFeaturesState = !!settings?.allowPrivacyFeatures
  const allowDirectConnectionsState = !!settings?.allowDirectConnections
  const isIncludeAllSubdomains = !!settings?.includeAllSubdomains

  type HandleSettingsItemClick = (options: {
    isAdsAllowed?: boolean
    isPrivacyFeaturesAllowed?: boolean
    isDirectConnectionsAllowed?: boolean
  }) => Promise<void>

  const handleSettingsItemClick: HandleSettingsItemClick = async ({
    isAdsAllowed,
    isPrivacyFeaturesAllowed,
    isDirectConnectionsAllowed,
  }) => {
    setWasSettingsUpdated(true)

    // If parameter was not passed, use value from redux store
    isAdsAllowed ??= allowAdsState
    isPrivacyFeaturesAllowed ??= allowPrivacyFeaturesState
    isDirectConnectionsAllowed ??= allowDirectConnectionsState
    // include all subdomains has no ui component so using the redux store value

    if (!currentTabHostname) {
      await pushToDebugLog({
        message: 'No current tab hostname',
        tag: 'popup',
        level: 'ERROR',
      })
      return
    }

    if (isAdsAllowed || isPrivacyFeaturesAllowed || isDirectConnectionsAllowed) {
      const level = isAdsAllowed ? 0 : 3
      const domainWithSettings = {
        domain: currentTabHostname,
        allowAds: isAdsAllowed,
        allowPrivacyFeatures: isPrivacyFeaturesAllowed,
        allowDirectConnections: isDirectConnectionsAllowed,
        includeAllSubdomains: isIncludeAllSubdomains,
      }

      const toAdd = []

      toAdd.push({ hostname: currentTabHostname, level, domainWithSettings })

      await addToExcludeScriptMatches(
        currentTabHostname,
        domainWithSettings.allowPrivacyFeatures,
        domainWithSettings.includeAllSubdomains,
      )

      const dependentsArray = domainDependents(currentTabHostname)

      if (
        dependentsArray.length > 0 &&
        !Object.entries(allowlist).find(([key]) => dependentsArray.includes(key))
      ) {
        for (const dependentDomain of dependentsArray) {
          toAdd.push({
            hostname: dependentDomain,
            level,
            domainWithSettings: {
              ...domainWithSettings,
              domain: dependentDomain,
              addedBy: currentTabHostname,
              // only reason to inlcude dependents is to allow direct connections
              allowDirectConnections: true,
            },
          })

          await addToExcludeScriptMatches(
            dependentDomain,
            domainWithSettings.allowPrivacyFeatures,
            domainWithSettings.includeAllSubdomains,
          )
        }
      }

      if (isSplitPersonalityEnabled) {
        let excludeUrl = Object.entries(allowlist)
          .filter(([_, value]) => value.allowPrivacyFeatures)
          .map(([key, _]) => key)

        if (isPrivacyFeaturesAllowed) {
          excludeUrl.push(currentTabHostname)
        } else {
          excludeUrl = excludeUrl.filter(url => url !== currentTabHostname)
        }

        await spoofUserAgentHeader(spoofedUserAgent, excludeUrl)
      }

      // no need to await this since all the depenedent operations are done by this time
      addToAllowlist(toAdd)
    } else {
      const toRemove = []
      toRemove.push({ hostname: currentTabHostname, level: 3 })

      await removeFromExludeScriptMatches(currentTabHostname, isIncludeAllSubdomains)

      if (isSplitPersonalityEnabled) {
        const excludeUrl = Object.entries(allowlist)
          .filter(([_, value]) => value.allowPrivacyFeatures)
          // remove current domain from the list
          .filter(([key, _]) => key !== currentTabHostname)
          .map(([key, _]) => key)
        await spoofUserAgentHeader(spoofedUserAgent, excludeUrl)
      }

      const dependentsArray = domainDependents(currentTabHostname)

      for (const dependentDomain of dependentsArray) {
        if (dependentDomain in allowlist) {
          toRemove.push({ hostname: dependentDomain, level: 3 })
          await removeFromExludeScriptMatches(
            dependentDomain,
            allowlist[dependentDomain].includeAllSubdomains,
          )
        }
      }

      removeFromAllowlist(toRemove)
    }
  }

  const handleClose = async () => {
    if (wasSettingsUpdated) {
      await reloadCurrentTab()
    }
    setIsDomainSettingsOpen(false)
  }

  return (
    <Flex
      sx={{
        position: 'absolute',
        right: 0,
        height: '100%',
        ml: '16px',
        alignItems: 'center',
        transition: 'transform 0.4s ease',
        transform: `translateX(${isDomainSettingsOpen ? 0 : 100}%)`,
        backgroundColor: 'darkBackground',
      }}
    >
      <Flex
        sx={{
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
          position: 'absolute',
          zIndex: 10000,
          backgroundColor: 'darkBackground',
          height: '50px',
          transform: 'rotate(180deg) translateX(100%)',
          width: '100px',
          opacity: isDomainSettingsOpen ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      <Flex sx={{ gap: '16px', mr: '16px' }}>
        <ToolTip message="Connection">
          <StyledIconButton
            onClick={() => {
              handleSettingsItemClick({ isDirectConnectionsAllowed: !allowDirectConnectionsState })
            }}
          >
            {allowDirectConnectionsState ? (
              <ConnectionSelected sx={{ fill: 'white' }} />
            ) : (
              <ConnectionDeselected sx={{ fill: 'halfWhite' }} />
            )}
          </StyledIconButton>
        </ToolTip>
        <ToolTip message="Ads">
          <StyledIconButton
            onClick={() => {
              handleSettingsItemClick({ isAdsAllowed: !allowAdsState })
            }}
          >
            {allowAdsState ? (
              <AdsSelected sx={{ fill: 'white' }} />
            ) : (
              <AdsDeselected sx={{ fill: 'halfWhite' }} />
            )}
          </StyledIconButton>
        </ToolTip>

        <ToolTip message="Privacy Features">
          <StyledIconButton
            data-testid="allowlist-security-features-button"
            onClick={() => {
              handleSettingsItemClick({ isPrivacyFeaturesAllowed: !allowPrivacyFeaturesState })
            }}
          >
            {allowPrivacyFeaturesState ? (
              <PrivacySelected sx={{ fill: 'white' }} />
            ) : (
              <PrivacyDeselected sx={{ fill: 'halfWhite' }} />
            )}
          </StyledIconButton>
        </ToolTip>
        <StyledIconButton data-testid="domain-control-close-button" onClick={handleClose}>
          {wasSettingsUpdated ? <Refresh /> : <CloseAllowlist sx={{ fill: 'halfWhite' }} />}
        </StyledIconButton>
      </Flex>
    </Flex>
  )
}

type StyledIconButtonProps = React.PropsWithChildren<IconButtonProps>
export const StyledIconButton: React.FC<StyledIconButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton
      sx={{
        p: 0,
        height: '24px',
        width: '24px',
        '&:hover svg ': {
          fill: 'white',
        },
      }}
      {...props}
    >
      {children}
    </IconButton>
  )
}

export default DomainControlButtonGroup
