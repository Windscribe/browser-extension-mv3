import { Flex, Text } from 'theme-ui'
import { useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import GoBackButton from './GoBackButton'

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
      <GoBackButton prevPage={prevPage} />
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
