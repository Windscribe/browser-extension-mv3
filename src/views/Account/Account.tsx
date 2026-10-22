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
import { getLocalizedMessage } from 'utils/getLocalisedString'

const addOneMonthToDate = (date?: string) => {
  if (!date) return
  const currentDate = new Date(date)
  currentDate.setMonth(currentDate.getMonth() + 1)
  return currentDate.toISOString().split('T')[0]
}

const Account: ThemeUiElement = () => {
  const sessionData = useSelector(s => s.session.sessionData)
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const trafficMax = sessionData?.traffic_max || 0
  const trafficMaxFormatted = bytes(trafficMax)

  const { openWindowUsingTempSession } = useWindowOpening()

  const openMyAccountPage = async () => await openWindowUsingTempSession('myaccount')
  const openUpgradePage = async () => await openWindowUsingTempSession('upgrade')

  return (
    <Box data-testid="account-page" bg="background">
      <Header title={getLocalizedMessage('wsext_account', currentLanguage)}>
        <ToolTip message={getLocalizedMessage('wsext_my_account', currentLanguage)}>
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
        <Subheader>{getLocalizedMessage('wsext_info', currentLanguage)}</Subheader>
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            {getLocalizedMessage('wsext_username', currentLanguage)}
            <Box
              sx={{ fontWeight: '400', overflowWrap: 'anywhere', minWidth: 0, textAlign: 'right' }}
              data-testid="account-username"
            >
              {sessionData?.username}
            </Box>
          </ListItem>
          <ListItem noBorder>
            {getLocalizedMessage('wsext_email', currentLanguage)}
            <Box
              sx={{ fontWeight: '400', overflowWrap: 'anywhere', minWidth: 0, textAlign: 'right' }}
            >
              {sessionData?.email || (
                <Button
                  onClick={openMyAccountPage}
                  sx={{ all: 'unset', cursor: 'pointer', color: 'lakeBlue' }}
                >
                  {getLocalizedMessage('wsext_add_email_with_bonus', currentLanguage)}
                </Button>
              )}
            </Box>
          </ListItem>
        </RoundedBox>
        <Subheader>{getLocalizedMessage('wsext_plan', currentLanguage)}</Subheader>
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            {sessionData?.traffic_max === -1
              ? getLocalizedMessage('wsext_unlimited', currentLanguage)
              : `${trafficMaxFormatted}${getLocalizedMessage('wsext_per_month', currentLanguage)}`}
            <Box
              sx={{ fontWeight: '400', overflowWrap: 'anywhere', minWidth: 0, textAlign: 'right' }}
            >
              {sessionData?.is_premium ? (
                getLocalizedMessage('wsext_pro', currentLanguage)
              ) : (
                <>
                  {sessionData?.email && sessionData?.email_status === EMAIL.UNCONFIRMED ? (
                    <ConfirmEmail />
                  ) : (
                    <Button
                      onClick={openUpgradePage}
                      sx={{ all: 'unset', cursor: 'pointer', color: 'lakeBlue' }}
                    >
                      {getLocalizedMessage('wsext_upgrade', currentLanguage)}
                    </Button>
                  )}
                </>
              )}
            </Box>
          </ListItem>
          <ListItem noBorder>
            {sessionData?.is_premium
              ? getLocalizedMessage('wsext_expiry_date', currentLanguage)
              : getLocalizedMessage('wsext_reset_date', currentLanguage)}
            <Box
              sx={{ fontWeight: '400', overflowWrap: 'anywhere', minWidth: 0, textAlign: 'right' }}
            >
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
