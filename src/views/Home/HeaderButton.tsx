import { Button, Box, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type HeaderButtonProps = {
  Icon: React.ReactNode
  count: number
}

const HeaderButton: ThemeUiElement<HeaderButtonProps> = ({ Icon, count = 0 }) => {
  return (
    <Button
      variant="circle"
      sx={{
        backgroundColor: 'halfBlack',
        fill: 'halfWhite',
        transition: '0.3s',
        transform: 'scale(1)',
        ':hover': {
          fill: 'white',
          transform: 'scale(1.1)',
        },
      }}
    >
      {Icon}
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
