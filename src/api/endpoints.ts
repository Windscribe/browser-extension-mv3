import type {
  BestLocation,
  SessionData,
  ApiResponse,
  ServerCredentials,
  ServerList,
  WebSessionData,
  ReportAppLogData,
} from 'api/types'
import { sendRequest } from 'api/sendRequest'
import { buildQueryString } from 'api/utils'

const login = async (
  username: string,
  password: string,
  workingApi: string,
  twoFa?: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest('POST', buildQueryString('Session'), workingApi, {
    username,
    password,
    session_type_id: 2,
    ...(twoFa && { '2fa_code': twoFa }),
  })

const getBestLocation = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<BestLocation>> =>
  await sendRequest(
    'GET',
    buildQueryString('BestLocation', { session_auth_hash }),
    workingApi,
    undefined,
  )

const getServerCredentials = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<ServerCredentials>> =>
  await sendRequest(
    'GET',
    buildQueryString('ServerCredentials', { session_auth_hash }),
    workingApi,
    undefined,
  )

const getSessionStatus = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<SessionData>> =>
  await sendRequest(
    'GET',
    buildQueryString('Session', { session_auth_hash }),
    workingApi,
    undefined,
  )

const getServerList = async (
  locHash: string,
  isPro = 0,
  workingApi: string,
): Promise<ApiResponse<ServerList>> =>
  await sendRequest('GET', `serverlist/chrome/${isPro}/${locHash}`, workingApi, undefined, true)

const getWebSession = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<WebSessionData>> =>
  await sendRequest('POST', buildQueryString('WebSession'), workingApi, {
    session_auth_hash,
    temp_session: 1,
    session_type_id: 1,
  })

const reportAppLog = async (
  session_auth_hash: string,
  username: string,
  logfile: string,
  workingApi: string,
): Promise<ApiResponse<ReportAppLogData>> =>
  await sendRequest('POST', buildQueryString('Report/applog'), workingApi, {
    session_auth_hash,
    username,
    logfile,
  })

export {
  login,
  getBestLocation,
  getServerCredentials,
  getServerList,
  getSessionStatus,
  getWebSession,
  reportAppLog,
}
