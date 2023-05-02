import { Label } from 'theme-ui'

import { ListItem, Checkbox } from 'components'
import { type ListItemProps } from 'components/ListItem'

type SettingsOptionProps = React.PropsWithChildren<
  ListItemProps & {
    toggleState: (newState: boolean) => void
    isChecked: boolean
  }
>

const SettingsOption: React.FC<SettingsOptionProps> = ({
  toggleState,
  isChecked,
  children,
  ...props
}) => {
  const handleClick: React.MouseEventHandler = () => {
    toggleState(!isChecked)
  }

  return (
    <ListItem
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        transition: 'all ease 0.3s',
        '& label': {
          transition: '0.3s',
        },
        'svg > path': {
          transition: '0.3s',
        },
        '&:hover': {
          '& label': {
            color: 'primaryText',
          },
          svg: {
            transform: 'scale(1.1)',
            fill: isChecked ? 'lakeBlue' : 'primaryText',
          },
        },
      }}
      {...props}
    >
      <Label color="secondaryText" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {children}
      </Label>
      <Checkbox isChecked={isChecked} />
    </ListItem>
  )
}

export default SettingsOption
