import { Box, Flex } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { logout } from 'state/slices/session'
import { Header, RoundedBox, ListItemButton } from 'components'
import CircleButton from 'components/CircleButton'
import NewsfeedIcon from 'assets/img/newsfeed.svg'
import GeneralIcon from 'assets/img/general.svg'
import ConnectionIcon from 'assets/img/connection.svg'
import BlockerIcon from 'assets/img/blocker.svg'
import PrivacyIcon from 'assets/img/privacy.svg'
import AccountIcon from 'assets/img/account.svg'
import WhitelistIcon from 'assets/img/whitelist.svg'
import DarkModeIcon from 'assets/img/darkMode.svg'
import TutorialIcon from 'assets/img/tutorial.svg'
import HelpIcon from 'assets/img/help.svg'
import LogoutIcon from 'assets/img/logout.svg'
import { useGoTo } from 'services/navigation'
import { useDispatch } from 'state/hooks'

const Preferences: ThemeUiElement = () => {
  const goToGeneral = useGoTo('General')
  const goToConnection = useGoTo('Connection')
  const goToBlocker = useGoTo('Blocker')
  const dispatch = useDispatch()
  const goToAccount = useGoTo('Account')
  const handleLogoutClick = async () => await dispatch(logout())

  return (
    <Box data-testid="preferences-page" bg="background">
      <Header title="Preferences" RightSideComponent={<CircleButton Icon={NewsfeedIcon} />} />
      <Box sx={{ mx: '16px' }}>
        <RoundedBox>
          <ListItemButton title="General" Icon={GeneralIcon} onClick={goToGeneral} />
          <ListItemButton title="Connection" Icon={ConnectionIcon} onClick={goToConnection} />
          <ListItemButton title="Blocker" Icon={BlockerIcon} onClick={goToBlocker} />
          <ListItemButton title="Privacy" Icon={PrivacyIcon} />
          <ListItemButton title="Account" Icon={AccountIcon} onClick={goToAccount} />
          <ListItemButton title="Whitelist" Icon={WhitelistIcon} noBorder />
        </RoundedBox>
        <Flex
          sx={{
            py: '16px',
            justifyContent: 'space-between',
          }}
        >
          <Flex
            sx={{
              gap: '16px',
            }}
          >
            <CircleButton Icon={DarkModeIcon} />
            <CircleButton Icon={TutorialIcon} />
            <CircleButton Icon={HelpIcon} />
          </Flex>
          <CircleButton onClick={handleLogoutClick} Icon={LogoutIcon} data-testid="logout-button" />
        </Flex>
      </Box>
    </Box>
  )
}

export default Preferences
