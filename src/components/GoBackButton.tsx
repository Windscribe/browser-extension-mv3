import { Button } from 'theme-ui'
import ArrowLeft from 'assets/img/arrowLeft.svg'
import { useGoBack } from 'services/navigation'
import { type ThemeUiElement, type View } from 'utils/types'

const GoBackButton: ThemeUiElement<{ prevPage: View }> = ({ prevPage }) => (
  <Button
    data-testid="go-back-button"
    onClick={useGoBack()}
    variant="circle"
    aria-label={`Back to ${prevPage}`}
    sx={{
      transition: 'all 0.3s ease 0s',
      '&:focus': {
        border: '1px solid ${colors.iconBg}',
      },
      '&:hover': {
        boxShadow: 'rgb(2 13 28 / 20%) 0px 0px 0px 8px',
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

export default GoBackButton
