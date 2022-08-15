import { Flex, type FlexProps } from 'theme-ui'

type Props = React.PropsWithChildren<FlexProps>

const SpaceBetween: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}

export default SpaceBetween
