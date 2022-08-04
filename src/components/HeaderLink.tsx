import { Button } from 'theme-ui'

import { type View } from 'state/slices/view'
import { useGoTo } from 'services/navigation'
import { type ThemeUiElement } from 'components/types'

type HeaderLinkProps = {
  buttonText: string
  buttonRoute: View
}

const HeaderLink: ThemeUiElement<HeaderLinkProps> = ({ buttonText, buttonRoute }) => (
  <Button
    data-testid="header-go-to-button"
    variant="simple"
    onClick={useGoTo(buttonRoute)}
    sx={{
      fontSize: '14px',
      color: 'white',
      opacity: 0.5,
      '&:hover': {
        opacity: 1,
      },
    }}
  >
    {buttonText}
  </Button>
)

export default HeaderLink
