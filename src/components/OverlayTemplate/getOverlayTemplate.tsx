import type { OverlayTemplate } from 'utils/types'
import { useDispatch } from 'state/hooks'
import { setOverlay } from 'state/slices/overlay'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import CancelButton from './CancelButton'
import ConfirmButton from './ConfirmButton'

import teacherGarry from 'assets/img/garry/garryWithApple.png'
import constructionGarry from 'assets/img/garry/garryConstruction.png'
import cautionGarry from 'assets/img/garry/garryCaution.png'
import noDataGarry from 'assets/img/garry/garryNoData.png'
import { ENVS } from 'utils/constants'

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
    case 'ublockDetected':
      return {
        title: 'uBlock Already Installed',
        message:
          "Windscribe ad-blocker is powered by uBlock, which you already have installed. You shouldn't use both at the same time.",
        img: cautionGarry,
        ActionsBlock: UblockDetected,
      }
    case 'uninstallUblock':
      return {
        title: 'How To Disable uBlock',
        message:
          'Navigate to the extension page (chrome://extensions). Locate the uBlock extension and toggle the blue switch.',
        img: cautionGarry,
        ActionsBlock: UninstallUblock,
      }
    case 'noData':
      return {
        title: "You're out of Data",
        message: 'Please upgrade to stay protected',
        img: noDataGarry,
        ActionsBlock: NoData,
      }
    case 'extensionConflict':
      return {
        title: 'Extension Conflict',
        message:
          'Your proxy settings are being controlled by another extension. Please disable the conflicting extension to use Windscribe.',
        img: cautionGarry,
        ActionsBlock: ExtensionConflict,
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

function UblockDetected() {
  const dispatch = useDispatch()
  const open = () => {
    dispatch(setOverlay({ isOpen: true, template: 'uninstallUblock' }))
  }
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return (
    <>
      <ConfirmButton onClick={open}>Use Built In Adblock</ConfirmButton>
      <CancelButton onClick={close}>Keep Using uBlock</CancelButton>
    </>
  )
}

function UninstallUblock() {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return <CancelButton onClick={close}>Ok</CancelButton>
}

const NoData = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return (
    <>
      <ConfirmButton onClick={() => window.open(`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`)}>
        Upgrade
      </ConfirmButton>

      <CancelButton onClick={close}>Maybe Later</CancelButton>
    </>
  )
}

const ExtensionConflict = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return <CancelButton onClick={close}>Got it</CancelButton>
}
