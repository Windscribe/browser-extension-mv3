import { createSelector } from '@reduxjs/toolkit'

import { type ThemeUiElement } from 'utils/types'
import { useGoTo } from 'services/navigation'
import { type RootState } from 'state'
import HeaderButton from './HeaderButton'
import { useSelector } from 'state/hooks'
import PrivacyIcon from 'assets/img/privacy.svg'

// TODO Uncomment selectors when correspondent slices will be merged
const selectIsInFavorite = createSelector(
  [
    //(state: RootState) => state.cookieMonster.enabled,
    (state: RootState) => state.notificationBlockerEnabled,
    (state: RootState) => state.webRtcEnabled,
    (state: RootState) => state.locationWarp,
    //(state: RootState) => state.timeWarp,
    (state: RootState) => state.languageWarpEnabled,
    (state: RootState) => state.splitPersonalityEnabled,
    (state: RootState) => state.workerBlock,
  ],
  (...arg) => {
    return arg.filter(Boolean).length
  },
)

const PrivacyButton: ThemeUiElement = () => {
  const goToPrivacy = useGoTo('Privacy')

  const count = useSelector(selectIsInFavorite)
  const isConnected = useSelector(s => s.proxy?.isConnected)

  return (
    <HeaderButton
      className="joyride-element-privacy"
      Icon={PrivacyIcon}
      isConnected={isConnected}
      count={count}
      onClick={goToPrivacy}
    />
  )
}

export default PrivacyButton
