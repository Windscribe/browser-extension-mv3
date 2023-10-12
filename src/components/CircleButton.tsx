import { Button, type ButtonProps, Spinner } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type MenuButtonProps = ButtonProps & {
  isPending?: boolean
  Icon: React.ElementType
}
const CircleButton: ThemeUiElement<MenuButtonProps> = ({
  Icon,
  isPending = false,
  children,
  ...restProps
}) => {
  return (
    <Button
      variant="circle"
      sx={{
        backgroundColor: 'foreground',
        transition: '0.3s',
        svg: {
          fill: isPending ? 'transparent' : 'secondaryText',
        },
        ':hover': {
          svg: {
            fill: isPending ? 'transparent' : 'primaryText',
          },
        },
      }}
      {...restProps}
    >
      {' '}
      {isPending ? <Spinner /> : <Icon sx={{ transition: '0.3s' }} />}
      {children}
    </Button>
  )
}

export default CircleButton
