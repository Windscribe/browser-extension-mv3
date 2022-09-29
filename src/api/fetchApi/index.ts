import type { ApiResponse, Method } from 'api/types'
import { setWorkingApi } from 'state/slices/session'
import store from 'state/store'
import { ENVS } from 'utils/constants'

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
  const workingApi = store.getState().session.workingApi

  if (!workingApi) {
    store.dispatch(setWorkingApi(apiUrl))
  }

  const url = useAssets ? `assets.${apiUrl}` : `api.${apiUrl}`

  return fetchTimeout(`https://${url}/${path}`, method)
}

const sendRequest = async <DataType>(
  path: string,
  method: Method,
  useAssets = false,
): Promise<ApiResponse<DataType>> => {
  const workingApi = store.getState().session.workingApi

  return await fetchApi(workingApi || ENVS.API_URL, path, method, useAssets)
    .then(response => response.json())
    .catch(async () => {
      store.dispatch(setWorkingApi(undefined))

      return await fetchApi(ENVS.BACKUP_API_URL, path, method, useAssets)
        .then(response => response.json())
        .catch(async () => {
          store.dispatch(setWorkingApi(undefined))

          const dohUrl = await fetchDoh()
          return await fetchApi(dohUrl, path, method, useAssets)
            .then(response => response.json())
            .catch(() => ({ errorMessage: 'API connectivity issues' }))
        })
    })
}

export default sendRequest
