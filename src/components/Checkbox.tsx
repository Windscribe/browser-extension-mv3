import CheckmarkIcon from 'assets/img/checkmark.svg'

type CheckboxProps = {
  isChecked?: boolean
}
const Checkbox: React.FC<CheckboxProps> = ({ isChecked = false }) => {
  return (
    <CheckmarkIcon
      sx={{
        fill: isChecked ? 'lakeBlue' : 'secondaryText',
      }}
    />
  )
}

export default Checkbox
