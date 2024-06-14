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
import { setupOffscreenDocument } from 'services/offscreenActions/offscreenController'
import { SetFilteringModeArgs } from 'services/ublockController/setFilteringMode'
import { StoreType } from 'state'
import { ADD_TO_ALLOWLIST, AllowlistPayload } from 'state/slices/allowlist'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { setLocationSorting } from 'state/slices/locationSorting'
import { saveFavouriteLocationId } from 'state/slices/migratedFavoriteLocations'
import { markNewsAsViewed } from 'state/slices/newsfeed'
import { setTheme } from 'state/slices/theme'
import {
  DB_STATE_TABLE,
  SYNC_KEY,
  THEME_REDUCER,
  ALLOW_LIST_REDUCER,
  FIRST_INSTALL_DATE_REDUCER,
  LOCATION_SORTING_REDUCER,
  NEWSFEED_IDS_ALREADY_VIEWED_REDUCER,
  FAVORITE_LOCATIONS_REDUCER,
} from 'utils/constants'
import { LocationSorting } from 'utils/types'
import {
  AllowListValidatorManifestV2,
  FavouriteLocationsValidatorManifestV2,
  FirstInstalledDateValidatorManifestV2,
  LocationSortingValidatorManifestV2,
  NewsFeedIdsAlreadyViewedValidatorManifestV2,
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

  const locationSortingData: ReducerStateV2<LocationSorting> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LOCATION_SORTING_REDUCER)

  const newsfeedIdsAlreadyViewedData: ReducerStateV2<number[]> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + NEWSFEED_IDS_ALREADY_VIEWED_REDUCER)

  const favoriteLocationsData: ReducerStateV2<unknown> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + FAVORITE_LOCATIONS_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      themeData,
      firstInstallDateData,
      allowListData,
      locationSortingData,
      newsfeedIdsAlreadyViewedData,
      favoriteLocationsData,
    }),
  })

  const parsedThemeStateV2 = ThemeValidatorManifestV2.safeParse(themeData)
  const parsedallowListStateV2 = AllowListValidatorManifestV2.safeParse(allowListData)

  const parsedFirstInstalledDateStateV2 =
    FirstInstalledDateValidatorManifestV2.safeParse(firstInstallDateData)

  const parsedLocationSortingStateV2 =
    LocationSortingValidatorManifestV2.safeParse(locationSortingData)

  const parsedNewsFeedIdsStateV2 = NewsFeedIdsAlreadyViewedValidatorManifestV2.safeParse(
    newsfeedIdsAlreadyViewedData,
  )

  const parsedFavouriteLocationsStateV2 =
    FavouriteLocationsValidatorManifestV2.safeParse(favoriteLocationsData)

  // no equivalent settings in mv3 for allowCookies in mv2
  // allowPrivacyFeatures is only mv3 exclusive, no equivalent in mv2, default to true
  if (parsedallowListStateV2.success) {
    try {
      const collection: (CombinedAllowlistItem | undefined)[] = parsedallowListStateV2.data.state
        .map(allowListData => {
          if (!allowListData.domain) return
          if (!isValidDomain(allowListData.domain)) return

          const mappedDomainSettings: AllowlistPayload & Partial<SetFilteringModeArgs> = {
            domain: allowListData.domain,
            allowAds: allowListData.allowAds ?? false,
            allowDirectConnections: allowListData.allowDirectConnect ?? false,
            includeAllSubdomains: allowListData.includeAllSubdomains ?? false,
            allowPrivacyFeatures: false,
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
      data: JSON.stringify(parsedallowListStateV2.error),
    })
  }

  if (parsedThemeStateV2.success) {
    await store.dispatch(setTheme(parsedThemeStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Theme reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedThemeStateV2.error),
    })
  }

  if (parsedFirstInstalledDateStateV2.success) {
    await store.dispatch(setFirstInstallDate(parsedFirstInstalledDateStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `First Installed Date reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedFirstInstalledDateStateV2.error),
    })
  }

  if (parsedLocationSortingStateV2.success) {
    await store.dispatch(setLocationSorting(parsedLocationSortingStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Location sorting reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedLocationSortingStateV2.error),
    })
  }

  if (parsedNewsFeedIdsStateV2.success) {
    for (const id of parsedNewsFeedIdsStateV2.data.state) {
      await store.dispatch(markNewsAsViewed(id))
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `NewsFeed Ids Already Viewed reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedNewsFeedIdsStateV2.error),
    })
  }

  if (parsedFavouriteLocationsStateV2.success) {
    // data formats incompatible b/w mv2 and mv3 so we store id's
    // when the favourites view is shown we set the favourites then using the
    // stored id's, reason to do it this way is serverlist may not be
    // available at install time. So we migrate fully at a later time.
    for (const dataCenter of parsedFavouriteLocationsStateV2.data.state) {
      if (dataCenter.dataCenterId) {
        await store.dispatch(saveFavouriteLocationId(dataCenter.dataCenterId))
      }
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Favourite Locations reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedFavouriteLocationsStateV2.error),
    })
  }
}
