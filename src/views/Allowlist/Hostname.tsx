import { Text } from 'theme-ui'

const Hostname: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <Text
    sx={{
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: 1.14,
      color: 'primaryText',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }}
  >
    {children}
  </Text>
)

export default Hostname
