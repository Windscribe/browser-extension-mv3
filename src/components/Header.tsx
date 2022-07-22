import { Button, Flex, Text, useThemeUI } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { goBack } from 'services/navigation'

interface HeaderProps {
  title: string
  RightSideComponent?: React.ReactNode
}

const Header = ({ title, RightSideComponent }: HeaderProps) => {
  const { theme } = useThemeUI()

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
        onClick={goBack()}
        variant="circle"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease 0s',
          '&:focus': {
            border: '1px solid ${colors.iconBg}',
          },
          '&:hover': {
            'box-shadow': 'rgb(2 13 28 / 20%) 0px 0px 0px 8px',
            outline: '0px',
          },
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
