import { useCallback, useEffect, useState } from 'react'
import { Flex } from 'theme-ui'

import IconButton, { type IconButtonProps } from 'components/IconButton'
import { type ThemeUiElement } from 'utils/types'
import { useDispatchAlias, useSelector } from 'state/hooks'
import { ADD_TO_ALLOWLIST, REMOVE_FROM_ALLOWLIST } from 'state/slices/allowlist'
import { reloadCurrentTab } from 'services/currentTab'

import AdsDeselected from 'assets/img/adsDeselected.svg'
import AdsSelected from 'assets/img/adsSelected.svg'
import CloseAllowlist from 'assets/img/closeAllowlist.svg'
import ConnectionDeselected from 'assets/img/connectionDeselected.svg'
import ConnectionSelected from 'assets/img/connectionSelected.svg'
import CookiesSelected from 'assets/img/cookiesSelected.svg'
import CookiesDeselected from 'assets/img/cookiesDeselected.svg'
import Refresh from 'assets/img/refresh.svg'
import ToolTip from 'components/ToolTip'

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
  const dispatchAlias = useDispatchAlias()
  const allowlist = useSelector(s => s.allowlist)

  const [isAdsAllowed, setIsAdsAllowed] = useState(false)
  const [isPrivacyFeaturesAllowed, setIsPrivacyFeaturesAllowed] = useState(false)
  const [isDirectConnectionsAllowed, setIsDirectConnectionsAllowed] = useState(false)
  const [wasSettingsUpdated, setWasSettingsUpdated] = useState(false)

  const initializeDomainSettings = useCallback(() => {
    const settings = allowlist[currentTabHostname]

    const allowAds = settings?.allowAds || false
    const allowPrivacyFeatures = settings?.allowPrivacyFeatures || false
    const allowDirectConnections = settings?.allowDirectConnections || false

    setIsAdsAllowed(allowAds)
    setIsPrivacyFeaturesAllowed(allowPrivacyFeatures)
    setIsDirectConnectionsAllowed(allowDirectConnections)
  }, [allowlist, currentTabHostname])

  useEffect(() => {
    initializeDomainSettings()
  }, [currentTabHostname, initializeDomainSettings])

  const handleClose = async () => {
    if (wasSettingsUpdated) {
      if (isAdsAllowed || isPrivacyFeaturesAllowed || isDirectConnectionsAllowed) {
        // TODO: investigate why this doesn't work when called from ADD_TO_ALLOWLIST
        isAdsAllowed &&
          chrome.runtime.sendMessage({
            what: 'setFilteringMode',
            hostname: currentTabHostname,
            level: 0,
          })

        await dispatchAlias(ADD_TO_ALLOWLIST, {
          domain: currentTabHostname,
          allowAds: isAdsAllowed,
          allowPrivacyFeatures: isPrivacyFeaturesAllowed,
          allowDirectConnections: isDirectConnectionsAllowed,
        })
      } else {
        // TODO: investigate why this doesn't work when called from ADD_TO_ALLOWLIST
        chrome.runtime.sendMessage({
          what: 'setFilteringMode',
          hostname: currentTabHostname,
          level: 3,
        })

        await dispatchAlias(REMOVE_FROM_ALLOWLIST, { domain: currentTabHostname })
      }
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
              setIsDirectConnectionsAllowed(!isDirectConnectionsAllowed)
              setWasSettingsUpdated(true)
            }}
          >
            {isDirectConnectionsAllowed ? (
              <ConnectionSelected sx={{ fill: 'white' }} />
            ) : (
              <ConnectionDeselected sx={{ fill: 'halfWhite' }} />
            )}
          </StyledIconButton>
        </ToolTip>
        <ToolTip message="Ads">
          <StyledIconButton
            onClick={() => {
              setIsAdsAllowed(!isAdsAllowed)
              setWasSettingsUpdated(true)
            }}
          >
            {isAdsAllowed ? (
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
            setIsPrivacyFeaturesAllowed(!isPrivacyFeaturesAllowed)
            setWasSettingsUpdated(true)
          }}
        >
          {isPrivacyFeaturesAllowed ? (
            <CookiesSelected sx={{ fill: 'white' }} />
          ) : (
            <CookiesDeselected sx={{ fill: 'halfWhite' }} />
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
        '&:hover svg > path': {
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
