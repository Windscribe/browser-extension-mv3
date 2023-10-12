import { useSelector } from 'state/hooks'
import { type View } from 'utils/types'

import * as Views from 'views'

const Router: () => JSX.Element = () => {
  const currentView: View = useSelector(s => s?.view?.current)

  const View: React.ElementType = Views[currentView]
  return (
    <>{View ? <View /> : <p>Windscribe has encountered a problem. Please try again later.</p>}</>
  )
}

export default Router
