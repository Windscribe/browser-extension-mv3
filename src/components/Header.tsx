import { Button, Flex, Text, useThemeUI } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { goBack, goTo } from 'services/navigation'
import { type View } from 'state/slices/view'
import { useSelector } from 'state/hooks'

interface HeaderProps {
  title: string
  buttonText: string
  buttonRoute: View
}

const Header = ({ title, buttonText, buttonRoute }: HeaderProps) => {
  const { theme } = useThemeUI()
  const { previous } = useSelector(s => s.view)
  const prevPage = previous[previous.length - 1] ?? ''

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
        aria-label={`Back to ${prevPage}`}
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
      <Button
        variant="simple"
        onClick={goTo(buttonRoute)}
        sx={{
          fontSize: '14px',
          color: 'white',
          opacity: 0.5,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {buttonText}
      </Button>
    </Flex>
  )
}

export default Header
