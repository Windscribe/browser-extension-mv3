import { Flex, type FlexProps } from 'theme-ui'

type Props = React.PropsWithChildren<FlexProps>

const Column: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Column
