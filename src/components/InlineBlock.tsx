import { Box, type BoxProps } from 'theme-ui'

type Props = React.PropsWithChildren<BoxProps>

const InlineBlock: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default InlineBlock
