import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { ENVS } from 'utils/constants'
import { Header, RoundedBox, ListItem } from 'components'
import AccountTitle from './AccountTitle'
import CircleButton from 'components/CircleButton'
import EditIcon from 'assets/img/edit.svg'
import { useSelector } from 'state/hooks'
import { getWebSession } from 'api/endpoints'

const Account: ThemeUiElement = () => {
  const session = useSelector(s => s.session)
  const workingApi = useSelector(s => s.workingApi)

  const handleButtonClick = async () => {
    if (session.session_auth_hash) {
      const response = await getWebSession(session.session_auth_hash, workingApi)
      const tempSession = response?.data?.temp_session
      if (tempSession) window.open(`${ENVS.ROOT_URL}/myaccount?temp_session=${tempSession}`)
    }
  }

  return (
    <Box data-testid="account-page" bg="background">
      <Header title="Account">
        <CircleButton
          data-testid="edit-account-button"
          Icon={EditIcon}
          onClick={handleButtonClick}
          sx={{
            backgroundColor: 'lakeBlue',
            svg: {
              fill: 'primaryText',
            },
          }}
        />
      </Header>
      <Box sx={{ mx: '16px' }}>
        <AccountTitle title="INFO" />
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            Username
            <Box sx={{ fontWeight: '400' }} data-testid="account-username">
              {session.username}
            </Box>
          </ListItem>
          <ListItem noBorder>
            Email
            <Box sx={{ fontWeight: '400' }}>{session.email}</Box>
          </ListItem>
        </RoundedBox>
        <AccountTitle title="PLAN" />
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            {session.traffic_max === -1 ? 'Unlimited' : session.traffic_max} GB
            <Box sx={{ fontWeight: '400' }}>{session.is_premium ? 'Pro' : 'Free'}</Box>
          </ListItem>
          <ListItem noBorder>
            Expiry Date
            <Box sx={{ fontWeight: '400' }}>{session.premium_expiry_date}</Box>
          </ListItem>
        </RoundedBox>
      </Box>
    </Box>
  )
}

export default Account
