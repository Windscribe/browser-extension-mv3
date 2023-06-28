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
import MalwareIcon from 'assets/img/malware.svg'
import SocialDistancingIcon from 'assets/img/socialDistancing.svg'
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
        <OptionBox Icon={AdblockIcon} title="Default" subTitle="Ads, Trackers, Miners, And More">
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('default')
            }}
            checked={blockLists.includes('default')}
          />
        </OptionBox>
        <OptionBox
          Icon={TrackerIcon}
          title="Block LAN"
          subTitle="Block Outsider Intrusion Into LAN"
        >
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('block-lan')
            }}
            checked={blockLists.includes('block-lan')}
          />
        </OptionBox>
        <OptionBox
          Icon={MalwareIcon}
          title="Dan Pollock’s Hosts File"
          subTitle="Dan Pollock’s Hosts File"
        >
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('dpollock-0')
            }}
            checked={blockLists.includes('dpollock-0')}
          />
        </OptionBox>
        <OptionBox
          Icon={SocialDistancingIcon}
          title="Steven Black's Hosts File"
          subTitle="Steven Black's Hosts File"
        >
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('stevenblack-hosts')
            }}
            checked={blockLists.includes('stevenblack-hosts')}
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
