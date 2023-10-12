import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useGoBack } from 'services/navigation'
import { type ThemeUiElement, type View } from 'utils/types'
import { useSelector } from 'state/hooks'
import CircleButton from 'components/CircleButton'

const GoBackButton: ThemeUiElement = () => {
  const { previous } = useSelector(s => s.view)
  const prevPage: View = previous[previous.length - 1] ?? ''

  return (
    <CircleButton
      Icon={ArrowLeft}
      onClick={useGoBack()}
      aria-label={`Back to ${prevPage}`}
      data-testid="go-back-button"
    />
  )
}

export default GoBackButton
