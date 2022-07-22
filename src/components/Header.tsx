import { Button, Flex, Text, useThemeUI } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useDispatch } from 'state/hooks'
import { back } from 'state/slices/view'

interface HeaderProps {
  title: string
  RightSideComponent?: React.ReactNode
}

const Header = ({ title, RightSideComponent }: HeaderProps) => {
  const { theme } = useThemeUI()
  const dispatch = useDispatch()
  const goBack = () => dispatch(back())

  return (
    <Flex
      sx={{
        height: '64px',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '16px',
        borderBottom: `1px solid ${theme.colors?.border}`,
      }}
    >
      <Button
        onClick={goBack}
        variant="circle"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ArrowLeft
          sx={{
            minWidth: '16px',
            fill: theme.colors?.primaryText,
          }}
        />
      </Button>
      <Text
        sx={{
          fontSize: '24px',
          color: theme.colors?.primaryText,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
      {RightSideComponent}
    </Flex>
  )
}

export default Header
