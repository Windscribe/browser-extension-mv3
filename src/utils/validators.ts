import zod from 'zod'
import {
  SYNC_KEY,
  LOCATION_LOAD_REDUCER,
  SYSTEM_NOTIFICATIONS_REDUCER,
  DEBUG_CONTEXT_REDUCER,
  BLOCK_LISTS_REDUCER,
  WORKER_BLOCK_REDUCER,
  SPLIT_PERSONALITY_REDUCER,
  LANGUAGE_SWITCH_REDUCER,
  LOCATION_SPOOFER_REDUCER,
  NOTIFICATION_BLOCKER_REDUCER,
  PROXY_TIME_REDUCER,
  WEB_RTC_REDUCER,
  SMOKE_WALL_REDUCER,
  AUTO_CONNECT_REDUCER,
  PROXY_PORT_REDUCER,
  FAIL_OVER_REDUCER,
  FIRST_INSTALL_DATE_REDUCER,
  THEME_REDUCER,
  ALLOW_LIST_REDUCER,
  LOCATION_SORTING_REDUCER,
  NEWSFEED_IDS_ALREADY_VIEWED_REDUCER,
  FAVORITE_LOCATIONS_REDUCER,
  USER_STASHES_REDUCER,
  CURRENT_LOCATION_REDUCER,
  PROXY_STATUS_REDUCER,
} from './constants'

const zodZeroOrOneUnion = zod.union([zod.literal(0), zod.literal(1)]) // 0 | 1 in typescript

// Note: don't use coerce we don't transform data during migration, just move it only, also allow the specified
// type as mentioned in the reducer type plus nulls
export const SessionDataValidatorManifestV2 = zod.object({
  alc: zod.array(zod.string()).optional().nullable(),
  billing_plan_id: zod.number().optional().nullable(),
  email: zod.string().optional().nullable(),
  email_status: zodZeroOrOneUnion.optional().nullable(),
  is_premium: zodZeroOrOneUnion.optional().nullable(),
  last_reset: zod.string().optional().nullable(),
  loc_hash: zod.string().optional().nullable(),
  loc_rev: zod.number().optional().nullable(),
  our_addr: zod.string().optional().nullable(),
  // our_dc property was not found any where in extension manifest v2 codebase so excluding it during validation
  // our_dc: zod.number().optional().nullable(),
  our_ip: zodZeroOrOneUnion.optional().nullable(),
  our_location: zod.string().optional().nullable(),
  premium_expiry_date: zod.string().optional().nullable(),
  rebill: zodZeroOrOneUnion.optional().nullable(),
  reg_date: zod.number().optional().nullable(),
  session_auth_hash: zod.string().optional().nullable(),
  status: zod.number().optional().nullable(),
  traffic_max: zod.number().optional().nullable(),
  traffic_used: zod.number().optional().nullable(),
  user_id: zod.string().optional().nullable(),
  username: zod.string().optional().nullable(),
  error: zod
    .object({
      data: zod
        .object({
          errorMessage: zod.string().optional().nullable(),
          errorCode: zod.number().optional().nullable(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
  loading: zod.boolean().optional().nullable(),
})

const booleanState = zod.boolean()

// General Settings

export const LocationLoadValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + LOCATION_LOAD_REDUCER),
  state: booleanState,
})

export const SystemNotificationsValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + SYSTEM_NOTIFICATIONS_REDUCER),
  state: booleanState,
})

export const DebugViewValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + DEBUG_CONTEXT_REDUCER),
  state: booleanState,
})

// Privacy Settings
export const WorkerBlockValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + WORKER_BLOCK_REDUCER),
  state: booleanState,
})

export const SplitPersonalityValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + SPLIT_PERSONALITY_REDUCER),
  state: booleanState,
})

export const LanguageWarpValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + LANGUAGE_SWITCH_REDUCER),
  state: booleanState,
})

export const ProxyTimeValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + PROXY_TIME_REDUCER),
  state: booleanState,
})

export const LocationWarpValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + LOCATION_SPOOFER_REDUCER),
  state: booleanState,
})

export const WebRtcValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + WEB_RTC_REDUCER),
  state: booleanState,
})

export const NotificationBlockerValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + NOTIFICATION_BLOCKER_REDUCER),
  state: booleanState,
})

// Blocker settings

export const BlockListsValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + BLOCK_LISTS_REDUCER),
  state: zod.array(zod.string()),
})

// Connection Settings
export const SmokeWallValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + SMOKE_WALL_REDUCER),
  state: zod.boolean(),
})

export const AutoConnectValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + AUTO_CONNECT_REDUCER),
  state: zod.boolean(),
})

export const ProxyPortValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + PROXY_PORT_REDUCER),
  state: zod.enum(['443', '9443']),
})

export const FailOverValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + FAIL_OVER_REDUCER),
  state: zod.enum(['Auto / Best', 'Same Country', 'None']),
})

// Other settings

export const ThemeValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + THEME_REDUCER),
  state: zod.enum(['light', 'dark']),
})

export const FirstInstalledDateValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + FIRST_INSTALL_DATE_REDUCER),
  state: zod.number(),
})

