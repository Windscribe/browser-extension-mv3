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
} from 'api/types'
import { sendRequest } from 'api/sendRequest'
import { buildQueryString, generateTime, getClientAuthHash } from 'api/utils'
import type { AppDispatch } from 'state/store'
import { MigrationStatusReport } from 'state/slices/migration'

const login = async (
  dispatch: AppDispatch,
  username: string,
  password: string,
  secure_token?: string,
  secure_token_signature?: string,
  twoFa?: string,
  captchaSolution?: number,
  captchaTrail?: number[],
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(dispatch, 'POST', buildQueryString('Session'), {
    username,
    password,
    session_type_id: 2,
    ...(secure_token && { secure_token: secure_token }),
    ...(secure_token_signature && { secure_token_sig: secure_token_signature }),
    ...(captchaSolution && { captcha_solution: captchaSolution }),
    ...(captchaTrail && { captcha_trail: captchaTrail }),
    ...(twoFa && { '2fa_code': twoFa }),
  })

const getLoginAuthToken = async (dispatch: AppDispatch): Promise<ApiResponse<AuthTokenData>> =>
  await sendRequest(dispatch, 'POST', buildQueryString('AuthToken/login'), undefined)

const logout = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(dispatch, 'Delete', buildQueryString('Session', { session_auth_hash }), {
    session_type_id: 2,
  })

const getBestLocation = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<BestLocation>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildQueryString('BestLocation', { session_auth_hash }),
    undefined,
  )

const getNotifications = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<Notifications>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildQueryString('Notifications', { session_auth_hash }),
    undefined,
  )

const getServerCredentials = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<ServerCredentials>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildQueryString('ServerCredentials', { session_auth_hash }),
    undefined,
  )

const getSessionStatus = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(dispatch, 'GET', buildQueryString('Session', { session_auth_hash }), undefined)

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
  await sendRequest(dispatch, 'POST', buildQueryString('WebSession'), {
    session_auth_hash,
    temp_session: 1,
    session_type_id: 1,
  })

const sendEmailConfirmation = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<WebSessionData>> =>
  await sendRequest(dispatch, 'PUT', buildQueryString('Users'), {
    session_auth_hash,
    resend_confirmation: 1,
  })

const reportAppLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
  logfile: string,
  migrationStatus: MigrationStatusReport,
): Promise<ApiResponse<ReportAppLogData>> => {
  const time = generateTime()
  const clientAuthHash = getClientAuthHash(time)
  const formData = new FormData()
  formData.append('logfile', logfile)
  formData.append('username', username)
  formData.append('session_auth_hash', session_auth_hash)
  formData.append('time', time)
  formData.append('client_auth_hash', clientAuthHash)
  formData.append('migration', migrationStatus)

  return await sendRequest(
    dispatch,
    'POST',
    buildQueryString('Report/applog', undefined, true),
    formData,
  )
}

const getBlocklists = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
): Promise<ApiResponse<BlocklistsData>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildQueryString('ExtBlocklists', { session_auth_hash, version: 3 }),
  )

const getCruiseControlDomains = async (
  dispatch: AppDispatch,
  session_auth_hash: string | undefined,
): Promise<ApiResponse<CruiseControlDomains>> =>
  await sendRequest(
    dispatch,
    'GET',
    buildQueryString('CruiseControlDomains', { session_auth_hash }),
  )

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
