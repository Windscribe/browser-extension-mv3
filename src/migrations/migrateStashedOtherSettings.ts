import { CombinedAllowlistItem, LogItemResponse, Message } from 'api/types'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { initialState as intialNewsFeedState } from 'state/slices/newsfeed'
import { initialState as intialMigratedFavouriteLocationsState } from 'state/slices/migratedFavoriteLocations'
import {
  initialState as intialAllowlistState,
  AllowlistPayload,
  AllowlistState,
} from 'state/slices/allowlist'

import { setAndMergeStashes } from 'state/slices/userStashes'
import {
  StashedAllowListValidatorManifestV2,
  StashedCurrentLocationValidatorManifestV2,
  StashedFavouriteLocationsValidatorManifestV2,
  StashedNewsFeedIdsAlreadyViewedValidatorManifestV2,
  StashedThemeValidatorManifestV2,
} from 'utils/validators'
import isValidDomain from 'is-valid-domain'
import { SetFilteringModeArgs } from 'services/ublockController/setFilteringMode'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import { MIGRATION_ID_V2_TO_V3 } from 'utils/constants'
import { serializeError } from 'serialize-error'

export const migrateStashedOtherSettings = async (
  store: StoreType,
  data: unknown,
  userIdentifier: MigratedUserIdentifierArg,
): Promise<void> => {
  const parsedThemeStateV2 = StashedThemeValidatorManifestV2.safeParse(data)

  const parsedallowListStateV2 = StashedAllowListValidatorManifestV2.safeParse(data)

  const parsedNewsFeedIdsStateV2 =
    StashedNewsFeedIdsAlreadyViewedValidatorManifestV2.safeParse(data)

  const parsedFavouriteLocationsStateV2 =
    StashedFavouriteLocationsValidatorManifestV2.safeParse(data)

  const parsedCurrentLocationStateV2 = StashedCurrentLocationValidatorManifestV2.safeParse(data)

  // no equivalent settings in mv3 for allowCookies in mv2
  // allowPrivacyFeatures is only mv3 exclusive, no equivalent in mv2, default to false
  if (parsedallowListStateV2.success) {
    try {
      const collection: (CombinedAllowlistItem | undefined)[] = parsedallowListStateV2.data.state[
        userIdentifier.idOrHash
      ].allowlist
        .map(allowListData => {
          if (!allowListData.domain) return
          if (!isValidDomain(allowListData.domain)) return
          const mappedDomainSettings: AllowlistPayload & Partial<SetFilteringModeArgs> = {
            domain: allowListData.domain,
            allowAds: allowListData.allowAds ?? false,
            allowDirectConnections: allowListData.allowDirectConnect ?? false,
            includeAllSubdomains: allowListData.includeAllSubdomains ?? false,
            allowPrivacyFeatures: false,
            addedBy: allowListData.addedBy,
          }
          if (allowListData.allowAds === true) {
            const level = allowListData.allowAds ? 0 : 3
            mappedDomainSettings.hostname = allowListData.domain
            mappedDomainSettings.level = level
          }
          return mappedDomainSettings
        })
        .filter(item => !!item)

      const domainSettings = collection
        .map(item => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { hostname, level, ...domainSettings } = item ?? {}
          return domainSettings
        })
        // filter out empty object
        .filter(domainSetting => Object.keys(domainSetting).length > 0)

      let allowlist: AllowlistState = {
        ...intialAllowlistState,
      }

      allowlist = domainSettings.reduce((prev, curr) => {
        const domainSetting = curr as AllowlistPayload
        return {
          ...prev,
          [domainSetting.domain]: domainSetting,
        }
      }, allowlist) as AllowlistState

      await store.dispatch(
        setAndMergeStashes({
          hashedID: userIdentifier.idOrHash,
          data: {
            allowlist,
          },
        }),
      )

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

      store.dispatch(
        addUserStateMigration({
          migrationId: MIGRATION_ID_V2_TO_V3,
          ...userIdentifier,
          migratedStates: ['allowlist'],
        }),
      )
    } catch (err) {
      pushToDebugLog({
        message: 'Failed while trying to add domain to allowlist',
        level: 'ERROR',
        data: serializeError(err),
      })
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Allowlist stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedallowListStateV2.error),
    })
  }

  if (parsedThemeStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          theme: {
            value: parsedThemeStateV2.data.state[userIdentifier.idOrHash].theme,
          },
        },
      }),
    )

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['theme'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Theme stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedThemeStateV2.error),
    })
  }

  if (parsedNewsFeedIdsStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          newsfeed: {
            ...intialNewsFeedState,
            viewedNewsIds:
              parsedNewsFeedIdsStateV2.data.state[userIdentifier.idOrHash].newsfeedIdsAlreadyViewed,
          },
        },
      }),
    )

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['newsfeedViewed'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `NewsFeed Ids Already Viewed stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedNewsFeedIdsStateV2.error),
    })
  }

  if (parsedFavouriteLocationsStateV2.success) {
    const favouriteLocationIds = parsedFavouriteLocationsStateV2.data.state[
      userIdentifier.idOrHash
    ].favoriteLocations
      .filter(item => item.dataCenterId !== undefined && item.dataCenterId !== null)
      .map(item => item.dataCenterId)

    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          migratedFavouriteLocations: {
            ...intialMigratedFavouriteLocationsState,
            favouriteLocationIds,
          },
        },
      }),
    )

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['favouriteLocations'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Favourite Locations stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedFavouriteLocationsStateV2.error),
    })
  }

  if (parsedCurrentLocationStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          currentLocationMV2:
            parsedCurrentLocationStateV2.data.state[userIdentifier.idOrHash].currentLocation,
        },
      }),
    )

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['currentLocation'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Current Location stashed state not found',
      tag: 'background',
      data: JSON.stringify(parsedCurrentLocationStateV2.error),
    })
  }
}
