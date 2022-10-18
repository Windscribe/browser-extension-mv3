import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { ENVS } from 'utils/constants'
import { Header, RoundedBox, ListItem } from 'components'
import AccountTitle from './AccountTitle'
import CircleButton from 'components/CircleButton'
import EditIcon from 'assets/img/edit.svg'
import { useSelector } from 'state/hooks'

const Account: ThemeUiElement = () => {
  const session = useSelector(s => s.session)

  return (
    <Box data-testid="account-page" bg="background">
      <Header
        title="Account"
        RightSideComponent={
          <CircleButton
            Icon={EditIcon}
            onClick={() => window.open(`${ENVS.ROOT_URL}/myaccount`)}
            sx={{
              backgroundColor: 'lakeBlue',
              svg: {
                fill: 'primaryText',
              },
            }}
          />
        }
      />
      <Box sx={{ mx: '16px' }}>
        <AccountTitle title="INFO" />
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            Username
            <Box sx={{ fontWeight: '400' }}>{session.username}</Box>
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
