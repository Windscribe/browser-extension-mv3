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

  console.log(session)

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
          <ListItem LeftSideComponent={'Username'} RightSideComponent={session.username} />
          <ListItem LeftSideComponent={'Email'} RightSideComponent={session.email} noBorder />
        </RoundedBox>
        <AccountTitle title="PLAN" />
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem
            LeftSideComponent={`${
              session.traffic_max === -1 ? 'Unlimited' : session.traffic_max
            } GB`}
            RightSideComponent={session.is_premium ? 'Pro' : 'Free'}
          />
          <ListItem
            LeftSideComponent={'Expiry Date'}
            RightSideComponent={session.premium_expiry_date}
            noBorder
          />
        </RoundedBox>
      </Box>
    </Box>
  )
}

export default Account
