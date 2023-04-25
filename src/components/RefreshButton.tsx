import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

const RefreshButton: ThemeUiElement<ButtonProps> = ({ ...restProps }) => {
  return (
    <Button
      variant="rounded"
      sx={{
        width: '160px',
        fontSize: '12px',
        backgroundColor: 'orange',
        zIndex: 1,
        filter: 'brightness(0.9)',
        ':hover': {
          filter: 'brightness(1)',
        },
      }}
      {...restProps}
    >
      Refresh to see changes
    </Button>
  )
}

export default RefreshButton
