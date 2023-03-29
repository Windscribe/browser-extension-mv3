import { useState, useEffect } from 'react'
import { Box, Button } from 'theme-ui'

import type { ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { setBlockLists } from 'state/slices/blocker'
import { setOverlay } from 'state/slices/overlay'
import detectUblock from 'services/detectUblock'
import SmokewallIcon from 'assets/img/smokewall.svg'
import LinkIcon from 'assets/img/link.svg'

const Blocker: ThemeUiElement = () => {
  const blockLists = useSelector(s => s.blocker.blockLists)
  const dispatch = useDispatch()
  const [shouldShowReloadAlert, showReloadAlert] = useState(false)

  useEffect(() => {
    detectUblock().then(
      isUblockInstalled =>
        isUblockInstalled && dispatch(setOverlay({ isOpen: true, template: 'ublockDetected' })),
    )
  }, [dispatch])

  const handleBlockListToggle = (listName: string) => {
    showReloadAlert(true)
    let newBlocklist
    if (blockLists.includes(listName)) {
      newBlocklist = blockLists.filter(list => list !== listName)
    } else {
      newBlocklist = [...blockLists, listName]
    }
    dispatch(setBlockLists(newBlocklist))

    chrome.runtime.sendMessage({
      what: 'applyRulesets',
      enabledRulesets: newBlocklist,
    })
  }

  return (
    <Box data-testid="blocker-page" bg="background">
      <Header title="Blocker" {...{ shouldShowReloadAlert, showReloadAlert }} />
      <Box mx="16px">
        <OptionBox Icon={SmokewallIcon} title="Default" subTitle="Ads, Trackers, Miners, And More">
          <ToggleSwitch
            onChange={() => {
              handleBlockListToggle('default')
            }}
            checked={blockLists.includes('default')}
          />
        </OptionBox>
        <OptionBox
          Icon={SmokewallIcon}
          title="Block Lan"
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
          Icon={SmokewallIcon}
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
          Icon={SmokewallIcon}
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
      </Box>
    </Box>
  )
}

export default Blocker
