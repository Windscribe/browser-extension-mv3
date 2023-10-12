import { Button, type ButtonProps } from 'theme-ui'

import type { ThemeUiElement } from 'utils/types'

const ConfirmButton: ThemeUiElement<ButtonProps> = ({ children, ...props }) => (
  <Button
    variant="rounded"
    sx={{
      width: '166px',
      height: '40px',
      mb: '16px',
      p: 0,
      backgroundColor: 'neonGreen',
      color: 'softBlack',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: 'white',
      },
    }}
    {...props}
  >
    {children}
  </Button>
)

export default ConfirmButton
