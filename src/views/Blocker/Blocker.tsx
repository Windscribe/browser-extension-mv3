import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { setBlockLists } from 'state/slices/blocker'
import SmokewallIcon from 'assets/img/smokewall.svg'

const Blocker: ThemeUiElement = () => {
  const blockLists = useSelector(s => s.blocker.blockLists)
  const dispatch = useDispatch()

  const handleBlockListToggle = (listName: string) => {
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
      <Header title="Blocker" />
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
      </Box>
    </Box>
  )
}

export default Blocker
