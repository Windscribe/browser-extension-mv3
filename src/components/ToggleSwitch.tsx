import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'

type ToggleSwitchProps = {
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const ToggleSwitch: ThemeUiElement<ToggleSwitchProps> = ({ onChange, checked }) => {
  return (
    <Switch
      checked={checked}
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
