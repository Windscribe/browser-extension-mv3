import type { OverlayTemplate } from 'utils/types'
import { useDispatch, useSelector } from 'state/hooks'
import { addOverlay, removeAllOverlays } from 'state/slices/overlay'
import { setShouldShowOnboarding } from 'state/slices/shouldShowOnboarding'
import CancelButton from './CancelButton'
import ConfirmButton from './ConfirmButton'
import { BROWSING_DATA, CONTENT_SETTINGS, ENVS } from 'utils/constants'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import { clearCurrentSiteData } from 'services/siteData/clearCurrentSiteData'
import { pushToDebugLog } from 'services/debugLog'

import teacherGarry from 'assets/img/garry/garryWithApple.png'
import constructionGarry from 'assets/img/garry/garryConstruction.png'
import cautionGarry from 'assets/img/garry/garryCaution.png'
import noDataGarry from 'assets/img/garry/garryNoData.png'
import sadGarry from 'assets/img/garry/garrySad.png'
import angryGarry from 'assets/img/garry/garryAngry.png'
import { setShouldShowWelcome } from 'state/slices/shouldShowWelcome'
import {
  setShowUblockWarningAtBlockerPage,
  setShowUblockWarningAtHomePage,
  setShowUblockWarningAtLinkSanitizer,
} from 'state/slices/blocker'
import { setPrivateModeModalShown } from 'state/slices/privateMode'
import { setDismissedUpgradeWarning } from 'state/slices/upgradeWarning'
import { toggleUblockLite } from 'services/detectUblock'

type ActionsBlockComponent = React.ComponentType<{ close: () => void }>

type OverlayTemplateContent = {
  title: string
  message: string
  img: string
  ActionsBlock?: ActionsBlockComponent
}

export const useOverlayTemplate = (template: OverlayTemplate): OverlayTemplateContent => {
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  const t = (key: Parameters<typeof getLocalizedMessage>[0]) =>
    getLocalizedMessage(key, currentLanguage)

  switch (template) {
    case 'welcome':
      return {
        title: t('wsext_overlay_welcome_title'),
        message: t('wsext_overlay_welcome_message'),
        img: teacherGarry,
        ActionsBlock: Welcome,
      }
    case 'somethingWeird':
      return {
        title: t('wsext_overlay_something_weird_title'),
        message: t('wsext_overlay_something_weird_message'),
        img: constructionGarry,
        ActionsBlock: SomethingWeird,
      }
    case 'ublockDetected':
      return {
        title: t('wsext_overlay_ublock_detected_title'),
        message: t('wsext_overlay_ublock_detected_message'),
        img: cautionGarry,
        ActionsBlock: UblockDetected,
      }
    case 'ublockLinkSanitizer':
      return {
        title: t('wsext_overlay_ublock_detected_title'),
        message: t('wsext_overlay_ublock_link_sanitizer_message'),
        img: cautionGarry,
        ActionsBlock: UblockLinkSanitizer,
      }
    case 'uninstallUblock':
      return {
        title: t('wsext_overlay_uninstall_ublock_title'),
        message: t('wsext_overlay_uninstall_ublock_message'),
        img: cautionGarry,
        ActionsBlock: UninstallUblock,
      }
    case 'noData':
      return {
        title: t('wsext_overlay_no_data_title'),
        message: t('wsext_overlay_no_data_message'),
        img: noDataGarry,
        ActionsBlock: NoData,
      }
    case 'proPlanExpired':
      return {
        title: t('wsext_overlay_pro_plan_expired_title'),
        message: t('wsext_overlay_pro_plan_expired_message'),
        img: sadGarry,
        ActionsBlock: ProPlanExpired,
      }
    case 'banned':
      return {
        title: t('wsext_overlay_banned_title'),
        message: t('wsext_overlay_banned_message'),
        img: angryGarry,
        ActionsBlock: Banned,
      }
    case 'extensionConflict':
      return {
        title: t('wsext_overlay_extension_conflict_title'),
        message: t('wsext_overlay_extension_conflict_message'),
        img: cautionGarry,
        ActionsBlock: ExtensionConflict,
      }
    case 'locationDown':
      return {
        title: t('wsext_overlay_location_down_title'),
        message: t('wsext_overlay_location_down_message'),
        img: constructionGarry,
        ActionsBlock: LocationDown,
      }

    case 'wrongFileExtension':
      return {
        title: t('wsext_overlay_wrong_file_extension_title'),
        message: t('wsext_overlay_wrong_file_extension_message'),
        img: cautionGarry,
        ActionsBlock: ImportingProblemFormat,
      }

    case 'errorDuringImport':
      return {
        title: t('wsext_overlay_error_during_import_title'),
        message: t('wsext_overlay_error_during_import_message'),
        img: cautionGarry,
        ActionsBlock: ImportingProblemFormat,
      }

    case 'invalidFormat':
      return {
        title: t('wsext_overlay_invalid_format_title'),
        message: t('wsext_overlay_invalid_format_message'),
        img: cautionGarry,
        ActionsBlock: ImportingProblemFormat,
      }
    case 'notificationBlockerPermission':
      return {
        title: t('wsext_overlay_notification_blocker_permission_title'),
        message: t('wsext_overlay_notification_blocker_permission_message'),
        img: teacherGarry,
        ActionsBlock: NotificationBlockerPermission,
      }
    case 'clearSiteDataPermission':
      return {
        title: t('wsext_overlay_clear_site_data_permission_title'),
        message: t('wsext_overlay_clear_site_data_permission_message'),
        img: teacherGarry,
        ActionsBlock: ClearSiteDataPermission,
      }
    case 'clearSiteDataConfirm':
      return {
        title: t('wsext_overlay_clear_site_data_confirm_title'),
        message: t('wsext_overlay_clear_site_data_confirm_message'),
        img: cautionGarry,
        ActionsBlock: ClearSiteDataConfirm,
      }

    case 'firefoxInPrivateMode':
      return {
        title: t('wsext_overlay_firefox_private_mode_title'),
        message: t('wsext_overlay_firefox_private_mode_message'),
        img: cautionGarry,
        ActionsBlock: FirefoxInPrivateMode,
      }

    case 'versionUnsupportedWarning':
      return {
        title: t('wsext_overlay_version_unsupported_title'),
        message: t('wsext_overlay_version_unsupported_message'),
        img: cautionGarry,
        ActionsBlock: VersionUnsupportedWarning,
      }
  }
}

