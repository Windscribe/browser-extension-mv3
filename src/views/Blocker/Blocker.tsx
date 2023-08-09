import { useState, useEffect } from 'react'
import { Box, Button } from 'theme-ui'

import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { ScrollableBox, Header, OptionBox, ToggleSwitch } from 'components'
import { setBlockLists, setShowUblockWarning } from 'state/slices/blocker'
import { addOverlay } from 'state/slices/overlay'
import detectUblock from 'services/detectUblock'
import sendMessage from 'services/runtime/sendMessage'

import AdblockIcon from 'assets/img/adblock.svg'
import TrackerIcon from 'assets/img/trackers.svg'
import SocialDistancingIcon from 'assets/img/socialDistancing.svg'
import CookieGoAwayIcon from 'assets/img/cookieGoAway.svg'
import LinkIcon from 'assets/img/link.svg'

const Blocker: ThemeUiElement = () => {
  const blockLists = useSelector(s => s.blocker.blockLists)
  const showUblockWarning = useSelector(s => s.blocker.showUblockWarning)

  const dispatch = useDispatch()
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  useEffect(() => {
    detectUblock().then(isUblockInstalled => {
      if (isUblockInstalled && showUblockWarning) {
        dispatch(addOverlay('ublockDetected'))
        dispatch(setShowUblockWarning(false))
      }
    })
  }, [dispatch, showUblockWarning])

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
            onChange={() => {
              handleBlockListToggle('default')
            }}
            checked={blockLists.includes('default')}
          />
        </OptionBox>
        <OptionBox
          Icon={TrackerIcon}
          title="Tracker Eradicator"
          subTitle="Stop trackers in their filthy tracks"
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('adguard-spyware-url')
            }}
            checked={blockLists.includes('adguard-spyware-url')}
          />
        </OptionBox>
        <OptionBox
          Icon={SocialDistancingIcon}
          title="Social Distancing"
          subTitle="Blocks tracking social network widgets and buttons"
          path={'features/ad-blocking'}
        >
          <ToggleSwitch
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
            onChange={() => {
              handleBlockListToggle('annoyances-cookies')
            }}
            checked={blockLists.includes('annoyances-cookies')}
          />
        </OptionBox>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Button
            onClick={() => window.open(chrome.runtime.getURL('dashboard.html'))}
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
            uBlock Settings
            <LinkIcon sx={{ fill: 'secondaryText' }} />
          </Button>
        </Box>
      </ScrollableBox>
    </Box>
  )
}

export default Blocker
