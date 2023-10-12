import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { SpaceBetween } from 'components/Flexbox'

export type SubmitButtonMode = 'add' | 'save' | 'delete' | 'disabled'

type SubmitButtonProps = {
  submitButtonMode: SubmitButtonMode
  handleSubmit?: () => void
}

type ButtonsGroupProps = SubmitButtonProps & {
  handleCancel: () => void
}

const ButtonsGroup: React.FC<ButtonsGroupProps> = ({
  submitButtonMode,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <SpaceBetween mt="16px">
      <BasicButton
        onClick={handleCancel}
        sx={{
          backgroundColor: 'background',
          borderWidth: '2px',
          borderColor: 'secondaryText',
          borderStyle: 'solid',
          color: 'secondaryText',
          transition: '0.3s',
          '&:hover': {
            borderColor: 'primaryText',
            color: 'primaryText',
          },
        }}
      >
        Cancel
      </BasicButton>
      <SubmitButton {...{ submitButtonMode, handleSubmit }} />
    </SpaceBetween>
  )
}

type BasicButtonProps = React.PropsWithChildren<ButtonProps>
const BasicButton: ThemeUiElement<BasicButtonProps> = ({ children, ...props }) => (
  <Button
    variant="rounded"
    sx={{
      width: '138px',
    }}
    {...props}
  >
    {children}
  </Button>
)

const SubmitButton: React.FC<SubmitButtonProps> = ({ submitButtonMode, handleSubmit }) => {
  if (submitButtonMode === 'save') {
    return (
      <BasicButton onClick={handleSubmit} backgroundColor="lakeBlue" color="primaryText">
        Save
      </BasicButton>
    )
  }
  if (submitButtonMode === 'delete') {
    return (
      <BasicButton onClick={handleSubmit} backgroundColor="bloodRed" color="primaryText">
        Delete
      </BasicButton>
    )
  }
  if (submitButtonMode === 'disabled') {
    return (
      <BasicButton backgroundColor="foreground" color="disabledButtonText" disabled>
        Add
      </BasicButton>
    )
  }
  return (
    <BasicButton
      data-testid="allowlist-popup-submit-button"
      onClick={handleSubmit}
      backgroundColor="lakeBlue"
      color="primaryText"
    >
      Add
    </BasicButton>
  )
}

export default ButtonsGroup
