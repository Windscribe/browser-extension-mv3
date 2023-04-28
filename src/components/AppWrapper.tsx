import { Box, type BoxProps } from 'theme-ui'

import { useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import { bodyMaxHeight } from 'styles/constants'

const AppWrapper: ThemeUiElement<BoxProps> = ({ children, ...props }) => {
  const templates = useSelector(state => state.overlay.templates)

  return (
    <Box
      sx={{
        width: '100%',
        height: templates?.length ? '444px' : 'auto', //bodyMaxHeight : 'auto',
        transition: 'height ease-in-out 1.2s',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default AppWrapper
