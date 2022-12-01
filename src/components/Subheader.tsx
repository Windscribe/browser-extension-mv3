import { Text, type TextProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

type SubheaderProps = React.PropsWithChildren<TextProps>

const Subheader: ThemeUiElement<SubheaderProps> = ({ children, ...props }) => (
  <Text sx={{ display: 'block', ml: '16px', mb: '8px' }} variant="subheader" {...props}>
    {children}
  </Text>
)

export default Subheader
