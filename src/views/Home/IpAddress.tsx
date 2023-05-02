import { useState, useEffect } from 'react'
import { Button } from 'theme-ui'
import { useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import AlertButton from 'components/AlertButton'

const IpAddress: ThemeUiElement = () => {
  const currentIp = useSelector(state => state.proxy.currentIp)

  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isBlurred, setIsBlurred] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      showAlert && setShowAlert(false)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [showAlert])

  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      setIsBlurred(!isBlurred)
    } else {
      const newTimeout = setTimeout(() => {
        navigator.clipboard.writeText(currentIp)
        setShowAlert(true)
        setClickTimeout(null)
      }, 250)
      setClickTimeout(newTimeout)
    }
  }

  return (
    <>
      <Button
        sx={{ all: 'unset', cursor: 'pointer', filter: isBlurred ? 'blur(4px)' : 'none' }}
        onClick={handleClick}
      >
        {currentIp}
      </Button>
      <AlertButton
        text="IP Address Copied"
        onClick={handleClick}
        sx={{
          visibility: showAlert ? 'visible' : 'hidden',
          opacity: showAlert ? 1 : 0,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '100%',
          left: '50%',
        }}
      />
    </>
  )
}

export default IpAddress
