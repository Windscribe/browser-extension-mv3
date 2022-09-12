import { type CountryCodeType } from 'utils/types'

// TODO rename Its not a general parameters but session specific
export interface Parameters {
  username?: string
  password?: string
  session_type_id?: 1 | 2 | 3 | 4
  session_auth_hash?: string
  platform?: 'chrome' | 'firefox'
  '2fa_code'?: string
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

export interface ApiResponse<Data = unknown> {
  data?: Data
  info?: Info
  metadata?: MetaData
  errorCode?: number
  errorMessage?: string
}

export type Endpoint = 'Session' | 'BestLocation' | 'Notifications' | 'ServerCredentials'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

// todo review the interface
export interface SessionData {
  billing_plan_id?: number
  email?: string
  email_status?: number
  is_premium?: 0 | 1
  last_reset?: string
  loc_hash?: string
  loc_rev?: number
  reg_date?: number
  session_auth_hash?: string
  status?: number
  traffic_max?: number
  traffic_used?: number
  user_id?: string
  username?: string
}

export type ServerNodes = {
  ip: string
  ip2: string
  ip3: string
  hostname: string
  weight: number
  group: string
}

export type ServerListDataItem = {
  id: number
  name: string
  country_code: CountryCodeType
  status: 1 | 2
  premium_only: 0 | 1
  short_name: `${CountryCodeType}${string}` // todo check
  p2p: 0 | 1
  tz_offset: string
  dns_hostname: string
  groups?: DataCenter[]
}
export type ServerListData = ServerListDataItem[]

export type County = Omit<ServerListDataItem, 'groups'> & {
  dataCentersIds: DataCenter['id'][]
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
