import { Button, Flex, Text } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useGoBack } from 'services/navigation'
import { useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'components/types'

interface HeaderProps {
  title: string
  RightSideComponent?: React.ReactNode
}

const Header: ThemeUiElement<HeaderProps> = ({ title, RightSideComponent }) => {
  const { previous } = useSelector(s => s.view)
  const prevPage = previous[previous.length - 1] ?? ''

  return (
    <Flex
      sx={{
        height: '64px',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '16px',
        borderBottom: '1px solid',
        borderColor: 'border',
      }}
    >
      <Button
        data-testid="go-back-button"
        onClick={useGoBack()}
        variant="circle"
        aria-label={`Back to ${prevPage}`}
        sx={{
          transition: 'all 0.3s ease 0s',
          '&:focus': {
            border: '1px solid ${colors.iconBg}',
          },
          '&:hover': {
            boxShadow: 'rgb(2 13 28 / 20%) 0px 0px 0px 8px',
            outline: '0px',
          },
        }}
      >
        <ArrowLeft
          sx={{
            minWidth: '16px',
            fill: 'primaryText',
          }}
        />
      </Button>
      <Text
        data-testid="header-title"
        sx={{
          fontSize: '24px',
          color: 'primaryText',
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
