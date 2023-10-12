import { Box, Link, type LinkProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import LinkIcon from 'assets/img/link.svg'

type OptionLinkBoxProps = React.PropsWithChildren<LinkProps> & {
  url: string
  text: string
}

const OptionLinkBox: ThemeUiElement<OptionLinkBoxProps> = ({ url, text, ...props }) => {
  return (
    <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
      <Link href={url} target="_blank" variant="optionBlock" {...props}>
        <Box>{text}</Box>
        <LinkIcon sx={{ fill: 'secondaryText', minWidth: '16px' }} />
      </Link>
    </Box>
  )
}

export default OptionLinkBox
