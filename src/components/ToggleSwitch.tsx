import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'

type ToggleSwitchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  checked?: boolean
  disabled?: boolean
}

const ToggleSwitch: ThemeUiElement<ToggleSwitchProps> = ({
  onChange,
  checked,
  disabled,
  ...restProps
}) => {
  return (
    <Switch
      checked={checked}
      onChange={disabled ? undefined : onChange}
      readOnly={disabled}
      sx={{
        m: 0,
        backgroundColor: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? '0.3' : '1',
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
      {...restProps}
    />
  )
}

export default ToggleSwitch
