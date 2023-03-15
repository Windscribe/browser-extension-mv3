import { Button, type ButtonProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type MenuButtonProps = ButtonProps & {
  Icon: React.ElementType
}
const CircleButton: ThemeUiElement<MenuButtonProps> = ({ Icon, children, ...restProps }) => {
  return (
    <Button
      variant="circle"
      sx={{
        backgroundColor: 'foreground',
        transition: '0.3s',
        svg: {
          fill: 'secondaryText',
        },
        ':hover': {
          svg: {
            fill: 'primaryText',
          },
        },
      }}
      {...restProps}
    >
      <Icon sx={{ transition: '0.3s' }} />
      {children}
    </Button>
  )
}

export default CircleButton
