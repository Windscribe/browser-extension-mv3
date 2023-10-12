import { type TextProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

type ToolTipProps = React.PropsWithChildren<TextProps> & {
  message: string
}

const ToolTip: ThemeUiElement<ToolTipProps> = ({ message, children, ...props }) => (
  <Tippy
    content={message}
    sx={{
      backgroundColor: 'foreground',
      color: 'primaryText',
      borderRadius: '4px',
      wordBreak: 'break-all',
      fontWeight: '600',
      fontSize: '12px',
      my: '4px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.10)',
      '.tippy-content': {
        p: '3px 6px',
      },
      '.tippy-arrow': {
        color: 'foreground',
      },
    }}
    {...props}
  >
    <span>{children}</span>
  </Tippy>
)

export default ToolTip
