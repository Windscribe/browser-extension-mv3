import { ENVS, NODE_ENV } from 'utils/constants'
import { ApiResponse } from './types'
import browserApi from 'services/browserApi'
import type { AppDispatch } from 'state/store'
import { setWorkingApi } from 'state/slices/workingApi'

const fetchDoh = async () => {
  const res = await fetch(`https://1.1.1.1/dns-query?name=${ENVS.DOH_URL}&type=TXT`, {
    method: 'GET',
    headers: {
      Accept: 'application/dns-json',
    },
  })
  const json = await res.json()
  const dohUrl = json?.Answer[0]?.data

  if (!dohUrl || typeof dohUrl !== 'string') {
    throw Error("Unknown URL's format of DNS over HTTPS")
  }
  // remove quotes from the response
  return dohUrl.slice(1, -1)
}

const fetchWithTimeout = async (url: string, method = 'GET', body?: Record<string, unknown>) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)
  const params = { method, signal: controller.signal, ...(body && { body: JSON.stringify(body) }) }
  const response = await fetch(url, params)

  clearTimeout(timeoutId)

  return response
}

const fetchApi = async (
  domain: string,
  path: string,
  method: string,
  body?: Record<string, unknown>,
  useAssets = false,
) => {
  let url: string
  if (NODE_ENV === 'production') {
    url = useAssets ? `assets.${domain}` : `api.${domain}`
  } else {
    url = useAssets ? `assets-${domain}` : `api-${domain}`
  }

  return fetchWithTimeout(`https://${url}/${path}`, method, body)
}

const sendRequest = async <DataType>(
  dispatch: AppDispatch,
  method: string,
  path: string,
  body?: Record<string, unknown>,
  useAssets = false,
): Promise<ApiResponse<DataType>> => {
  const state = await browserApi.getStateFromStorage()
  const workingApi = state[1].workingApi

  const tryFetch = async (domain?: string) => {
    if (!domain) {
      throw Error('No API domain was provided')
    }
    const response = await fetchApi(domain, path, method, body, useAssets)
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
    return await tryFetch(workingApi)
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
