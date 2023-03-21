import { Flex } from 'theme-ui'

import { useSelector } from 'state/hooks'
import { OverlayTemplate } from './OverlayTemplate'

const FullSizeOverlay: React.FC = () => {
  const { isOpen } = useSelector(s => s.overlay)

  return (
    <Flex
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 'auto',
        maxHeight: isOpen ? '470px' : 0,
        color: 'primaryText',
        backgroundColor: 'background',
        overflow: 'hidden',
        transition: 'max-height ease-in-out 0.2s',
      }}
    >
      <OverlayTemplate />
    </Flex>
  )
}

export default FullSizeOverlay
