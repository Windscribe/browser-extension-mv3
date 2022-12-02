import { Button, Flex } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import Badge from 'components/Badge'

type HeaderButtonProps = {
  Icon: React.ElementType
  isConnected: boolean
  count: number
  onClick?: () => void
}

const HeaderButton: ThemeUiElement<HeaderButtonProps> = ({
  Icon,
  isConnected,
  count = 0,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="circle"
      sx={{
        backgroundColor: isConnected ? 'halfBlack' : 'background',
        fill: 'halfWhite',
        transition: '0.3s',
        transform: 'scale(1)',
        ':hover': {
          transform: 'scale(1.1)',
          svg: {
            fill: 'white',
          },
        },
      }}
    >
      <Icon
        sx={{
          transition: '0.3s',
          fill: 'secondaryText',
        }}
      />
      <Badge count={count} sx={{ right: '-4px', bottom: '-2px' }} />
    </Button>
  )
}

export default HeaderButton
