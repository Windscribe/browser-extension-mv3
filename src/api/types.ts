export interface Parameters {
  username?: string
  password?: string
  session_type_id?: number
  session_auth_hash?: string
  platform?: string
}

export interface LoginData {
  username?: string
  password?: string
  session_type_id?: number
  session_auth_hash?: string
  platform?: string
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

export interface ApiResponse {
  data?: SessionData
  info?: Info
  metadata?: MetaData
  errorCode?: number
  errorMessage?: string
}

export interface SessionData {
  billing_plan_id?: number
  email?: string
  email_status?: number
  is_premium?: number
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