const AllowlistItemValidatorManifestV2 = zod.object({
  allowAds: zod.boolean().optional(),
  allowCookies: zod.boolean().optional(),
  allowDirectConnect: zod.boolean().optional(),
  domain: zod.string().optional(),
  includeAllSubdomains: zod.boolean().optional(),
  addedBy: zod.string().optional(),
})
export const AllowListValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + ALLOW_LIST_REDUCER),
  state: zod.array(
    zod.intersection(
      AllowlistItemValidatorManifestV2,
      zod.record(
        zod.string(),
        zod.union([AllowlistItemValidatorManifestV2, zod.string(), zod.boolean()]),
      ),
    ),
  ),
})

export const LocationSortingValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + LOCATION_SORTING_REDUCER),
  state: zod.enum(['alphabet', 'geography']),
})

export const NewsFeedIdsAlreadyViewedValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + NEWSFEED_IDS_ALREADY_VIEWED_REDUCER),
  state: zod.array(zod.number()),
})

const FavouriteLocationObjectValidatorManifestV2 = zod.object({
  dataCenterId: zod.number().optional(),
  gps: zod.string().optional(),
  name: zod.string().optional(),
  nickname: zod.string().optional(),
  hosts: zod.array(zod.string()).optional(),
  countryCode: zod.string().optional(),
  isCenterPro: zod.boolean().optional(),
  locationId: zod.number().optional(),
  health: zod.number().optional(),
})
export const FavouriteLocationsValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + FAVORITE_LOCATIONS_REDUCER),
  state: zod.array(FavouriteLocationObjectValidatorManifestV2),
})

const currentLocation = zod.object({
  name: zod.string().optional().nullable(),
  locationId: zod.number().optional().nullable(),
  dataCenterId: zod.number().optional().nullable(),
})

export const CurrentLocationValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + CURRENT_LOCATION_REDUCER),
  state: currentLocation,
})

export const ProxyStatusValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + PROXY_STATUS_REDUCER),
  state: zod.object({
    status: zod.string(),
  }),
})

// validate overall shape first
// then we validate the shape again but this time
// for each individual property, reason to do it this way
// is to avoid gigantic zod validators and the
// need to go over the entire object by hand to validate
// everything at once, which is manual and time taking

const reducer = zod.literal(SYNC_KEY + USER_STASHES_REDUCER)
export const UserStashesValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(zod.string(), zod.any()),
})

// validators for the stashed object

// general settings

// showDebugMenu is not stashed in mv2, cannot
// migrate it in this case, mv3 will use default settings
export const StashedLocationLoadValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      locationLoadEnabled: zod.boolean(),
    }),
  ),
})

export const StashedSystemNotificationsValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.object({
      allowSystemNotifications: zod.boolean(),
    }),
  ),
})

// Privacy settings
export const StashedWorkerBlockValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      workerBlockEnabled: zod.boolean(),
    }),
  ),
})

export const StashedSplitPersonalityValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      splitPersonalityEnabled: zod.boolean(),
    }),
  ),
})

export const StashedLanguageWarpValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      languageSwitchEnabled: zod.boolean(),
    }),
  ),
})

export const StashedProxyTimeValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      proxyTimeEnabled: zod.boolean(),
    }),
  ),
})

export const StashedLocationWarpValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      locationSpooferEnabled: zod.boolean(),
    }),
  ),
})

export const StashedWebRtcValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      webRTCEnabled: zod.boolean(),
    }),
  ),
})

export const StashedNotificationBlockerValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      notificationBlockerEnabled: zod.boolean(),
    }),
  ),
})

// Connection settings
// smokewall, failover and proxyPort are not stashed in mv2, cannot migrate

export const StashedAutoConnectValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      autoConnect: zod.boolean(),
    }),
  ),
})

// Other Settings
// Cannot migrate theme of logged out user, as that is not stored in mv3 stash, i.e one user
// can set the theme for all other users, since its taken from a single key in local storage.
// A future update, for per user theme settings, just like in mv2 would be nice.

export const StashedThemeValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      theme: zod.enum(['light', 'dark']),
    }),
  ),
})

export const StashedNewsFeedIdsAlreadyViewedValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      newsfeedIdsAlreadyViewed: zod.array(zod.number()),
    }),
  ),
})

export const StashedFavouriteLocationsValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      favoriteLocations: zod.array(FavouriteLocationObjectValidatorManifestV2),
    }),
  ),
})

export const StashedCurrentLocationValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      currentLocation,
    }),
  ),
})

export const StashedAllowListValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      allowlist: zod.array(
        zod.intersection(
          AllowlistItemValidatorManifestV2,
          zod.record(
            zod.string(),
            zod.union([AllowlistItemValidatorManifestV2, zod.string(), zod.boolean()]),
          ),
        ),
      ),
    }),
  ),
})

// Blocker settings

export const StashedBlockListsValidatorManifestV2 = zod.object({
  reducer,
  state: zod.record(
    zod.string(),
    zod.object({
      blockListsEnabled: zod.array(zod.string()),
    }),
  ),
})
