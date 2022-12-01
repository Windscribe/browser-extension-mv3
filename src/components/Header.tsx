import { Box, Flex, Text } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import GoBackButton from './GoBackButton'

interface HeaderProps {
  title: string
  RightSideComponent?: React.ReactNode
}

// TODO Refactor. Use children instead RightSideComponent
const Header: ThemeUiElement<HeaderProps> = ({ title, RightSideComponent }) => (
  <Flex
    sx={{
      height: '64px',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: '16px',
    }}
  >
    <GoBackButton />
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
    {RightSideComponent || <Box sx={{ width: '32px' }} />}
  </Flex>
)

export default Header
