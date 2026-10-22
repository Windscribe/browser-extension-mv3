import { useState } from 'react'
import { Button, Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { sendEmailConfirmation } from 'api/endpoints'
import { useDispatch, useSelector } from 'state/hooks'
import { getLocalizedMessage } from 'utils/getLocalisedString'

const ConfirmEmail: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const [isEmailSent, setIsEmailSent] = useState(false)
  const sessionAuthHash = useSelector(state => state.session.sessionData?.session_auth_hash) || ''
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  return (
    <>
      {isEmailSent ? (
        <Box sx={{ color: 'primaryText' }}>
          {getLocalizedMessage('wsext_confirmation_email_sent', currentLanguage)}
        </Box>
      ) : (
        <Button
          sx={{ all: 'unset', color: 'lakeBlue', cursor: 'pointer' }}
          onClick={() => {
            setIsEmailSent(true)
            sendEmailConfirmation(dispatch, sessionAuthHash)
          }}
        >
          {getLocalizedMessage('wsext_confirm_email', currentLanguage)}
        </Button>
      )}
    </>
  )
}

export default ConfirmEmail
