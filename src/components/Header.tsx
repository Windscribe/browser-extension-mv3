import { Box, Flex, Text, type BoxProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import GoBackButton from './GoBackButton'
import AlertButton from './AlertButton'
import { reloadCurrentTab } from 'services/currentTab'

type MandatoryProps = {
  title: string
}

// Header can be used without shouldShowReloadAlert but if shouldShowReloadAlert is passed than showReloadAlert is required
type OptionalProps =
  | { shouldShowReloadAlert?: undefined; showReloadAlert?: never }
  | { shouldShowReloadAlert: boolean; showReloadAlert: (flag: boolean) => void }

type HeaderProps = React.PropsWithChildren<MandatoryProps & OptionalProps & BoxProps>

const Header: ThemeUiElement<HeaderProps> = ({
  title,
  showReloadAlert,
  shouldShowReloadAlert,
  children,
  ...props
}) => {
  const handleClick = async () => {
    await reloadCurrentTab()
    // TODO Consider Should we reload all opened tabs instead just current one?
    showReloadAlert?.(false)
  }

  return (
    <Flex
      sx={{
        position: 'relative',
        height: '64px',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '16px',
      }}
      {...props}
    >
      <GoBackButton />
      <AlertButton
        text="Refresh to see changes"
        onClick={handleClick}
        sx={{
          visibility: shouldShowReloadAlert ? 'visible' : 'hidden',
          opacity: shouldShowReloadAlert ? 1 : 0,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '100%',
          left: '50%',
        }}
      />
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
}

export default Header
