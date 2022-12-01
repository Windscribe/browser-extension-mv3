import { type ThemeUiElement } from 'utils/types'
import { type FlexProps } from 'theme-ui'

import { SpaceBetween } from './Flexbox'

type RectangleProps = React.PropsWithChildren<
  FlexProps & {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }
>

const Rectangle: ThemeUiElement<RectangleProps> = ({ onClick, children, ...restProps }) => (
  <SpaceBetween
    sx={{
      height: '48px',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: 'foreground',
    }}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </SpaceBetween>
)
export default Rectangle
