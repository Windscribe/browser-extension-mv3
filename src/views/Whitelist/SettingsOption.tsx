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
  const handleClick: React.MouseEventHandler = e => {
    toggleState(!isChecked)
  }

  return (
    <ListItem onClick={handleClick} sx={{ cursor: 'pointer' }} {...props}>
      <Label color="secondaryText" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
        {children}
      </Label>
      <Checkbox isChecked={isChecked} />
    </ListItem>
  )
}

export default SettingsOption
