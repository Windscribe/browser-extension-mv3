import { Button, Box, Flex, useThemeUI } from 'theme-ui'
import { type ThemeUiElement } from 'components/types'

type HeaderButtonProps = {
  Icon: React.ReactNode
  count: number
}

const HeaderButton: ThemeUiElement<HeaderButtonProps> = ({
  Icon,
  count = 0,
}: HeaderButtonProps) => {
  const { theme } = useThemeUI()

  return (
    <Button
      variant="circle"
      sx={{
        backgroundColor: theme.colors?.halfBlack,
        fill: theme.colors?.halfWhite,
        transition: '0.3s',
        transform: 'scale(1)',
        ':hover': {
          fill: theme.colors?.white,
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
          backgroundColor: theme.colors?.lightGreen,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '9px',
            color: theme.colors?.green,
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
