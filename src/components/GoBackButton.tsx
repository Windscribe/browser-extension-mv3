import { Button, useThemeUI } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useGoBack } from 'services/navigation'
import { type ThemeUiElement, type View } from 'utils/types'
import { useSelector } from 'state/hooks'

const GoBackButton: ThemeUiElement = () => {
  const { theme } = useThemeUI()
  const { iconBgSolid, quarterSoftBlack } = theme.colors || {}

  const { previous } = useSelector(s => s.view)
  const prevPage: View = previous[previous.length - 1] ?? ''

  return (
    <Button
      data-testid="go-back-button"
      onClick={useGoBack()}
      variant="circle"
      aria-label={`Back to ${prevPage}`}
      sx={{
        transition: 'box-shadow 0.3s ease 0s',
        '&:focus': {
          border: `1px solid ${iconBgSolid}`,
        },
        '&:hover': {
          boxShadow: `${quarterSoftBlack} 0px 0px 0px 8px`,
          outline: '0px',
          svg: {
            fill: 'primaryText',
          },
        },
      }}
    >
      <ArrowLeft
        className="go-back-icon"
        sx={{
          minWidth: '16px',
          fill: 'secondaryText',
          transition: 'all 0.3s ease 0s',
        }}
      />
    </Button>
  )
}

export default GoBackButton
