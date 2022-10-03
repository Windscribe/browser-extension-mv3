import { Flex, FlexProps, Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type ListItemProps = FlexProps & {
  LeftSideComponent?: React.ReactNode
  RightSideComponent?: React.ReactNode
  noBorder?: boolean
}

const ListItem: ThemeUiElement<ListItemProps> = ({
  LeftSideComponent,
  RightSideComponent,
  noBorder = false,
  ...restProps
}) => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: '0 16px 0 0',
        width: '100%',
        alignItems: 'center',
        height: '48px',
        border: '2px',
        borderBottomColor: 'border',
        borderBottomStyle: noBorder ? 'none' : 'solid',
        fontWeight: 600,
        color: 'primaryText',
        transition: '0.3s',
      }}
      {...restProps}
    >
      <Flex>{LeftSideComponent}</Flex>
      <Box sx={{ fontWeight: '400' }}>{RightSideComponent}</Box>
    </Flex>
  )
}

export default ListItem
