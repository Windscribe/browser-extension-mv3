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
  | 'ExtBlocklists'
  | 'CruiseControlDomains'
  | 'Users'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Platform = 'chrome' | 'firefox'

export type ApiCallParameters = Record<string, string | number>
export type ObjectOrStringOrNumber = ApiCallParameters | string | number

export type ApiCallFunction<T extends object, P extends ObjectOrStringOrNumber> = (
  parameters: P,
  workingApi: string,
) => Promise<ApiResponse<T>>

export interface SessionData {
  alc?: string[]
  billing_plan_id?: number
  email?: string
  email_status?: 0 | 1
  is_premium?: 0 | 1
  last_reset?: string
  loc_hash?: string
  loc_rev?: number
  our_addr?: string
  our_dc?: number
  our_ip?: 0 | 1
  our_location?: string
  premium_expiry_date?: string
  rebill?: 0 | 1
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
export interface BlocklistsData {
  blocklists: Blocklist[]
  useragents: string
}

interface Blocklist {
  default: boolean
  description: string
  label: string
  link: string
  option: string
  lists: {
    title: string
    url: string
  }[]
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
  groupsModified?: boolean
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

export type CruiseControlDomains = {
  domains: CruiseControlDomainsData
}

export interface CruiseControlDomainsData {
  [key: string]: string[]
}

export type CruiseControlItem = {
  domains: string[]
  hosts: Host[]
}
