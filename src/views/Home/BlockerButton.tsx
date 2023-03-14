import { type ThemeUiElement } from 'utils/types'
import { useGoTo } from 'services/navigation'
import HeaderButton from './HeaderButton'
import { useSelector } from 'state/hooks'
import BlockerIcon from 'assets/img/blocker.svg'

const BlockerButton: ThemeUiElement = () => {
  const goToBlocker = useGoTo('Blocker')
  const isConnected = useSelector(s => s.proxy?.isConnected)

  return (
    <HeaderButton Icon={BlockerIcon} isConnected={isConnected} count={0} onClick={goToBlocker} />
  )
}

export default BlockerButton
