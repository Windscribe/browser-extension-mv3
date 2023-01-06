import { Flex, type FlexProps } from 'theme-ui'

type Props = React.PropsWithChildren<FlexProps>

const AlignItemsCenter: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default AlignItemsCenter
