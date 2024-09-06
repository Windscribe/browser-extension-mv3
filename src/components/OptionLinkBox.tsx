import { Box, Link, type LinkProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import LinkIcon from 'assets/img/link.svg'
import ToolTip from './ToolTip'

type OptionLinkBoxProps = React.PropsWithChildren<LinkProps> & {
  url: string
  text: string
  disabled?: boolean
  message?: string
}

const OptionLinkBox: ThemeUiElement<OptionLinkBoxProps> = ({
  url,
  text,
  disabled = false,
  message,
  ...props
}) => {
  return (
    <ToolTip message={message} sx={{ display: disabled ? 'block' : 'none' }}>
      <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
        <Link
          href={url}
          target="_blank"
          variant="optionBlock"
          {...props}
          sx={{
            pointerEvents: disabled ? 'none' : 'auto',
          }}
        >
          <Box>{text}</Box>
          <LinkIcon sx={{ fill: 'secondaryText', minWidth: '16px' }} />
        </Link>
      </Box>
    </ToolTip>
  )
}

export default OptionLinkBox
