import { Box, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { Header } from 'components'
import MenuButton from './MenuButton'
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

const Preferences: ThemeUiElement = () => {
  return (
    <Box data-testid="preferences-page" bg="background">
      <Header title="Preferences" RightSideComponent={<CircleButton Icon={NewsfeedIcon} />} />
      <Box
        sx={{
          pl: '16px',
          mx: '16px',
          borderRadius: '8px',
          backgroundColor: 'foreground',
        }}
      >
        <MenuButton title="General" Icon={GeneralIcon} />
        <MenuButton title="Connection" Icon={ConnectionIcon} />
        <MenuButton title="Blocker" Icon={BlockerIcon} />
        <MenuButton title="Privacy" Icon={PrivacyIcon} />
        <MenuButton title="Account" Icon={AccountIcon} />
        <MenuButton title="Whitelist" Icon={WhitelistIcon} sx={{ border: 'none' }} />
      </Box>
      <Flex
        sx={{
          padding: '16px',
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
        <CircleButton Icon={LogoutIcon} />
      </Flex>
    </Box>
  )
}

export default Preferences
