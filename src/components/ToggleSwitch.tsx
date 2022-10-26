import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'

type ToggleSwitchProps = {
  onClick?: () => void
}

const ToggleSwitch: ThemeUiElement<ToggleSwitchProps> = ({ onClick }) => {
  return (
    <Switch
      onClick={onClick}
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
