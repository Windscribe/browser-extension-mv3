import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { ScrollableBox, Header, OptionBox, ToggleSwitch, OptionLinkBox } from 'components'
import { setBlockLists } from 'state/slices/blocker'
import { addOverlay } from 'state/slices/overlay'
import { toggleUblockLite, useIsUblockLiteStatus } from 'services/detectUblock'
import sendMessage from 'services/runtime/sendMessage'

import AdblockIcon from 'assets/img/adblock.svg'
import SocialDistancingIcon from 'assets/img/socialDistancing.svg'
import CookieGoAwayIcon from 'assets/img/cookieGoAway.svg'

const Blocker: ThemeUiElement = () => {
  const blockLists = useSelector(s => s.blocker.blockLists)
  const showUblockWarningAtBlockerPage = useSelector(s => s.blocker.showUblockWarningAtBlockerPage)

  const dispatch = useDispatch()
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  const ublockStatus = useIsUblockLiteStatus()

  useEffect(() => {
    if (ublockStatus === 'enabled' && showUblockWarningAtBlockerPage) {
      dispatch(addOverlay('ublockDetected'))
    }
  }, [dispatch, ublockStatus, showUblockWarningAtBlockerPage])

  const handleBlockListToggle = (listName: string) => {
    showReloadAlert(true)
    let newBlocklist
    if (blockLists.includes(listName)) {
      newBlocklist = blockLists.filter(list => list !== listName)
    } else {
      newBlocklist = [...blockLists, listName]
    }
    dispatch(setBlockLists(newBlocklist))

    sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: newBlocklist,
    })
  }

  const isUblockEnabled = ublockStatus === 'enabled'
  const isUblockInstalled = ublockStatus !== 'not_installed'

  return (
    <Box data-testid="blocker-page" bg="background">
      <Header title="Blocker" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <ScrollableBox>
        <OptionBox
          Icon={AdblockIcon}
          title="Ad Crusher"
          subTitle="Ads, Malware, Trackers, Miners, And More"
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message="Not available when Ublock Lite is enabled"
            onChange={() => {
              handleBlockListToggle('default')
            }}
            checked={blockLists.includes('default')}
          />
        </OptionBox>
        <OptionBox
          Icon={SocialDistancingIcon}
          title="Social Distancing"
          subTitle="Blocks tracking social network widgets and buttons"
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message="Not available when Ublock Lite is enabled"
            onChange={() => {
              handleBlockListToggle('annoyances-social')
            }}
            checked={blockLists.includes('annoyances-social')}
          />
        </OptionBox>
        <OptionBox
          Icon={CookieGoAwayIcon}
          title="Cookie Go Away"
          subTitle='Blocks annoying "We use cookies" banners on all websites'
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message="Not available when Ublock Lite is enabled"
            onChange={() => {
              handleBlockListToggle('annoyances-cookies')
            }}
            checked={blockLists.includes('annoyances-cookies')}
          />
        </OptionBox>
        {isUblockInstalled && (
          <OptionBox
            // todo change icon
            Icon={CookieGoAwayIcon}
            title="uBlock Origin Lite"
            subTitle="Blocker settings are not available when uBlock Lite is enabled. Disable this setting to use Windscribe's adblock"
          >
            <ToggleSwitch
              onChange={async () => {
                await toggleUblockLite()
              }}
              checked={isUblockEnabled}
            />
          </OptionBox>
        )}

        <OptionLinkBox
          disabled={isUblockEnabled}
          message="Not available when uBlock Origin Lite is enabled"
          url={chrome.runtime.getURL('dashboard.html')}
          text="uBlock Settings"
          sx={{
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        />
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
            uBlock Version
            <span
              sx={{
                fontWeight: '400',
              }}
            >
              {UBO_LITE_VERSION}
            </span>
          </Box>
        </Box>

        <OptionLinkBox
          url="https://chrome.google.com/webstore/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone"
          text="Check out the SponsorBlock extension to skip sponsorships on YouTube videos."
        />
      </ScrollableBox>
    </Box>
  )
}

export default Blocker
