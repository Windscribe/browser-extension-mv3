import { type ThemeUiElement } from 'utils/types'
import { useGoTo } from 'services/navigation'
import HeaderButton from './HeaderButton'
import { useSelector } from 'state/hooks'
import BlockerIcon from 'assets/img/blocker.svg'

const BlockerButton: ThemeUiElement = () => {
  const goToBlocker = useGoTo('Blocker')
  const blockLists = useSelector(s => s.blocker.blockLists)
  const status = useSelector(s => s.proxy.status)

  return (
    <HeaderButton
      className="joyride-element-blocker"
      Icon={BlockerIcon}
      isConnected={status === 'on'}
      count={blockLists.length}
      onClick={goToBlocker}
    />
  )
}

export default BlockerButton
