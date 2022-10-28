import type { ApiResponse, Method } from 'api/types'
import { ENVS, NODE_ENV } from 'utils/constants'

let workingApi: string | null = null

const fetchTimeout = async (url: string, method = 'GET') => {
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
  }).then(res => res.json())

  // remove quotes from the response
  return res.Answer[0].data.slice(1, -1)
}

const fetchApi = async (apiUrl: string, path: string, method: Method, useAssets: boolean) => {
  if (!workingApi) {
    workingApi = apiUrl
  }

  let url: string
  if (NODE_ENV === 'production') {
    url = useAssets ? `assets.${apiUrl}` : `api.${apiUrl}`
  } else {
    url = useAssets ? `assets-${apiUrl}` : `api-${apiUrl}`
  }

  return fetchTimeout(`https://${url}/${path}`, method)
}

const sendRequest = async <DataType>(
  path: string,
  method: Method,
  useAssets = false,
): Promise<ApiResponse<DataType>> => {
  workingApi ??= ENVS.API_URL

  return await fetchApi(workingApi, path, method, useAssets)
    .then(response => response.json())
    .catch(async () => {
      workingApi = null
      if (!ENVS.BACKUP_API_URL) {
        throw Error('API connectivity issues')
      }
      return await fetchApi(ENVS.BACKUP_API_URL, path, method, useAssets)
        .then(response => response.json())
        .catch(async () => {
          workingApi = null
          const dohUrl = await fetchDoh()
          return await fetchApi(dohUrl, path, method, useAssets)
            .then(response => response.json())
            .catch(() => ({ errorMessage: 'API connectivity issues' }))
        })
    })
}

export default sendRequest