const useT = () => {
  const { currentLanguage } = useSelector(s => s.currentLanguage)
  return (key: Parameters<typeof getLocalizedMessage>[0]) =>
    getLocalizedMessage(key, currentLanguage)
}

const Welcome: ActionsBlockComponent = ({ close }) => {
  const dispatch = useDispatch()
  const t = useT()

  return (
    <>
      <ConfirmButton
        onClick={() => {
          dispatch(removeAllOverlays())
          dispatch(setShouldShowOnboarding(true))
          dispatch(setShouldShowWelcome(false))
        }}
        data-testid="start-tutorial-button"
      >
        {t('wsext_start_tutorial')}
      </ConfirmButton>
      <CancelButton
        onClick={() => {
          close()
          dispatch(setShouldShowWelcome(false))
        }}
      >
        {t('wsext_skip')}
      </CancelButton>
    </>
  )
}

const SomethingWeird: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <CancelButton onClick={close}>{t('wsext_got_it')}</CancelButton>
    </>
  )
}

const UblockDetected: ActionsBlockComponent = ({ close }) => {
  const dispatch = useDispatch()
  const t = useT()
  const open = () => {
    dispatch(addOverlay('uninstallUblock'))
  }

  const currentView = useSelector(s => s.view.current)

  return (
    <>
      <ConfirmButton
        onClick={() => {
          if (currentView === 'Home') {
            dispatch(setShowUblockWarningAtHomePage(false))
          }

          open()
        }}
      >
        {t('wsext_overlay_ublock_use_builtin')}
      </ConfirmButton>
      <CancelButton
        onClick={() => {
          if (currentView === 'Blocker') {
            dispatch(setShowUblockWarningAtBlockerPage(false))
          } else if (currentView === 'Home') {
            dispatch(setShowUblockWarningAtHomePage(false))
          }

          close()
        }}
      >
        {t('wsext_overlay_ublock_keep_using')}
      </CancelButton>
    </>
  )
}

