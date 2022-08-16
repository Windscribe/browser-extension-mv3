import { type ApiResponse, Method } from 'api/types'

const fetchApi = async (path: string, method: Method, useAssets: boolean, useBackup = false) => {
  let url: string

  // Change url's when using actually api
  if (useBackup) {
    url = useAssets ? 'assets-staging.windscribe.com' : 'api-staging.windscribe.com'
  } else {
    url = useAssets ? 'assets-staging.windscribe.com' : 'api-staging.windscribe.com'
  }

  const controller = new AbortController()
  setTimeout(() => controller.abort(), useBackup ? 5000 : 3000)

  return fetch(`https://${url}/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
  })
}

const sendRequest = async (
  path: string,
  method: Method,
  useAssets = false,
): Promise<ApiResponse> => {
  return fetchApi(path, method, useAssets)
    .then(response => response.json())
    .catch(() =>
      fetchApi(path, method, useAssets, true)
        .then(response => response.json())
        .catch(() => ({ errorMessage: 'API connectivity issues' })),
    )
}

export default sendRequest
