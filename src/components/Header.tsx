import { Box, Flex, Text } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import GoBackButton from './GoBackButton'

type HeaderProps = React.PropsWithChildren<{
  title: string
}>

const Header: ThemeUiElement<HeaderProps> = ({ title, children }) => (
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
    {children || <Box sx={{ width: '32px' }} />}
  </Flex>
)

export default Header
