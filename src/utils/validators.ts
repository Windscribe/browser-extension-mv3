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
