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
      backgroundColor: 'foregroundSolid',
      color: 'primaryText',
      borderRadius: '4px',
      wordBreak: 'break-all',
      fontWeight: '600',
      fontSize: '12px',
      my: '4px',
      '.tippy-content': {
        p: '3px 6px',
      },
      '.tippy-arrow': {
        color: 'foregroundSolid',
      },
    }}
    {...props}
  >
    <span>{children}</span>
  </Tippy>
)

export default ToolTip
