import zod from 'zod'
import {
  SYNC_KEY,
  LOCATION_LOAD_REDUCER,
  NOTIFICATION_BLOCKER_REDUCER,
  DEBUG_CONTEXT_REDUCER,
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

export const LocationLoadValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + LOCATION_LOAD_REDUCER),
  state: zod.boolean(),
})

export const NotificationBlockerValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + NOTIFICATION_BLOCKER_REDUCER),
  state: zod.boolean(),
})

export const DebugViewValidatorManifestV2 = zod.object({
  reducer: zod.literal(SYNC_KEY + DEBUG_CONTEXT_REDUCER),
  state: zod.boolean(),
})
