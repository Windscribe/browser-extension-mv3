import type { OverlayTemplate } from 'utils/types'
import { useDispatch } from 'state/hooks'
import { setOverlay } from 'state/slices/overlay'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import CancelButton from './CancelButton'
import ConfirmButton from './ConfirmButton'

import teacherGarry from 'assets/img/garry/garryWithApple.png'
import constructionGarry from 'assets/img/garry/garryConstruction.png'

type OverlayTemplateContent = {
  title: string
  message: string
  img: string
  ActionsBlock?: React.ComponentType
}

export const getOverlayTemplate = (template: OverlayTemplate): OverlayTemplateContent => {
  switch (template) {
    case 'welcome':
      return {
        title: 'You Are Connected',
        message: 'Your connection is now secure.   Do you want to learn how to use the extension?',
        img: teacherGarry,
        ActionsBlock: Welcome,
      }
    case 'somethingWeird':
      return {
        title: 'Something went wrong',
        message:
          'Connection could not be established, please try a different location or contact support',
        img: constructionGarry,
        ActionsBlock: SomethingWeird,
      }
  }
}

function Welcome() {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false, template: 'somethingWeird' }))

  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          dispatch(setShouldShowOnboarding(true))
        }}
      >
        Start Tutorial
      </ConfirmButton>
      <CancelButton onClick={close}>Skip</CancelButton>
    </>
  )
}

function SomethingWeird() {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))
  return (
    <>
      <CancelButton onClick={close}>Got it</CancelButton>
    </>
  )
}
