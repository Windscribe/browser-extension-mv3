import { Box, Flex, Text, Link, useColorMode } from 'theme-ui'
import { useState } from 'react'
import bytes from 'bytes'
import { LOGOUT } from 'state/slices/session'
import { Badge, CircleButton, Header, RoundedBox, ListItemButton } from 'components'
import { SpaceBetween } from 'components/Flexbox'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import { useGoTo } from 'services/navigation'
import { useDispatch, useSelector, useDispatchAlias } from 'state/hooks'
import { useWindowOpening } from 'components/hooks'
import { ACCOUNT_PLAN, EMAIL, ENVS } from 'utils/constants'
import { type ThemeUiElement } from 'utils/types'
import ToolTip from 'components/ToolTip'
import ConfirmEmail from 'components/ConfirmEmail'

import NewsfeedIcon from 'assets/img/newsfeed.svg'
import GeneralIcon from 'assets/img/general.svg'
import ConnectionIcon from 'assets/img/connection.svg'
import BlockerIcon from 'assets/img/blocker.svg'
import PrivacyIcon from 'assets/img/privacy.svg'
import AccountIcon from 'assets/img/account.svg'
import AllowlistIcon from 'assets/img/allowlist.svg'
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
  const goToAllowlist = useGoTo('Allowlist')
  const goToNewsfeed = useGoTo('Newsfeed')
  const goToPrivacy = useGoTo('Privacy')
  const goToHome = useGoTo('Home')

  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const { openWindowUsingTempSession } = useWindowOpening()

  const runTutorial = () => {
    goToHome()
    dispatch(setShouldShowOnboarding(true))
  }

  const handleLogoutClick = async () => await dispatchAlias(LOGOUT)

  const viewedNewsIds = useSelector(state => state.newsfeed.viewedNewsIds)
  const notifications = useSelector(state => state.newsfeed.notifications)
  const unreadNewsAmount = notifications
    .map(n => n.id)
    .filter(id => !viewedNewsIds.includes(id)).length

  const traffic_max = useSelector(s => s.session?.sessionData?.traffic_max) || 0
  const traffic_used = useSelector(s => s.session?.sessionData?.traffic_used) || 0
  const is_premium = useSelector(s => s.session?.sessionData?.is_premium)
  const email_status = useSelector(s => s.session?.sessionData?.email_status)
  const email = useSelector(s => s.session?.sessionData?.email)

  const remainingDataBytes = bytes(traffic_max - traffic_used)
  const [isWebSessionPending, setIsWebSessionPending] = useState(false)

  const openKnowledgeBase = async () => {
    setIsWebSessionPending(true)
    await openWindowUsingTempSession('knowledge-base')
    setIsWebSessionPending(false)
  }

  return (
    <Box data-testid="preferences-page" bg="background">
      <Header title="Preferences">
        <ToolTip message="Newsfeed">
          <CircleButton
            data-testid="go-to-newsfeed-button"
            onClick={goToNewsfeed}
            Icon={NewsfeedIcon}
            sx={{ position: 'relative' }}
          >
            {unreadNewsAmount > 0 && (
              <Badge count={unreadNewsAmount} sx={{ top: '-2px', right: '-4px' }} />
            )}
          </CircleButton>
        </ToolTip>
      </Header>

      <Box sx={{ mx: '16px' }}>
        {is_premium || traffic_max === ACCOUNT_PLAN.UNLIMITED ? null : (
          <SpaceBetween mb="16px">
            <Text sx={{ color: 'primaryText', fontWeight: '600' }}>{remainingDataBytes} Left</Text>
            {email && email_status === EMAIL.UNCONFIRMED ? (
              <ConfirmEmail />
            ) : (
              <Link
                sx={{ textDecoration: 'none', color: 'lakeBlue' }}
                href={`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`}
                target="_blank"
              >
                Upgrade
              </Link>
            )}
          </SpaceBetween>
        )}
        <RoundedBox>
          <ListItemButton title="General" Icon={GeneralIcon} onClick={goToGeneral} />
          <ListItemButton title="Connection" Icon={ConnectionIcon} onClick={goToConnection} />
          <ListItemButton title="Blocker" Icon={BlockerIcon} onClick={goToBlocker} />
          <ListItemButton title="Privacy" Icon={PrivacyIcon} onClick={goToPrivacy} />
          <ListItemButton title="Account" Icon={AccountIcon} onClick={goToAccount} />
          <ListItemButton title="Allowlist" Icon={AllowlistIcon} onClick={goToAllowlist} noBorder />
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
            <ToolTip message="Change Theme">
              <CircleButton
                Icon={colorMode === 'light' ? LightModeIcon : DarkModeIcon}
                onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
              />
            </ToolTip>
            <ToolTip message="Restart Onboarding">
              <CircleButton
                Icon={TutorialIcon}
                onClick={runTutorial}
                data-testid="start-tutorial"
              />
            </ToolTip>
            <ToolTip message="Get Support">
              <CircleButton
                isPending={isWebSessionPending}
                Icon={HelpIcon}
                onClick={openKnowledgeBase}
              />
            </ToolTip>
          </Flex>
          <ToolTip message="Logout">
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
          </ToolTip>
        </Flex>
      </Box>
    </Box>
  )
}

export default Preferences
