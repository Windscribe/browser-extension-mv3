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
import { getScriptForId, toExcludeMatchesURL, updateScript } from 'utils/scriptController'
import {
  languageWarpScriptId,
  locationWarpScriptId,
  splitPersonalityScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { spoofUserAgentHeader } from 'services/declarativeNetRequest/updateDynamicRules'

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

    const workerBlockExcludeMatches = (await getScriptForId(workerBlockScriptId))?.excludeMatches

    const splitPersonalityExcludeMatches = (await getScriptForId(splitPersonalityScriptId))
      ?.excludeMatches

    const locationWarpScriptExcludeMatches = (await getScriptForId(locationWarpScriptId))
      ?.excludeMatches

    const languageWarpScriptExcludeMatches = (await getScriptForId(languageWarpScriptId))
      ?.excludeMatches

    const timeZoneWarpScriptExcludeMatches = (await getScriptForId(timeZoneWarpScriptId))
      ?.excludeMatches

    if (isAdsAllowed || isPrivacyFeaturesAllowed || isDirectConnectionsAllowed) {
      const level = isAdsAllowed ? 0 : 3
      const domainWithSettings = {
        domain: currentTabHostname,
        allowAds: isAdsAllowed,
        allowPrivacyFeatures: isPrivacyFeaturesAllowed,
        allowDirectConnections: isDirectConnectionsAllowed,
        includeAllSubdomains: isIncludeAllSubdomains,
      }

      await addToAllowlist({ hostname: currentTabHostname, level, domainWithSettings })

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

      const currentExcludeURL = toExcludeMatchesURL(currentTabHostname, !isIncludeAllSubdomains)
      const newExcludeURL = toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains)

      if (workerBlockExcludeMatches) {
        const updatedExcludeMatches = workerBlockExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: workerBlockScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (splitPersonalityExcludeMatches) {
        const updatedExcludeMatches = splitPersonalityExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: splitPersonalityScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (locationWarpScriptExcludeMatches) {
        const updatedExcludeMatches = locationWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }
        await updateScript({
          id: locationWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (languageWarpScriptExcludeMatches) {
        const updatedExcludeMatches = languageWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: languageWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (timeZoneWarpScriptExcludeMatches) {
        const updatedExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: timeZoneWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }
    } else {
      await removeFromAllowlist({ hostname: currentTabHostname, level: 3 })

      // // without subdomain
      // const withutSubdomain = toExcludeMatchesURL(currentTabHostname, false)
      // // with subdomain
      // const newExcludeURL = toExcludeMatchesURL(currentTabHostname, true)

      if (isSplitPersonalityEnabled) {
        const excludeUrl = Object.entries(allowlist)
          .filter(([_, value]) => value.allowPrivacyFeatures)
          // remove current domain from the list
          .filter(([key, _]) => key !== currentTabHostname)
          .map(([key, _]) => key)
        await spoofUserAgentHeader(spoofedUserAgent, excludeUrl)
      }

      if (workerBlockExcludeMatches) {
        const newExcludeMatches = workerBlockExcludeMatches.filter(
          urlScheme =>
            urlScheme !== toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains),
        )
        await updateScript({
          id: workerBlockScriptId,
          excludeMatches: newExcludeMatches,
        })
      }

      if (splitPersonalityExcludeMatches) {
        const newExcludeMatches = splitPersonalityExcludeMatches.filter(
          urlScheme =>
            urlScheme !== toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains),
        )
        await updateScript({
          id: splitPersonalityScriptId,
          excludeMatches: newExcludeMatches,
        })
      }

      if (locationWarpScriptExcludeMatches) {
        const newExcludeMatches = locationWarpScriptExcludeMatches.filter(
          urlScheme =>
            urlScheme !== toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains),
        )
        await updateScript({
          id: locationWarpScriptId,
          excludeMatches: newExcludeMatches,
        })
      }

      if (languageWarpScriptExcludeMatches) {
        const newExcludeMatches = languageWarpScriptExcludeMatches.filter(
          urlScheme =>
            urlScheme !== toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains),
        )
        await updateScript({
          id: languageWarpScriptId,
          excludeMatches: newExcludeMatches,
        })
      }

      if (timeZoneWarpScriptExcludeMatches) {
        const newExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(
          urlScheme =>
            urlScheme !== toExcludeMatchesURL(currentTabHostname, isIncludeAllSubdomains),
        )
        await updateScript({
          id: timeZoneWarpScriptId,
          excludeMatches: newExcludeMatches,
        })
      }
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
