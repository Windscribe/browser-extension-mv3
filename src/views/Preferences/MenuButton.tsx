import { Button, Flex, ButtonProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import ArrowRightIcon from 'assets/img/arrowRight.svg'

type MenuButtonProps = ButtonProps & {
  title: string
  Icon: React.ElementType
}

const MenuButton: ThemeUiElement<MenuButtonProps> = ({ title, Icon, ...restProps }) => {
  return (
    <Button data-testid={title} variant="menu" sx={{ transition: '0.3s' }} {...restProps}>
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
    </Button>
  )
}

export default MenuButton
