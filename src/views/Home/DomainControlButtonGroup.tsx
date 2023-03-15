import { useCallback, useEffect, useState } from 'react'
import { Flex } from 'theme-ui'

import IconButton, { type IconButtonProps } from 'components/IconButton'
import { type ThemeUiElement } from 'utils/types'
import { useDispatchAlias, useSelector } from 'state/hooks'
import { ADD_TO_WHITELIST } from 'state/slices/whitelist'
import { reloadCurrentTab } from 'services/currentTab'

import AdsDeselected from 'assets/img/adsDeselected.svg'
import AdsSelected from 'assets/img/adsSelected.svg'
import CloseWhitelist from 'assets/img/closeWhitelist.svg'
import ConnectionDeselected from 'assets/img/connectionDeselected.svg'
import ConnectionSelected from 'assets/img/connectionSelected.svg'
import CookiesSelected from 'assets/img/cookiesSelected.svg'
import CookiesDeselected from 'assets/img/cookiesDeselected.svg'
import Refresh from 'assets/img/refresh.svg'

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
  const whitelist = useSelector(s => s.whitelist)

  const [isAdsAllowed, setIsAdsAllowed] = useState(false)
  const [isCookiesAllowed, setIsCookiesAllowed] = useState(false)
  const [isDirectConnectionsAllowed, setIsDirectConnectionsAllowed] = useState(false)
  const [wasSettingsUpdated, setWasSettingsUpdated] = useState(false)

  const initializeDomainSettings = useCallback(() => {
    const settings = whitelist[currentTabHostname]

    const allowAds = settings?.allowAds || false
    const allowCookies = settings?.allowCookies || false
    const allowDirectConnections = settings?.allowDirectConnections || false

    setIsAdsAllowed(allowAds)
    setIsCookiesAllowed(allowCookies)
    setIsDirectConnectionsAllowed(allowDirectConnections)
  }, [whitelist, currentTabHostname])

  useEffect(() => {
    initializeDomainSettings()
  }, [currentTabHostname, initializeDomainSettings])

  const handleClose = async () => {
    if (wasSettingsUpdated) {
      await dispatchAlias(ADD_TO_WHITELIST, {
        domain: currentTabHostname,
        allowAds: isAdsAllowed,
        allowCookies: isCookiesAllowed,
        allowDirectConnections: isDirectConnectionsAllowed,
      })
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
      <Flex>
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
        <StyledIconButton
          onClick={() => {
            setIsCookiesAllowed(!isCookiesAllowed)
            setWasSettingsUpdated(true)
          }}
        >
          {isCookiesAllowed ? (
            <CookiesSelected sx={{ fill: 'white' }} />
          ) : (
            <CookiesDeselected sx={{ fill: 'halfWhite' }} />
          )}
        </StyledIconButton>
        <StyledIconButton onClick={handleClose}>
          {wasSettingsUpdated ? <Refresh /> : <CloseWhitelist sx={{ fill: 'halfWhite' }} />}
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
        mr: '16px',
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
