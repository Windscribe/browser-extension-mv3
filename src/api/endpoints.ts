import type {
  BestLocation,
  SessionData,
  ApiResponse,
  ServerCredentials,
  ServerList,
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

export { login, getBestLocation, getServerCredentials, getServerList, getSessionStatus }
