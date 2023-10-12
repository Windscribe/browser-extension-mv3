import Joyride, { type Step, type CallBackProps } from 'react-joyride'

import { useDispatch, useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import JoyrideTooltip from './JoyrideTooltip'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'

const steps: Step[] = [
  {
    target: '.joyride-element-proxy-button',
    content: <p>{'Turn on the proxy'}</p>,
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '.joyride-element-change-location',
    content: <p>{'Change location'}</p>,
    placement: 'left',
  },
  {
    target: '.joyride-element-allowlist',
    content: (
      <p>
        {'Allowlist a site to bypass our proxy,'}
        <br />
        {'allow ads, or switch off privacy features'}
      </p>
    ),
    placement: 'top',
  },
  {
    target: '.joyride-element-privacy',
    content: (
      <p>
        {'Control your privacy'}
        <br />
        {'settings by clicking here'}
      </p>
    ),
  },
  {
    target: '.joyride-element-blocker',
    content: (
      <p>
        {'Control your blocker'}
        <br />
        {'settings by clicking here'}
      </p>
    ),
    placement: 'left',
  },
  {
    target: '.joyride-element-opt-out',
    content: (
      <p>
        {'Access the tutorial and other'}
        <br />
        {'settings by clicking here'}
      </p>
    ),
  },
]

const Onboarding: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const showOnboarding = useSelector(s => s.shouldShowOnboarding)

  const handleJoyrideCallback: (props: CallBackProps) => void = ({ status }) => {
    if (status === 'finished' || status === 'skipped') {
      dispatch(setShouldShowOnboarding(false))
    }
  }

  return (
    <Joyride
      data-testid={'tutorial-overlay'}
      steps={steps}
      run={showOnboarding}
      continuous
      disableOverlayClose
      tooltipComponent={JoyrideTooltip}
      callback={handleJoyrideCallback}
      floaterProps={{
        styles: {
          arrow: {
            spread: 16,
            length: 8,
            margin: 12,
          },
          container: {
            maxWidth: 250,
          },
        },
      }}
    />
  )
}

export default Onboarding
