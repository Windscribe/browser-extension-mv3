import { Box, type BoxProps } from 'theme-ui'

import { useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import { bodyMaxHeight } from 'styles/constants'
import { OverlayGenerator } from './Overlay/OverlayGenerator'
import SessionStatusChecker from './SessionStatusChecker'

const AppWrapper: ThemeUiElement<BoxProps> = ({ children, ...props }) => {
  const templates = useSelector(state => state.overlay.templates)

  return (
    <Box
      sx={{
        width: '100%',
        height: templates?.length ? bodyMaxHeight : 'auto',
      }}
      {...props}
    >
      {children}
      <OverlayGenerator />
      <SessionStatusChecker />
    </Box>
  )
}

export default AppWrapper
