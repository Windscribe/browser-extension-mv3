import { useLayoutEffect } from 'react'
import { useSelector } from 'state/hooks'
import { useColorMode } from 'theme-ui'
import { type View } from 'utils/types'

import * as Views from 'views'

const Router: () => JSX.Element = () => {
  const currentView: View = useSelector(s => s?.view?.current)
  const theme = useSelector(s => s?.theme?.value)
  const [, setColorMode] = useColorMode()
  useLayoutEffect(() => {
    if (theme) {
      setColorMode(theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const View: React.ElementType = Views[currentView]
  return (
    <>{View ? <View /> : <p>Windscribe has encountered a problem. Please try again later.</p>}</>
  )
}

export default Router
