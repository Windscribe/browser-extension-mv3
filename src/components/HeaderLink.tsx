import { Button } from 'theme-ui'

import { useGoTo } from 'services/navigation'
import type { ThemeUiElement, View } from 'utils/types'

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
      color: 'primaryText',
      opacity: 0.5,
      transition: '0.3s',
      '&:hover': {
        opacity: 1,
      },
    }}
  >
    {buttonText}
  </Button>
)

export default HeaderLink
