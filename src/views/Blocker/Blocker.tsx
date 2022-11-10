import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { setBlocker } from 'state/slices/blocker'
import SmokewallIcon from 'assets/img/smokewall.svg'

const Blocker: ThemeUiElement = () => {
  const blocker = useSelector(s => s.blocker.blocker)
  const dispatch = useDispatch()

  return (
    <Box data-testid="blocker-page" bg="background">
      <Header title="Blocker" />
      <Box mx="16px">
        <OptionBox Icon={SmokewallIcon} title="Blocker" subTitle="Toggle uBlock lite.">
          <ToggleSwitch
            onChange={() => {
              dispatch(setBlocker(!blocker))
              chrome.runtime.sendMessage({
                what: 'applyRulesets',
                enabledRulesets: blocker ? [] : ['default', 'cname-trackers'],
              })
            }}
            checked={blocker}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Blocker
