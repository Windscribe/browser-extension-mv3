import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useGoBack } from 'services/navigation'
import { type ThemeUiElement, type View } from 'utils/types'
import { useSelector } from 'state/hooks'
import CircleButton from 'components/CircleButton'
import { getLocalizedMessage } from 'utils/getLocalisedString'

const viewToMessageKey: Partial<Record<View, Parameters<typeof getLocalizedMessage>[0]>> = {
  Preferences: 'wsext_preferences',
  General: 'wsext_general',
  Connection: 'wsext_connection',
  Blocker: 'wsext_blocker',
  Privacy: 'wsext_privacy',
  LinkSanitizer: 'wsext_link_sanitizer',
  Account: 'wsext_account',
  Allowlist: 'wsext_allowlist',
  Newsfeed: 'wsext_news_feed',
  Locations: 'wsext_locations',
  Login: 'wsext_login',
  Signup: 'wsext_sign_up',
  Home: 'wsext_general',
}

const GoBackButton: ThemeUiElement = () => {
  const { previous } = useSelector(s => s.view)
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const prevPage: View = previous[previous.length - 1] ?? ''
  const prevPageKey = viewToMessageKey[prevPage]
  const prevPageLabel = prevPageKey ? getLocalizedMessage(prevPageKey, currentLanguage) : prevPage

  return (
    <CircleButton
      Icon={ArrowLeft}
      onClick={useGoBack()}
      aria-label={getLocalizedMessage('wsext_back_to', currentLanguage, { page: prevPageLabel })}
      data-testid="go-back-button"
    />
  )
}

export default GoBackButton
