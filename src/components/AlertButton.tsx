import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

const AlertButton: ThemeUiElement<ButtonProps & { text: string }> = ({ text, ...restProps }) => {
  return (
    <Button
      variant="rounded"
      sx={{
        p: '6px 12px',
        fontSize: '12px',
        backgroundColor: 'orange',
        color: 'black',
        zIndex: 1,
        filter: 'brightness(0.9)',
        transition: '0.3s',
        ':hover': {
          filter: 'brightness(1)',
        },
      }}
      {...restProps}
    >
      {text}
    </Button>
  )
}

export default AlertButton
