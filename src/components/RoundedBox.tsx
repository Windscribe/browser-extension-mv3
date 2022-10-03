import { Box, type BoxProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type RoundedBoxProps = React.PropsWithChildren<BoxProps>

const RoundedBox: ThemeUiElement<RoundedBoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        pl: '16px',
        borderRadius: '8px',
        backgroundColor: 'foreground',
        display: 'inline-block',
        width: '100%',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default RoundedBox
