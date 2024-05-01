import { ReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { migrateTheme } from 'services/migrateTheme/migrateTheme'
import { StoreType } from 'state'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import {
  DB_STATE_TABLE,
  SYNC_KEY,
  THEME_REDUCER,
  ALLOW_LIST_REDUCER,
  FIRST_INSTALL_DATE_REDUCER,
} from 'utils/constants'
import { FirstInstalledDateValidatorManifestV2, ThemeValidatorManifestV2 } from 'utils/validators'

export const migrateOtherSettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const themeData: ReducerStateV2<'light' | 'dark'> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + THEME_REDUCER)

  // const allowListData: BooleanSettingReducerStateV2 = await db
  //   .table(DB_STATE_TABLE)
  //   .get(SYNC_KEY + ALLOW_LIST_REDUCER)

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
      // allowListData,
    }),
  })

  const parsedThemeStateV2 = ThemeValidatorManifestV2.safeParse(themeData)
  // const parsedNotificationBlockerStateV2 =
  // SystemNotificationsValidatorManifestV2.safeParse(notificationBlockerData)
  const firstInstalledDateStateV2 =
    FirstInstalledDateValidatorManifestV2.safeParse(firstInstallDateData)

  // uses offscreen document
  if (parsedThemeStateV2.success) {
    // create offscreen document
    await pushToDebugLog({
      level: 'INFO',
      message: `called migrateTheme`,
      tag: 'background',
    })
    await migrateTheme()
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Theme reducer not found`,
      tag: 'background',
    })
  }

  if (firstInstalledDateStateV2.success) {
    await store.dispatch(setFirstInstallDate(firstInstalledDateStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `First Installed Date reducer not found`,
      tag: 'background',
    })
  }
}
