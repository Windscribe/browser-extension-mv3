import { Box, Text } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { Header, HeaderLink } from 'components'
import Button from './Button'
import { Column } from 'components/Flexbox'
import { useSelector } from 'state/hooks'
import { getLocalizedMessage } from 'utils/getLocalisedString'

const Signup: ThemeUiElement = () => {
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  return (
    <Box data-testid="signup-page" bg="background">
      <Column>
        <Header
          title={getLocalizedMessage('wsext_sign_up', currentLanguage)}
          sx={{ borderBottom: '2px solid', borderColor: 'border' }}
        >
          <HeaderLink
            buttonRoute="Login"
            buttonText={getLocalizedMessage('wsext_login', currentLanguage)}
          />
        </Header>
      </Column>
      <Column>
        <Text
          color="secondaryText"
          pt="26px"
          sx={{
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          {getLocalizedMessage('wsext_pick_your_plan', currentLanguage)}
        </Text>
        <Box mx="32px" my="24px">
          <Button
            dataTestId="windscribe-signup-button"
            bg="foreground"
            color="primaryText"
            text={getLocalizedMessage('wsext_free', currentLanguage)}
            subtext={getLocalizedMessage('wsext_free_description', currentLanguage)}
            url="https://windscribe.com/signup?cpid=ext_chrome&platform=chrome"
          />
        </Box>
        <Box mx="32px" mb="46px">
          <Button
            bg="neonGreen"
            color="black"
            text={getLocalizedMessage('wsext_pro', currentLanguage)}
            subtext={getLocalizedMessage('wsext_pro_description', currentLanguage)}
            url="https://windscribe.com/upgrade?pcpid=upgrade_ext1"
          />
        </Box>
      </Column>
    </Box>
  )
}

export default Signup
