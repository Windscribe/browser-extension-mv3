import { Button, type ButtonProps } from 'theme-ui'

import type { ThemeUiElement } from 'utils/types'

const CancelButton: ThemeUiElement<ButtonProps> = ({ children, ...props }) => (
  <Button
    variant="rounded"
    sx={{
      width: '166px',
      height: '40px',
      p: 0,
      backgroundColor: 'background',
      borderWidth: '2px',
      borderColor: 'secondaryText',
      borderStyle: 'solid',
      color: 'secondaryText',
      transition: 'color 0.3s, background-color 0.3s',
      '&:hover': {
        color: 'softBlack',
        backgroundColor: 'white',
      },
    }}
    {...props}
  >
    {children}
  </Button>
)

export default CancelButton
