import {
  AllowListV2,
  CombinedAllowlistItem,
  LogItemResponse,
  Message,
  ReducerStateV2,
} from 'api/types'
import Dexie from 'dexie'
import isValidDomain from 'is-valid-domain'
import { pushToDebugLog } from 'services/debugLog'
import {
  closeOffscreenDocument,
  setupOffscreenDocument,
} from 'services/offscreenActions/offscreenController'
import { SetFilteringModeArgs } from 'services/ublockController/setFilteringMode'
import { StoreType } from 'state'
import { ADD_TO_ALLOWLIST, AllowlistPayload } from 'state/slices/allowlist'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import {
  DB_STATE_TABLE,
  SYNC_KEY,
  THEME_REDUCER,
  ALLOW_LIST_REDUCER,
  FIRST_INSTALL_DATE_REDUCER,
} from 'utils/constants'
import {
  AllowListValidatorManifestV2,
  FirstInstalledDateValidatorManifestV2,
  ThemeValidatorManifestV2,
} from 'utils/validators'

export const migrateOtherSettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const themeData: ReducerStateV2<'light' | 'dark'> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + THEME_REDUCER)

  const allowListData: ReducerStateV2<AllowListV2[]> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + ALLOW_LIST_REDUCER)

  const firstInstallDateData: ReducerStateV2<number> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + FIRST_INSTALL_DATE_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      themeData,
      firstInstallDateData,
      allowListData,
    }),
  })

  const parsedThemeStateV2 = ThemeValidatorManifestV2.safeParse(themeData)
  const parsedallowListDataStateV2 = AllowListValidatorManifestV2.safeParse(allowListData)
  const firstInstalledDateStateV2 =
    FirstInstalledDateValidatorManifestV2.safeParse(firstInstallDateData)

  // no equivalent settings in mv3 for allowCookies in mv2
  // allowPrivacyFeatures is only mv3 exclusive, no equivalent in mv2, default to true
  if (parsedallowListDataStateV2.success) {
    try {
      const collection: (CombinedAllowlistItem | undefined)[] =
        parsedallowListDataStateV2.data.state
          .map(allowListData => {
            if (!allowListData.domain) return
            if (!isValidDomain(allowListData.domain)) return

            const mappedDomainSettings: AllowlistPayload & Partial<SetFilteringModeArgs> = {
              domain: allowListData.domain,
              allowAds: allowListData.allowAds ?? false,
              allowDirectConnections: allowListData.allowDirectConnect ?? false,
              includeAllSubdomains: allowListData.includeAllSubdomains ?? false,
              allowPrivacyFeatures: true,
            }

            if (allowListData.allowAds === true) {
              const level = allowListData.allowAds ? 0 : 3
              mappedDomainSettings.hostname = allowListData.domain
              mappedDomainSettings.level = level
            }
            return mappedDomainSettings
          })
          .filter(item => !!item)

      await setupOffscreenDocument('migrateAllowlist.html', [
        chrome.offscreen.Reason.IFRAME_SCRIPTING,
      ])

      for (const item of collection) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hostname, level, ...domainSettings } = item ?? {}

        await store.dispatch({ type: `alias/${ADD_TO_ALLOWLIST}`, payload: domainSettings })
      }

      // send in bulk
      const response = await chrome.runtime.sendMessage<
        Message<typeof collection>,
        LogItemResponse
      >({
        target: 'offscreen',
        type: 'migrateAllowlist',
        data: collection,
      })

      for (const log of response.logs) {
        await pushToDebugLog(log)
      }

      await chrome.offscreen.closeDocument()
    } catch (err) {
      pushToDebugLog({
        message: 'Failed while trying to add domain to allowlist',
        level: 'ERROR',
        data: err as Error,
      })
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Allowlist reducer not found`,
      tag: 'background',
      data: parsedallowListDataStateV2.error,
    })
  }

  if (parsedThemeStateV2.success) {
    // uses offscreen document to access local storage and indexedDB because service workersdo not have access to local storage api
    await setupOffscreenDocument('migrateTheme.html', [chrome.offscreen.Reason.LOCAL_STORAGE])

    const response = await chrome.runtime.sendMessage<Message, LogItemResponse>({
      target: 'offscreen',
      type: 'migrateTheme',
    })

    for (const log of response.logs) {
      await pushToDebugLog(log)
    }

    await closeOffscreenDocument('migrateTheme.html')
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Theme reducer not found`,
      tag: 'background',
      data: parsedThemeStateV2.error,
    })
  }

  if (firstInstalledDateStateV2.success) {
    await store.dispatch(setFirstInstallDate(firstInstalledDateStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `First Installed Date reducer not found`,
      tag: 'background',
      data: firstInstalledDateStateV2.error,
    })
  }
}
