import type { CountryCodeType, Either } from 'utils/types'

export type LoginParameters = {
  username: string
  password: string
  session_type_id: 1 | 2 | 3 | 4
  platform?: Platform
  '2fa_code'?: string
}

export type Credentials = {
  username: string
  password: string
  twoFa?: string
}

export interface MetaData {
  serviceRequestId?: string
  hostName?: string
  duration?: string
  logStatus?: string
  md5?: string
}

export interface Info {
  revison: string
  revision_hash: string
  changed: number
}

export interface ApiSuccessResponse<Data = unknown> {
  data: Data
  workingApi?: string
  info?: Info
  metadata?: MetaData
}

export type ApiErrorResponse = {
  errorCode: number
  errorMessage: string
  errorDescription: string
  logStatus: string | null
}

export type ApiResponse<ExpectedData = unknown> = Either<
  ApiErrorResponse,
  ApiSuccessResponse<ExpectedData>
>

export type Endpoint =
  | 'Session'
  | 'BestLocation'
  | 'Notifications'
  | 'ServerCredentials'
  | 'serverlist'
  | 'WebSession'
  | 'Report/applog'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Platform = 'chrome' | 'firefox'

export type ApiCallParameters = Record<string, string | number>
export type ObjectOrStringOrNumber = ApiCallParameters | string | number

// type EventHandler = (...a: any[]) => void
// TODO Consider to set P to any or (...a: any[])
export type ApiCallFunction<T extends object, P extends ObjectOrStringOrNumber> = (
  parameters: P,
  workingApi: string,
) => Promise<ApiResponse<T>>

// todo review the interface
export interface SessionData {
  billing_plan_id?: number
  email?: string
  email_status?: number
  is_premium?: 0 | 1
  last_reset?: string
  loc_hash?: string
  loc_rev?: number
  premium_expiry_date?: string
  reg_date?: number
  session_auth_hash?: string
  status?: number
  traffic_max?: number
  traffic_used?: number
  user_id?: string
  username?: string
}

export interface WebSessionData {
  temp_session: string
}

export interface ReportAppLogData {
  success: number
}

export type GetBestLocationParameters = {
  session_auth_hash: string
  platform: Platform
  // gps_lat?: string // Not sure it's actual
  // gps_long?: string // Not sure it's actual
}

export type GetServerCredentialsParameters = {
  session_auth_hash: string
  platform: Platform
  type?: CredentialType
}

type CredentialType = 'squid' | 'openvpn' | 'ikev2' | 'socks'

export interface BestLocation {
  city_name: string
  country_code: string
  dc_id: number
  hostname: string
  ip: string
  ip2: string
  ip3: string
  location_name: string
  server_id: number
  short_name: string
}
export interface Autopilot {
  location: Location
  dataCenter: DataCenter
}

export type ServerList = Location[]
export interface Location {
  country_code: CountryCodeType
  force_expand: number
  groups: DataCenter[]
  id: number
  loc_type: string
  name: string
  p2p: number
  premium_only: number
  short_name: string
  status: number
  tz: string
  tz_offset: string
}

export type DataCenter = {
  id: number
  city: string
  nick: string
  pro: 0 | 1
  gps: string
  tz: string
  wg_pubkey: string
  link_speed: string
  health: number
  hosts: Host[]
}

export type Host = {
  hostname: string
  weight: number
  health: number
}

export interface ServerCredentials {
  username: string
  password: string
}

export type ServerListParameters = {
  locHash: string
  isPro?: 0 | 1
}

export interface NotificationsData {
  id: number
  title: string
  message: string
  date: number
  perm_free: 0 | 1
  perm_pro: 0 | 1
  popup: 0 | 1
}

export type Notifications = {
  notifications: NotificationsData[]
}
