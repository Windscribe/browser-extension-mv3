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
import { getLocalizedMessage } from 'utils/getLocalisedString'

const Blocker: ThemeUiElement = () => {
  const blockLists = useSelector(s => s.blocker.blockLists)
  const showUblockWarningAtBlockerPage = useSelector(s => s.blocker.showUblockWarningAtBlockerPage)
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  const dispatch = useDispatch()
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  const ublockStatus = useIsUblockLiteStatus()

  useEffect(() => {
    if (ublockStatus.status === 'enabled' && showUblockWarningAtBlockerPage) {
      dispatch(addOverlay('ublockDetected'))
    }
  }, [dispatch, ublockStatus, showUblockWarningAtBlockerPage])

  const handleBlockListToggle = (rulesets: string[]) => {
    showReloadAlert(true)
    let newBlocklist = [...blockLists] // Start with current list

    // For each ruleset, toggle it individually (same as original behavior)
    rulesets.forEach(ruleset => {
      if (newBlocklist.includes(ruleset)) {
        newBlocklist = newBlocklist.filter(list => list !== ruleset)
      } else {
        newBlocklist.push(ruleset)
      }
    })

    dispatch(setBlockLists(newBlocklist))

    sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: newBlocklist,
    })
  }

  const isUblockEnabled = ublockStatus.status === 'enabled'
  const isUblockInstalled = ublockStatus.status !== 'not_installed'

  return (
    <Box data-testid="blocker-page" bg="background">
      <Header
        title={getLocalizedMessage('wsext_blocker', currentLanguage)}
        {...{ shouldShowReloadAlert, showReloadAlert }}
      />
      <ScrollableBox>
        <OptionBox
          Icon={AdblockIcon}
          title={getLocalizedMessage('wsext_ad_crusher', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_ad_crusher_description', currentLanguage)}
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message={getLocalizedMessage('wsext_not_available_when_ublock_lite_enabled', currentLanguage)}
            onChange={() => {
              handleBlockListToggle(['easylist', 'easyprivacy', 'pgl', 'ublock-filters'])
            }}
            checked={['easylist', 'easyprivacy', 'pgl', 'ublock-filters'].every(ruleset =>
              blockLists.includes(ruleset),
            )}
          />
        </OptionBox>
        <OptionBox
          Icon={SocialDistancingIcon}
          title={getLocalizedMessage('wsext_social_distancing', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_social_distancing_description', currentLanguage)}
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message={getLocalizedMessage('wsext_not_available_when_ublock_lite_enabled', currentLanguage)}
            onChange={() => {
              handleBlockListToggle(['annoyances-social'])
            }}
            checked={blockLists.includes('annoyances-social')}
          />
        </OptionBox>
        <OptionBox
          Icon={CookieGoAwayIcon}
          title={getLocalizedMessage('wsext_cookie_go_away', currentLanguage)}
          subTitle={getLocalizedMessage('wsext_cookie_go_away_description', currentLanguage)}
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            disabled={isUblockEnabled}
            message={getLocalizedMessage('wsext_not_available_when_ublock_lite_enabled', currentLanguage)}
            onChange={() => {
              handleBlockListToggle(['annoyances-cookies'])
            }}
            checked={blockLists.includes('annoyances-cookies')}
          />
        </OptionBox>
        {isUblockInstalled && (
          <OptionBox
            // todo change icon
            Icon={CookieGoAwayIcon}
            title={getLocalizedMessage('wsext_ublock_origin_lite', currentLanguage)}
            subTitle={getLocalizedMessage('wsext_ublock_origin_lite_description', currentLanguage)}
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
          message={getLocalizedMessage('wsext_not_available_when_ublock_origin_lite_enabled',
            currentLanguage,
          )}
          url={chrome.runtime.getURL('dashboard.html')}
          text={getLocalizedMessage('wsext_ublock_settings', currentLanguage)}
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
            {getLocalizedMessage('wsext_version', currentLanguage)}
            <span
              sx={{
                fontWeight: '400',
              }}
            >
              {UBO_LITE_VERSION + '-' + UBO_LITE_SUBMODULE_COMMIT_HASH}
            </span>
          </Box>
        </Box>

        <OptionLinkBox
          url="https://chrome.google.com/webstore/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone"
          text={getLocalizedMessage('wsext_sponsorblock_recommendation', currentLanguage)}
        />
      </ScrollableBox>
    </Box>
  )
}

export default Blocker
