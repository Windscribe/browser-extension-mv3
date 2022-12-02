import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

export type IconButtonProps = ButtonProps & {
  active?: boolean
  onClick: React.MouseEventHandler
  children: React.ReactElement // Should be more specific - SVG element only. Don't know how to do it yet
}
const IconButton: ThemeUiElement<IconButtonProps> = ({
  active = false,
  children,
  ...restProps
}) => (
  <Button
    variant="simple"
    sx={{
      fill: active ? 'primaryText' : 'secondaryText',
      padding: '0px 12px 0px 8px',
      position: 'relative',
      height: '20px',
      svg: {
        transition: 'all 0.3s ease 0s',
      },
      '&:hover': {
        svg: {
          fill: 'primaryText',
        },
      },
      '&:after': {
        content: '""',
        width: '16px',
        position: 'absolute',
        backgroundColor: active ? 'primaryText' : 'transparent',
        height: '2px',
        bottom: '-2px',
        left: '8px',
        transition: 'background-color ease 0.3s',
      },
    }}
    {...restProps}
  >
    {children}
  </Button>
)

export default IconButton
