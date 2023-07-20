import { Box, Button } from 'theme-ui'
import bytes from 'bytes'
import { type ThemeUiElement } from 'utils/types'
import { ScrollableBox, Header, RoundedBox, ListItem, Subheader } from 'components'
import CircleButton from 'components/CircleButton'
import EditIcon from 'assets/img/edit.svg'
import { useSelector } from 'state/hooks'
import { useWindowOpening } from 'components/hooks'
import ToolTip from 'components/ToolTip'
import ConfirmEmail from 'components/ConfirmEmail'
import { EMAIL } from 'utils/constants'

const addOneMonthToDate = (date?: string) => {
  if (!date) return
  const currentDate = new Date(date)
  currentDate.setMonth(currentDate.getMonth() + 1)
  return currentDate.toISOString().split('T')[0]
}

const Account: ThemeUiElement = () => {
  const sessionData = useSelector(s => s.session.sessionData)
  const trafficMax = sessionData?.traffic_max || 0
  const trafficMaxFormatted = bytes(trafficMax)

  const { openWindowUsingTempSession } = useWindowOpening()

  const openMyAccountPage = async () => await openWindowUsingTempSession('myaccount')
  const openUpgradePage = async () => await openWindowUsingTempSession('upgrade')

  return (
    <Box data-testid="account-page" bg="background">
      <Header title="Account">
        <ToolTip message="My Account">
          <CircleButton
            data-testid="edit-account-button"
            Icon={EditIcon}
            onClick={openMyAccountPage}
            sx={{
              background: 'lakeBlue',
              svg: {
                fill: 'white',
              },
              ':hover': {
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #006AFF',
                svg: {
                  fill: 'white',
                },
              },
            }}
          />
        </ToolTip>
      </Header>
      <ScrollableBox>
        <Subheader>info</Subheader>
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            Username
            <Box sx={{ fontWeight: '400' }} data-testid="account-username">
              {sessionData?.username}
            </Box>
          </ListItem>
          <ListItem noBorder>
            Email
            <Box sx={{ fontWeight: '400' }}>
              {sessionData?.email || (
                <Button
                  onClick={openMyAccountPage}
                  sx={{ all: 'unset', cursor: 'pointer', color: 'lakeBlue' }}
                >
                  Add Email (+8GB)
                </Button>
              )}
            </Box>
          </ListItem>
        </RoundedBox>
        <Subheader>plan</Subheader>
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            {sessionData?.traffic_max === -1 ? 'Unlimited' : `${trafficMaxFormatted}/month`}
            <Box sx={{ fontWeight: '400' }}>
              {sessionData?.is_premium ? (
                'Pro'
              ) : (
                <>
                  {sessionData?.email && sessionData?.email_status === EMAIL.UNCONFIRMED ? (
                    <ConfirmEmail />
                  ) : (
                    <Button
                      onClick={openUpgradePage}
                      sx={{ all: 'unset', cursor: 'pointer', color: 'lakeBlue' }}
                    >
                      Upgrade
                    </Button>
                  )}
                </>
              )}
            </Box>
          </ListItem>
          <ListItem noBorder>
            {sessionData?.is_premium ? 'Expiry' : 'Reset'} Date
            <Box sx={{ fontWeight: '400' }}>
              {sessionData?.is_premium
                ? sessionData?.premium_expiry_date
                : addOneMonthToDate(sessionData?.last_reset)}
            </Box>
          </ListItem>
        </RoundedBox>
      </ScrollableBox>
    </Box>
  )
}

export default Account
