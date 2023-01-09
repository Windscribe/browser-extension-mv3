import { Box } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { Header, OptionBox, ToggleSwitch } from 'components'
import { useDispatch, useSelector } from 'state/hooks'
import { toggleNotificationBlocker } from 'state/slices/notificationBlockerEnabled'
import DoNotDisturbIcon from 'assets/img/doNotDisturb.svg'

const Privacy: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const notificationBlockerEnabled = useSelector(s => s.notificationBlockerEnabled)

  return (
    <Box data-testid="privacy-page" bg="background">
      <Header title="Privacy" />
      <Box mx="16px">
        <OptionBox
          Icon={DoNotDisturbIcon}
          title="Do Not Disturb"
          subTitle="Block all sites from spamming you with notifications."
        >
          <ToggleSwitch
            onChange={() => dispatch(toggleNotificationBlocker())}
            checked={notificationBlockerEnabled}
          />
        </OptionBox>
      </Box>
    </Box>
  )
}

export default Privacy
