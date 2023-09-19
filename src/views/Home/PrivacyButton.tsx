import { createSelector } from '@reduxjs/toolkit'
import { type ThemeUiElement } from 'utils/types'
import { useGoTo } from 'services/navigation'
import { type RootState } from 'state'
import HeaderButton from './HeaderButton'
import { useSelector } from 'state/hooks'
import PrivacyIcon from 'assets/img/privacy.svg'

// TODO Uncomment selectors when correspondent slices will be merged
// Might be better to have a count variable slice that is updated every time a privacy option is toggled
const privacyCount = createSelector(
  [
    //(state: RootState) => state.cookieMonster.enabled,
    (state: RootState) => state.notificationBlockerEnabled,
    (state: RootState) => state.webRtcEnabled,
    (state: RootState) => state.locationWarp,
    (state: RootState) => state.timeWarpEnabled,
    (state: RootState) => state.languageWarpEnabled,
    (state: RootState) => state.splitPersonalityEnabled,
    (state: RootState) => state.workerBlock,
    (state: RootState) => state.adPrivacyEnabled,
  ],
  (...arg) => {
    return arg.filter(Boolean).length
  },
)

const PrivacyButton: ThemeUiElement = () => {
  const goToPrivacy = useGoTo('Privacy')

  const count = useSelector(privacyCount)
  const status = useSelector(s => s.proxy.status)

  return (
    <HeaderButton
      className="joyride-element-privacy"
      Icon={PrivacyIcon}
      isConnected={status === 'on'}
      count={count}
      onClick={goToPrivacy}
    />
  )
}

export default PrivacyButton
