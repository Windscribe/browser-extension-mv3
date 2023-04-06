import { Box, Flex, Text, Link, useColorMode } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { logout } from 'state/slices/session'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import { Header, RoundedBox, ListItemButton } from 'components'
import CircleButton from 'components/CircleButton'
import Badge from 'components/Badge'
import { useGoTo } from 'services/navigation'
import { useDispatch, useSelector } from 'state/hooks'
import { ACCOUNT_PLAN, ENVS } from 'utils/constants'
import bytes from 'bytes'
import { SpaceBetween } from 'components/Flexbox'

import NewsfeedIcon from 'assets/img/newsfeed.svg'
import GeneralIcon from 'assets/img/general.svg'
import ConnectionIcon from 'assets/img/connection.svg'
import BlockerIcon from 'assets/img/blocker.svg'
import PrivacyIcon from 'assets/img/privacy.svg'
import AccountIcon from 'assets/img/account.svg'
import WhitelistIcon from 'assets/img/whitelist.svg'
import DarkModeIcon from 'assets/img/darkMode.svg'
import LightModeIcon from 'assets/img/lightMode.svg'
import TutorialIcon from 'assets/img/tutorial.svg'
import HelpIcon from 'assets/img/help.svg'
import LogoutIcon from 'assets/img/logout.svg'

const Preferences: ThemeUiElement = () => {
  const [colorMode, setColorMode] = useColorMode()
  const goToGeneral = useGoTo('General')
  const goToConnection = useGoTo('Connection')
  const goToBlocker = useGoTo('Blocker')
  const goToAccount = useGoTo('Account')
  const goToWhitelist = useGoTo('Whitelist')
  const goToNewsfeed = useGoTo('Newsfeed')
  const goToPrivacy = useGoTo('Privacy')
  const goToHome = useGoTo('Home')
  const dispatch = useDispatch()

  const runTutorial = () => {
    goToHome()
    dispatch(setShouldShowOnboarding(true))
  }

  const handleLogoutClick = async () => await dispatch(logout())

  const viewedNewsIds = useSelector(state => state.newsfeed.viewedNewsIds)
  const notifications = useSelector(state => state.newsfeed.notifications)
  const unreadNewsAmount = notifications.length - viewedNewsIds.length

  const data = useSelector(s => s.session)

  const { traffic_max = 0, traffic_used = 0, is_premium } = data
  const remainingDataBytes = bytes(traffic_max - traffic_used)

  return (
    <Box data-testid="preferences-page" bg="background">
      <Header title="Preferences">
        <CircleButton
          data-testid="go-to-newsfeed-button"
          onClick={goToNewsfeed}
          Icon={NewsfeedIcon}
          sx={{ position: 'relative' }}
        >
          <Badge count={unreadNewsAmount} sx={{ top: '-2px', right: '-4px' }} />
        </CircleButton>
      </Header>

      <Box sx={{ mx: '16px' }}>
        {is_premium || traffic_max === ACCOUNT_PLAN.UNLIMITED ? null : (
          <SpaceBetween mb="16px">
            <Text sx={{ color: 'primaryText', fontWeight: '600' }}>{remainingDataBytes} Left</Text>
            <Link
              sx={{ textDecoration: 'none', color: 'lakeBlue' }}
              href={`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`}
              target="_blank"
            >
              Upgrade
            </Link>
          </SpaceBetween>
        )}
        <RoundedBox>
          <ListItemButton title="General" Icon={GeneralIcon} onClick={goToGeneral} />
          <ListItemButton title="Connection" Icon={ConnectionIcon} onClick={goToConnection} />
          <ListItemButton title="Blocker" Icon={BlockerIcon} onClick={goToBlocker} />
          <ListItemButton title="Privacy" Icon={PrivacyIcon} onClick={goToPrivacy} />
          <ListItemButton title="Account" Icon={AccountIcon} onClick={goToAccount} />
          <ListItemButton title="Whitelist" Icon={WhitelistIcon} onClick={goToWhitelist} noBorder />
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
            <CircleButton
              Icon={colorMode === 'light' ? LightModeIcon : DarkModeIcon}
              onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
            />
            <CircleButton Icon={TutorialIcon} onClick={runTutorial} />
            <CircleButton Icon={HelpIcon} />
          </Flex>
          <CircleButton
            onClick={handleLogoutClick}
            Icon={LogoutIcon}
            data-testid="logout-button"
            sx={{
              svg: {
                fill: 'bloodRed',
              },
              ':hover': {
                background: 'linear-gradient(0deg, rgb(0 0 0 / 20%), rgb(0 0 0 / 20%)), #FF3B3B',
                svg: {
                  fill: 'white',
                },
              },
            }}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default Preferences
