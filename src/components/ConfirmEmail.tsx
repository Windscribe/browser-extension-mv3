import { useState } from 'react'
import { Button, Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { sendEmailConfirmation } from 'api/endpoints'
import { useDispatch, useSelector } from 'state/hooks'

const ConfirmEmail: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const [isEmailSent, setIsEmailSent] = useState(false)
  const sessionAuthHash = useSelector(state => state.session.sessionData?.session_auth_hash) || ''

  return (
    <>
      {isEmailSent ? (
        <Box sx={{ color: 'primaryText' }}>Confirmation email sent!</Box>
      ) : (
        <Button
          sx={{ all: 'unset', color: 'lakeBlue', cursor: 'pointer' }}
          onClick={() => {
            setIsEmailSent(true)
            sendEmailConfirmation(dispatch, sessionAuthHash)
          }}
        >
          Confirm Email
        </Button>
      )}
    </>
  )
}

export default ConfirmEmail
