import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'

type ToggleSwitchProps = {
  checked?: boolean
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const ToggleSwitch: ThemeUiElement<ToggleSwitchProps> = ({ onClick, onChange, checked }) => {
  return (
    <Switch
      checked={checked}
      onClick={onClick}
      onChange={onChange}
      sx={{
        m: 0,
        backgroundColor: 'white',
        '& > div': {
          backgroundColor: 'black',
        },
        'input:checked ~ &': {
          backgroundColor: 'lakeBlue',
          '& > div': {
            backgroundColor: 'white',
          },
        },
      }}
    />
  )
}

export default ToggleSwitch
