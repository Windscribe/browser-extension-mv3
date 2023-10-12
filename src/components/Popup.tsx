import { Box, type BoxProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

type PopupProps = React.PropsWithChildren<
  BoxProps & {
    isOpen: boolean
  }
>

const Popup: ThemeUiElement<PopupProps> = ({ isOpen, children, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: isOpen ? '100%' : 0,
        transition: 'height ease-in-out 0.2s',
        bottom: 0,
        position: 'absolute',
        overflow: 'hidden',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Popup
