import { Fragment, useMemo } from 'react'
import Joyride, { type Step, type CallBackProps } from 'react-joyride'

import { useDispatch, useSelector } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import JoyrideTooltip from './JoyrideTooltip'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'

const renderMultiline = (text: string) =>
  text.split('\n').map((line, index, lines) => (
    <Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </Fragment>
  ))

const Onboarding: ThemeUiElement = () => {
  const dispatch = useDispatch()

  const showOnboarding = useSelector(s => s.shouldShowOnboarding)
  const { currentLanguage } = useSelector(state => state.currentLanguage)

  const steps: Step[] = useMemo(
    () => [
      {
        target: '.joyride-element-proxy-button',
        content: (
          <p>{renderMultiline(getLocalizedMessage('wsext_tutorial_turn_on_proxy', currentLanguage))}</p>
        ),
        placement: 'auto',
        disableBeacon: true,
        spotlightPadding: 6,
      },
      {
        target: '.joyride-element-change-location',
        content: (
          <p>{renderMultiline(getLocalizedMessage('wsext_tutorial_change_location', currentLanguage))}</p>
        ),
        placement: 'left',
        spotlightPadding: 4,
        floaterProps: {
          disableFlip: true,
          options: { flip: { enabled: false } },
        },
      },
      {
        target: '.joyride-element-allowlist',
        content: (
          <p>
            {renderMultiline(getLocalizedMessage('wsext_tutorial_allowlist_a_site', currentLanguage))}
          </p>
        ),
        placement: 'bottom',
        spotlightPadding: 0,
      },
      {
        target: '.joyride-element-privacy',
        content: (
          <p>{renderMultiline(getLocalizedMessage('wsext_tutorial_control_privacy', currentLanguage))}</p>
        ),
        spotlightPadding: 4,
        placement: 'left',
        floaterProps: {
          disableFlip: true,
          options: { flip: { enabled: false } },
        },
      },
      {
        target: '.joyride-element-blocker',
        content: (
          <p>{renderMultiline(getLocalizedMessage('wsext_tutorial_control_blocker', currentLanguage))}</p>
        ),
        placement: 'left',
        spotlightPadding: 4,
      },
      {
        target: '.joyride-element-opt-out',
        content: (
          <p>{renderMultiline(getLocalizedMessage('wsext_tutorial_access_settings', currentLanguage))}</p>
        ),
      },
    ],
    [currentLanguage],
  )

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
      disableScrolling
      tooltipComponent={JoyrideTooltip}
      callback={handleJoyrideCallback}
      floaterProps={{
        styles: {
          arrow: {
            spread: 16,
            length: 8,
            margin: 12,
          },
        },
      }}
    />
  )
}

export default Onboarding
