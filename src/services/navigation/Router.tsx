import { useLayoutEffect } from 'react'
import { useSelector } from 'state/hooks'
import { useColorMode } from 'theme-ui'
import { type View } from 'utils/types'
import { getLocalizedMessage } from 'utils/getLocalisedString'

import * as Views from 'views'

const Router: () => JSX.Element = () => {
  const currentView: View = useSelector(s => s?.view?.current)
  const theme = useSelector(s => s?.theme?.value)
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const [, setColorMode] = useColorMode()
  useLayoutEffect(() => {
    if (theme) {
      // theme is set in local storage of the popup
      setColorMode(theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const View: React.ElementType = Views[currentView]
  return (
    <>{View ? <View /> : <p>{getLocalizedMessage('wsext_encountered_problem', currentLanguage)}</p>}</>
  )
}

export default Router
