import { ENVS } from 'utils/constants'

// Looks up the Dynamic API domain (today `deepstateplatypus.com`) from the
// TXT record of `ENVS.DOH_URL` over Cloudflare DNS-over-HTTPS.
export const fetchDoh = async (signal?: AbortSignal): Promise<string> => {
  const res = await fetch(`https://1.1.1.1/dns-query?name=${ENVS.DOH_URL}&type=TXT`, {
    method: 'GET',
    headers: {
      Accept: 'application/dns-json',
    },
    ...(signal && { signal }),
  })
  const json = await res.json()
  const dohUrl = json?.Answer[0]?.data

  if (!dohUrl || typeof dohUrl !== 'string') {
    throw Error("Unknown URL's format of DNS over HTTPS")
  }
  // remove quotes from the response
  return dohUrl.slice(1, -1)
}
