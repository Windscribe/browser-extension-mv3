import { Box, Spinner, Text } from 'theme-ui'

import { type LoadingState } from 'utils/types'

export default function withSpinner<P extends object>(
  WrappedComponent: JSX.Element,
  loadingState: LoadingState,
  errorText?: string,
): (spinnerProps?: P) => JSX.Element | null {
  return function (spinnerProps) {
    if (loadingState === 'pending') {
      return (
        <>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
              backgroundColor: 'quarterWhite',
            }}
          >
            <Spinner
              color="white"
              data-testid="spinner"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translateY(-50%) translateX(-50%)',
              }}
              {...spinnerProps}
            />
          </Box>
          {WrappedComponent}
        </>
      )
    }
    if (loadingState === 'fulfilled') return WrappedComponent
    if (loadingState === 'rejected') {
      return errorText ? <Text variant="error">{errorText}</Text> : null
    }
    return null
  }
}
