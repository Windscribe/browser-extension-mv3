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
  const response = await fetch(url, params)

  clearTimeout(timeoutId)

  return response
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

  const tryFetch = async (domain?: string) => {
    if (!domain) {
      throw Error('No API domain was provided')
    }
    const response = await fetchApi(domain, path, method, body, useAssets, headers)
    const json = await response.json()
    if (domain !== workingApi) {
      dispatch(setWorkingApi(domain))
    }
    return {
      ...json,
      workingApi: domain,
    }
  }

  try {
    return await tryFetch(ENVS.API_URL ?? workingApi)
  } catch (err) {
    try {
      return await tryFetch(ENVS.BACKUP_API_URL)
    } catch (err) {
      try {
        const dohUrl = await fetchDoh()
        return await tryFetch(dohUrl)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return {
          errorMessage: 'API connectivity issues',
          errorDescription: err?.message || '',
          errorCode: err?.errorCode,
          logStatus: err?.logStatus,
        }
      }
    }
  }
}

export { sendRequest }
