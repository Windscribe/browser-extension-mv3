import { Box } from 'theme-ui'
import bytes from 'bytes'

import { type ThemeUiElement } from 'utils/types'
import { ScrollableBox, Header, RoundedBox, ListItem, Subheader } from 'components'
import CircleButton from 'components/CircleButton'
import EditIcon from 'assets/img/edit.svg'
import { useSelector } from 'state/hooks'
import { useWindowOpening } from 'components/hooks'
import ToolTip from 'components/ToolTip'

const Account: ThemeUiElement = () => {
  const session = useSelector(s => s.session)
  const trafficMax = session.traffic_max || 0
  const trafficMaxFormatted = bytes(trafficMax)

  const { openWindowUsingTempSession } = useWindowOpening()

  const handleButtonClick = async () => {
    await openWindowUsingTempSession('myaccount')
  }

  return (
    <Box data-testid="account-page" bg="background">
      <Header title="Account">
        <ToolTip message="My Account">
          <CircleButton
            data-testid="edit-account-button"
            Icon={EditIcon}
            onClick={handleButtonClick}
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
              {session.username}
            </Box>
          </ListItem>
          <ListItem noBorder>
            Email
            <Box sx={{ fontWeight: '400' }}>{session.email}</Box>
          </ListItem>
        </RoundedBox>
        <Subheader>plan</Subheader>
        <RoundedBox sx={{ mb: '24px' }}>
          <ListItem>
            {session.traffic_max === -1 ? 'Unlimited' : trafficMaxFormatted} GB
            <Box sx={{ fontWeight: '400' }}>{session.is_premium ? 'Pro' : 'Free'}</Box>
          </ListItem>
          <ListItem noBorder>
            Expiry Date
            <Box sx={{ fontWeight: '400' }}>{session.premium_expiry_date}</Box>
          </ListItem>
        </RoundedBox>
      </ScrollableBox>
    </Box>
  )
}

export default Account
