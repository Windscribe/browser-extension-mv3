import { LogItemResponse, Message } from 'api/types'
import { fetchDoh } from 'api/doh'
import { pushToDebugLog } from 'services/debugLog'
import { ENVS } from 'utils/constants'
import getErrorMessage from 'utils/getErrorMessage'
import { serializeError } from 'serialize-error'

export const NO_IP = '---.---.---.---'

// Second check IP host. Check IP only: the API and assets backup is
// ENVS.BACKUP_API_URL and does not change here.
export const CHECKIP_BACKUP_DOMAIN = 'cdn8088.com'

const CHECKIP_TIMEOUT_MS = 3000
const IPV4 = /^(\d{1,3}\.){3}\d{1,3}$/
const IPV6 = /^[0-9a-fA-F]{0,4}(:[0-9a-fA-F]{0,4}){2,7}$/

// Tried in this order on every check. Not tied to state.workingApi.
const domains: Array<() => Promise<string>> = [
  async () => ENVS.API_URL,
  async () => CHECKIP_BACKUP_DOMAIN,
  () => withTimeout(fetchDoh),
]

export default async function checkIp(): Promise<string> {
  const result = await chrome.runtime.sendMessage<Message, LogItemResponse>({
    target: 'offscreen',
    type: 'fireNoSSLRequest',
  })

  await pushToDebugLog({
    message: 'Receieved message from offscreen document checkIpOffscreen.html, closing now',
    data: result,
  })

  for (const getDomain of domains) {
    try {
      const domain = await getDomain()
      return await withTimeout(signal => fetchIp(domain, signal))
    } catch (err) {
      pushToDebugLog({
        message: `Check IP attempt failed: ${getErrorMessage(err)}`,
        level: 'WARN',
        data: serializeError(err),
      })
    }
  }

  return NO_IP
}

async function fetchIp(domain: string, signal: AbortSignal): Promise<string> {
  const res = await fetch(`https://checkip.${domain}`, { signal })
  if (!res.ok) throw Error(`checkip.${domain} returned HTTP ${res.status}`)

  const ip = (await res.text()).trim()
  if (!IPV4.test(ip) && !IPV6.test(ip)) {
    throw Error(`checkip.${domain} did not return an IP address`)
  }

  return ip
}

async function withTimeout<T>(run: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), CHECKIP_TIMEOUT_MS)
  try {
    return await run(controller.signal)
  } finally {
    clearTimeout(timeoutId)
  }
}
