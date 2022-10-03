import { Button, ButtonProps, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import ListItem from 'components/ListItem'
import ArrowRightIcon from 'assets/img/arrowRight.svg'

type MenuButtonProps = ButtonProps & {
  title: string
  Icon: React.ElementType
  noBorder?: boolean
}

const MenuButton: ThemeUiElement<MenuButtonProps> = ({
  title,
  Icon,
  noBorder = false,
  ...restProps
}) => {
  return (
    <Button
      data-testid={title}
      variant="simple"
      sx={{
        transition: '0.3s',
        width: '100%',
      }}
      {...restProps}
    >
      <ListItem
        noBorder={noBorder}
        sx={{
          color: 'secondaryText',
          '&:hover': {
            color: 'primaryText',
            '& svg': {
              fill: 'primaryText',
            },
          },
        }}
      >
        <Flex>
          <Icon
            sx={{
              marginRight: '16px',
              fill: 'primaryText',
            }}
          />
          {title}
        </Flex>
        <ArrowRightIcon
          sx={{
            transition: '0.3s',
            fill: 'secondaryText',
          }}
        />
      </ListItem>
    </Button>
  )
}

export default MenuButton
