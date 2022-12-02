import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type AccountTitleProps = {
  title: string
}

// TODO move to components
const AccountTitle: ThemeUiElement<AccountTitleProps> = ({ title }) => {
  return (
    <Box
      sx={{
        ml: '16px',
        fontWeight: '600',
        fontSize: '12px',
        letterSpacing: '3px',
        color: 'secondaryText',
        mb: '8px',
      }}
    >
      {title}
    </Box>
  )
}

export default AccountTitle
