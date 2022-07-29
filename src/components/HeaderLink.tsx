import { Button } from 'theme-ui'

import { type View } from 'state/slices/view'
import { goTo } from 'services/navigation'

type HeaderLinkProps = {
  buttonText: string
  buttonRoute: View
}

export default ({ buttonText, buttonRoute }: HeaderLinkProps) => (
  <Button
    data-testid="header-go-to-button"
    variant="simple"
    onClick={goTo(buttonRoute)}
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
