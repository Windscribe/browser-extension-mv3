import { ENVS, NODE_ENV } from 'utils/constants'
import { ApiResponse } from './types'
import browserApi from 'services/browserApi'
import type { AppDispatch } from 'state/store'
import { setWorkingApi } from 'state/slices/workingApi'
import { fetchDoh } from './doh'

const fetchWithTimeout = async (
  url: string,
  method = 'GET',
  body?: Record<string, unknown> | FormData,
  headers?: HeadersInit,
) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)
  const params = {
    method,
    signal: controller.signal,
    ...(headers && { headers }),
    ...(body && { body: body instanceof FormData ? body : JSON.stringify(body) }),
  }
  try {
    return await fetch(url, params)
  } finally {
    clearTimeout(timeoutId)
  }
}

const fetchApi = async (
  domain: string,
  path: string,
  method: string,
  body?: Record<string, unknown> | FormData,
  useAssets = false,
  headers?: HeadersInit,
) => {
  let url: string
  if (NODE_ENV === 'production') {
    url = useAssets ? `assets.${domain}` : `api.${domain}`
  } else {
    url = useAssets ? `assets-${domain}` : `api-${domain}`
  }

  return fetchWithTimeout(`https://${url}/${path}`, method, body, headers)
}

const sendRequest = async <DataType>(
  dispatch: AppDispatch,
  method: string,
  path: string,
  body?: Record<string, unknown> | FormData,
  useAssets = false,
  headers?: HeadersInit,
): Promise<ApiResponse<DataType>> => {
  const state = await browserApi.getStateFromStorage()
  const workingApi = state[1].workingApi

  const tryFetch = async (domain?: string): Promise<ApiResponse<DataType>> => {
    if (!domain) {
      throw Error('No API domain was provided')
    }
    const response = await fetchApi(domain, path, method, body, useAssets, headers)
    if (!response.ok && response.status >= 500) {
      throw Error(`API HTTP ${response.status}`)
    }
    const json = await response.json()
    if (domain !== workingApi) {
      dispatch(setWorkingApi(domain))
    }
    return {
      ...json,
      workingApi: domain,
    }
  }

  const candidates = Array.from(
    new Set(
      [ENVS.API_URL ? ENVS.API_URL : workingApi, ENVS.API_URL, ENVS.BACKUP_API_URL].filter(
        (d): d is string => Boolean(d),
      ),
    ),
  )

  let lastErr: unknown
  for (const domain of candidates) {
    try {
      return await tryFetch(domain)
    } catch (err: unknown) {
      lastErr = err
    }
  }

  try {
    const dohUrl = await fetchDoh()
    return await tryFetch(dohUrl)
  } catch (err: unknown) {
    const finalErr = err ?? lastErr
    const errObj =
      typeof finalErr === 'object' && finalErr !== null
        ? (finalErr as { message?: string; errorCode?: number; logStatus?: number })
        : undefined
    return {
      errorMessage: 'API connectivity issues',
      errorDescription: finalErr instanceof Error ? finalErr.message : errObj?.message || '',
      errorCode: errObj?.errorCode,
      logStatus: errObj?.logStatus,
    }
  }
}

export { sendRequest }
