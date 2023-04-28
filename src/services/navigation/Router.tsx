//import { Box } from 'theme-ui'

import { useSelector } from 'state/hooks'
import { type View } from 'utils/types'

import * as Views from 'views'

const Router: () => JSX.Element = () => {
  const currentView: View = useSelector(s => s?.view?.current)
  //const templates = useSelector(state => state.overlay.templates)

  const View: React.ElementType = Views[currentView]
  return (
    // <Box sx={{ width: '100%', position: templates?.length ? 'absolute' : 'static' }}>
    <>{View ? <View /> : <p>Windscribe has encountered a problem. Please try again later.</p>}</>
    // </Box>
  )
}

export default Router
