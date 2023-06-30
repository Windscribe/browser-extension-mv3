import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'
import ToolTip from './ToolTip'

type ToggleSwitchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  checked?: boolean
  disabled?: boolean
  bg?: string
}

const ToggleSwitch: ThemeUiElement<ToggleSwitchProps> = ({
  onChange,
  checked,
  disabled,
  bg = 'white',
  ...restProps
}) => {
  return (
    <ToolTip message="Not Available in Autopilot" sx={{ display: disabled ? 'block' : 'none' }}>
      <Switch
        checked={checked}
        onChange={disabled ? undefined : onChange}
        readOnly={disabled}
        sx={{
          m: 0,
          backgroundColor: bg,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? '0.3' : '1',
          width: '36px',
          height: '20px',
          '& > div': {
            backgroundColor: 'black',
            width: '16px',
            height: '16px',
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
    </ToolTip>
  )
}

export default ToggleSwitch
