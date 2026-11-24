import { ENVS } from 'utils/constants'

const DOH_ENDPOINTS = [
  'https://1.1.1.1/dns-query',
  'https://1.0.0.1/dns-query',
  'https://8.8.8.8/resolve',
  'https://8.8.4.4/resolve',
]

const DOH_ATTEMPT_TIMEOUT_MS = 2500

export const fetchDoh = async (signal?: AbortSignal): Promise<string> => {
  let lastError: Error | undefined

  for (const endpoint of DOH_ENDPOINTS) {
    if (signal?.aborted) {
      throw Error('DoH lookup aborted')
    }
    const controller = new AbortController()
    const onParentAbort = () => controller.abort()
    signal?.addEventListener('abort', onParentAbort, { once: true })
    const timer = setTimeout(() => controller.abort(), DOH_ATTEMPT_TIMEOUT_MS)
    try {
      const res = await fetch(`${endpoint}?name=${ENVS.DOH_URL}&type=TXT`, {
        method: 'GET',
        headers: {
          Accept: 'application/dns-json',
        },
        signal: controller.signal,
      })
      if (!res.ok) {
        throw Error(`DoH HTTP ${res.status}`)
      }
      const json = (await res.json()) as {
        Answer?: Array<{ type?: number; data?: unknown }>
      }
      const answers = Array.isArray(json?.Answer) ? json.Answer : []
      for (const ans of answers) {
        if ((ans.type === undefined || ans.type === 16) && typeof ans.data === 'string') {
          const cleaned = ans.data.replace(/^"|"$/g, '').trim()
          if (cleaned) {
            return cleaned
          }
        }
      }
      throw Error("Unknown URL's format of DNS over HTTPS")
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : Error(String(err))
    } finally {
      clearTimeout(timer)
      signal?.removeEventListener('abort', onParentAbort)
    }
  }

  throw lastError ?? Error('All bare-IP DoH endpoints failed')
}
