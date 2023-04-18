import type { OverlayTemplate } from 'utils/types'
import { useDispatch } from 'state/hooks'
import { setOverlay } from 'state/slices/overlay'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import CancelButton from './CancelButton'
import ConfirmButton from './ConfirmButton'
import { ENVS } from 'utils/constants'

import teacherGarry from 'assets/img/garry/garryWithApple.png'
import constructionGarry from 'assets/img/garry/garryConstruction.png'
import cautionGarry from 'assets/img/garry/garryCaution.png'
import noDataGarry from 'assets/img/garry/garryNoData.png'
import sadGarry from 'assets/img/garry/garrySad.png'
import angryGarry from 'assets/img/garry/garryAngry.png'

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
          'Connection could not be established, please try a different location or contact support.',
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
        message: 'Please upgrade to stay protected.',
        img: noDataGarry,
        ActionsBlock: NoData,
      }
    case 'proPlanExpired':
      return {
        title: 'Your Pro Plan Has Expired!',
        message: 'You lost access to premium locations and unlimited data.',
        img: sadGarry,
        ActionsBlock: ProPlanExpired,
      }
    case 'banned':
      return {
        title: "You've been banned",
        message: 'Your account has been disabled for violating our terms of service',
        img: angryGarry,
        ActionsBlock: Banned,
      }
    case 'extensionConflict':
      return {
        title: 'Extension Conflict',
        message:
          'Your proxy settings are being controlled by another extension. Please disable the conflicting extension to use Windscribe.',
        img: cautionGarry,
        ActionsBlock: ExtensionConflict,
      }
    case 'locationDown':
      return {
        title: 'This location is under maintenance',
        message: 'Please try again later or go to the status page for more info.',
        img: constructionGarry,
        ActionsBlock: LocationDown,
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
      <CancelButton onClick={close} data-testid="skip-tutorial">
        Skip
      </CancelButton>
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
      <ConfirmButton
        onClick={() => {
          close()
          window.open(`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`)
        }}
      >
        Upgrade
      </ConfirmButton>
      <CancelButton onClick={close}>Maybe Later</CancelButton>
    </>
  )
}

const ProPlanExpired = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          window.open(`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`)
        }}
      >
        Renew Plan
      </ConfirmButton>
      <CancelButton onClick={close}>Ignore</CancelButton>
    </>
  )
}

const Banned = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))
  return (
    <CancelButton
      onClick={() => {
        close()
        window.open(`${ENVS.ROOT_URL}/terms`)
      }}
    >
      Learn More
    </CancelButton>
  )
}

const ExtensionConflict = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return <CancelButton onClick={close}>Got it</CancelButton>
}

const LocationDown = () => {
  const dispatch = useDispatch()
  const close = () => dispatch(setOverlay({ isOpen: false }))

  return (
    <>
      <ConfirmButton onClick={() => window.open(`${ENVS.ROOT_URL}/status`)}>
        Check Status
      </ConfirmButton>
      <CancelButton onClick={close}>Back</CancelButton>
    </>
  )
}
