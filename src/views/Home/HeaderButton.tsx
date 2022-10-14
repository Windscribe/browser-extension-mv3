import { Button, Box, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type HeaderButtonProps = {
  Icon: React.ElementType
  isConnected: boolean
  count: number
}

const HeaderButton: ThemeUiElement<HeaderButtonProps> = ({ Icon, isConnected, count = 0 }) => {
  return (
    <Button
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
      <Flex
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          height: '14px',
          width: '14px',
          right: '-4px',
          bottom: '-2px',
          backgroundColor: 'neonGreen70',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '9px',
            color: 'neonGreen',
            fontWeight: '700',
          }}
        >
          {count}
        </Box>
      </Flex>
    </Button>
  )
}

export default HeaderButton
