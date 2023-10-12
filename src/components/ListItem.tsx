import { Flex, FlexProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

export type ListItemProps = React.PropsWithChildren<FlexProps> & {
  noBorder?: boolean
}

const ListItem: ThemeUiElement<ListItemProps> = ({ noBorder = false, children, ...restProps }) => {
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
      {children}
    </Flex>
  )
}

export default ListItem
