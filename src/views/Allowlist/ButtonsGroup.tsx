import { Button, type ButtonProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'
import { SpaceBetween } from 'components/Flexbox'
import { useSelector } from 'state/hooks'
import { getLocalizedMessage } from 'utils/getLocalisedString'

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
  const { currentLanguage } = useSelector(s => s.currentLanguage)
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
        {getLocalizedMessage('wsext_cancel', currentLanguage)}
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
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  if (submitButtonMode === 'save') {
    return (
      <BasicButton onClick={handleSubmit} backgroundColor="lakeBlue" color="primaryText">
        {getLocalizedMessage('wsext_save', currentLanguage)}
      </BasicButton>
    )
  }
  if (submitButtonMode === 'delete') {
    return (
      <BasicButton onClick={handleSubmit} backgroundColor="bloodRed" color="primaryText">
        {getLocalizedMessage('wsext_delete', currentLanguage)}
      </BasicButton>
    )
  }
  if (submitButtonMode === 'disabled') {
    return (
      <BasicButton backgroundColor="foreground" color="disabledButtonText" disabled>
        {getLocalizedMessage('wsext_add', currentLanguage)}
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
      {getLocalizedMessage('wsext_add', currentLanguage)}
    </BasicButton>
  )
}

export default ButtonsGroup
