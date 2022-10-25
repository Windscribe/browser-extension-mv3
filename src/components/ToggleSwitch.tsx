import { type ThemeUiElement } from 'utils/types'
import { Switch } from 'theme-ui'

const ToggleSwitch: ThemeUiElement = () => {
  return (
    <Switch
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
