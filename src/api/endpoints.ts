import type {
  ApiResponse,
  BestLocation,
  BlocklistsData,
  Notifications,
  ServerCredentials,
  ServerList,
  SessionData,
  WebSessionData,
  ReportAppLogData,
  CruiseControlDomains,
  AuthTokenData,
  LoginTokenCredentials,
} from 'api/types'
import { sendRequest } from 'api/sendRequest'
import { buildQueryString } from 'api/utils'
import type { AppDispatch } from 'state/store'
import { MigrationStatusReport } from 'state/slices/migration'

const getAuthorizationHeader = (sessionAuthHash: string): HeadersInit => ({
  Authorization: `Bearer ${sessionAuthHash}`,
})

const buildAuthenticatedQueryString = (
  endpoint: Parameters<typeof buildQueryString>[0],
  parameters?: Record<string, unknown>,
): string => buildQueryString(endpoint, parameters, true)

const login = async (arg: {
  dispatch: AppDispatch
  username: string
  password: string
  secure_token?: string
  secure_token_signature?: string
  twoFa?: string
  captchaSolution?: number
  captchaTrail?: number[]
}): Promise<ApiResponse<SessionData>> => {
  const {
    dispatch,
    username,
    password,
    secure_token,
    secure_token_signature,
    twoFa,
    captchaSolution,
    captchaTrail,
  } = arg
  return await sendRequest(dispatch, 'POST', buildQueryString('Session'), {
    username,
    password,
    session_type_id: 2,
    ...(secure_token && { secure_token: secure_token }),
    ...(secure_token_signature && { secure_token_sig: secure_token_signature }),
    ...(captchaSolution && { captcha_solution: captchaSolution }),
    ...(captchaTrail && { captcha_trail: captchaTrail }),
    ...(twoFa && { '2fa_code': twoFa }),
  })
}

const getLoginAuthToken = async (
  dispatch: AppDispatch,
  { username, password }: LoginTokenCredentials,
): Promise<ApiResponse<AuthTokenData>> =>
  await sendRequest(dispatch, 'POST', buildQueryString('AuthToken/login'), { username, password })

const logout = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(
    dispatch,
    'Delete',
    buildAuthenticatedQueryString('Session'),
    { session_type_id: 2 },
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getBestLocation = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<BestLocation>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('BestLocation'),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getNotifications = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<Notifications>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('Notifications'),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getServerCredentials = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<ServerCredentials>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('ServerCredentials'),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getSessionStatus = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('Session'),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getServerList = async (
  dispatch: AppDispatch,
  locHash: string,
  isPro = 0,
  alc?: string[],
): Promise<ApiResponse<ServerList>> =>
  await sendRequest(
    dispatch,
    'GET',
    `serverlist/chrome/${isPro}/${locHash}${alc ? `?alc=${alc.join(',')}` : ''}`,
    undefined,
    true,
  )

const getWebSession = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<WebSessionData>> =>
  await sendRequest(
    dispatch,
    'POST',
    buildAuthenticatedQueryString('WebSession'),
    {
      temp_session: 1,
      session_type_id: 1,
    },
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const sendEmailConfirmation = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<WebSessionData>> =>
  await sendRequest(
    dispatch,
    'PUT',
    buildAuthenticatedQueryString('Users'),
    { resend_confirmation: 1 },
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const reportAppLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
  logfile: string,
  migrationStatus: MigrationStatusReport,
): Promise<ApiResponse<ReportAppLogData>> => {
  const formData = new FormData()
  formData.append('logfile', logfile)
  formData.append('username', username)
  formData.append('migration', migrationStatus)

  return await sendRequest(
    dispatch,
    'POST',
    buildAuthenticatedQueryString('Report/applog'),
    formData,
    false,
    getAuthorizationHeader(session_auth_hash),
  )
}

const getBlocklists = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<BlocklistsData>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildAuthenticatedQueryString('ExtBlocklists', { version: 3 }),
    undefined,
    false,
    getAuthorizationHeader(session_auth_hash),
  )

const getCruiseControlDomains = async (
  dispatch: AppDispatch,
  session_auth_hash: string | undefined,
): Promise<ApiResponse<CruiseControlDomains>> => {
  const path = session_auth_hash
    ? buildAuthenticatedQueryString('CruiseControlDomains')
    : buildQueryString('CruiseControlDomains')
  const headers = session_auth_hash ? getAuthorizationHeader(session_auth_hash) : undefined

  return await sendRequest(dispatch, 'GET', path, undefined, false, headers)
}

const getUserAgents = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url)
    return await response.text()
  } catch (err) {
    throw new Error('Error while trying to fetch list of fake user agents.', {
      cause: err as Error,
    })
  }
}

const recordInstall = async (dispatch: AppDispatch): Promise<ApiResponse<SessionData>> =>
  // TODO: Add browser type to the query string for firefox
  await sendRequest(dispatch, 'POST', buildQueryString('RecordInstall/ext/chrome'), undefined)

export {
  login,
  logout,
  getBestLocation,
  getBlocklists,
  getNotifications,
  getServerCredentials,
  getServerList,
  getSessionStatus,
  getWebSession,
  getCruiseControlDomains,
  getUserAgents,
  reportAppLog,
  sendEmailConfirmation,
  recordInstall,
  getLoginAuthToken,
}