const UblockLinkSanitizer: ActionsBlockComponent = ({ close }) => {
  const dispatch = useDispatch()
  const t = useT()

  return (
    <>
      <ConfirmButton
        onClick={async () => {
          await toggleUblockLite()
          close()
        }}
      >
        {t('wsext_overlay_ublock_link_sanitizer_disable')}
      </ConfirmButton>
      <CancelButton
        onClick={() => {
          dispatch(setShowUblockWarningAtLinkSanitizer(false))
          close()
        }}
      >
        {t('wsext_overlay_ublock_link_sanitizer_keep_both')}
      </CancelButton>
    </>
  )
}

const UninstallUblock: ActionsBlockComponent = () => {
  const dispatch = useDispatch()
  const t = useT()

  return <CancelButton onClick={() => dispatch(removeAllOverlays())}>{t('wsext_ok')}</CancelButton>
}

const NoData: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          window.open(`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`)
        }}
      >
        {t('wsext_upgrade')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_maybe_later')}</CancelButton>
    </>
  )
}

const ProPlanExpired: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          window.open(`${ENVS.ROOT_URL}/upgrade?pcpid=upgrade_ext1`)
        }}
      >
        {t('wsext_renew_plan')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_ignore')}</CancelButton>
    </>
  )
}

const Banned: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <CancelButton
      onClick={() => {
        close()
        window.open(`${ENVS.ROOT_URL}/terms`)
      }}
    >
      {t('wsext_learn_more')}
    </CancelButton>
  )
}

const ExtensionConflict: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return <CancelButton onClick={close}>{t('wsext_got_it')}</CancelButton>
}

const LocationDown: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton onClick={() => window.open(`${ENVS.ROOT_URL}/status`)}>
        {t('wsext_check_status')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_back')}</CancelButton>
    </>
  )
}

const ImportingProblemFormat: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton onClick={close}>{t('wsext_ok')}</ConfirmButton>
    </>
  )
}

const NotificationBlockerPermission: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          chrome.permissions.request({ permissions: [CONTENT_SETTINGS] })
        }}
      >
        {t('wsext_overlay_grant_permission')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_cancel')}</CancelButton>
    </>
  )
}

const ClearSiteDataPermission: ActionsBlockComponent = ({ close }) => {
  const t = useT()
  return (
    <>
      <ConfirmButton
        onClick={() => {
          close()
          chrome.permissions.request({ permissions: [BROWSING_DATA] })
        }}
      >
        {t('wsext_overlay_grant_permission')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_cancel')}</CancelButton>
    </>
  )
}

const ClearSiteDataConfirm: ActionsBlockComponent = ({ close }) => {
  const t = useT()

  return (
    <>
      <ConfirmButton
        data-testid="confirm-clear-site-data-button"
        onClick={() => {
          close()
          void clearCurrentSiteData().catch(error => {
            void pushToDebugLog({
              message: 'Failed to clear current page data',
              tag: 'popup',
              level: 'ERROR',
              data: error instanceof Error ? error.message : String(error),
            })
          })
        }}
      >
        {t('wsext_overlay_clear_site_data_confirm_action')}
      </ConfirmButton>
      <CancelButton onClick={close}>{t('wsext_cancel')}</CancelButton>
    </>
  )
}

const FirefoxInPrivateMode: ActionsBlockComponent = ({ close }) => {
  const dispatch = useDispatch()
  const t = useT()
  return (
    <CancelButton
      onClick={() => {
        close()
        dispatch(setPrivateModeModalShown(true))
      }}
    >
      {t('wsext_got_it')}
    </CancelButton>
  )
}

const VersionUnsupportedWarning: ActionsBlockComponent = ({ close }) => {
  const dispatch = useDispatch()
  const t = useT()
  return (
    <>
      <ConfirmButton onClick={close}>{t('wsext_skip')}</ConfirmButton>
      <CancelButton
        onClick={() => {
          close()
          dispatch(setDismissedUpgradeWarning(true))
        }}
      >
        {t('wsext_dont_show_again')}
      </CancelButton>
    </>
  )
}
