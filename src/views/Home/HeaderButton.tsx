import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import Badge from 'components/Badge'

type HeaderButtonProps = ButtonProps & {
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
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant="circle"
      sx={{
        backgroundColor: isConnected ? 'halfBlack' : 'darkBackground',
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
      {...props}
    >
      <Icon
        sx={{
          transition: '0.3s',
          fill: 'halfWhite',
        }}
      />
      <Badge count={count} sx={{ right: '-4px', bottom: '-2px' }} />
    </Button>
  )
}

export default HeaderButton
