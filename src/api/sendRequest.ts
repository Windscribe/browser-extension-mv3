import type { ApiResponse, Method } from 'api/types'
import { ENVS, NODE_ENV } from 'utils/constants'

type FetchApiOptions = {
  path: string
  method: Method
  useAssets: boolean
}

const fetchWithTimeout = async (url: string, method = 'GET') => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)
  const res = await fetch(url, { method, signal: controller.signal })
  clearTimeout(timeoutId)
  return res
}

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
  // we remove quotes from the response
  return dohUrl.slice(1, -1)
}

const fetchApi = async (domain: string, { path, method, useAssets }: FetchApiOptions) => {
  let url: string
  if (NODE_ENV === 'production') {
    url = useAssets ? `assets.${domain}` : `api.${domain}`
  } else {
    url = useAssets ? `assets-${domain}` : `api-${domain}`
  }

  return fetchWithTimeout(`https://${url}/${path}`, method)
}

async function tryDomain(domain: string, options: FetchApiOptions) {
  if (!domain) {
    throw Error('No domain was provided')
  }
  const response = await fetchApi(domain, options)
  const json = await response.json()
  return {
    ...json,
    workingApi: domain,
  }
}

async function tryBackupApi(options: FetchApiOptions) {
  if (!ENVS.BACKUP_API_URL) {
    throw Error('No backup api URL is available.')
  }

  return tryDomain(ENVS.BACKUP_API_URL, options)
}

async function tryDohUrl(options: FetchApiOptions) {
  const dohUrl = await fetchDoh()
  return tryDomain(dohUrl, options)
}

const sendRequest = async <DataType>(
  path: string,
  method: Method,
  workingApi: string,
  useAssets = false,
): Promise<ApiResponse<DataType>> => {
  const options = { path, method, useAssets }
  try {
    return await tryDomain(workingApi, options)
  } catch (err) {
    try {
      return await tryBackupApi(options)
    } catch (err) {
      try {
        return await tryDohUrl(options)
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

export default sendRequest
