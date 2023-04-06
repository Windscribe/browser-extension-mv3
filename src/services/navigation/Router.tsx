import { useSelector } from 'state/hooks'
import { Box } from 'theme-ui'
import { type View } from 'utils/types'

import * as Views from 'views'

const Router: () => JSX.Element = () => {
  const currentView: View = useSelector(s => s?.view?.current)
  const isOverlayOpen = useSelector(state => state.overlay.isOpen)

  const View: React.ElementType = Views[currentView]
  return (
    <Box sx={{ position: isOverlayOpen ? 'absolute' : 'static' }}>
      {View ? <View /> : <p>Windscribe has encountered a problem. Please try again later.</p>}
    </Box>
  )
}

export default Router
