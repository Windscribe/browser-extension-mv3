export default async function checkIp(workingApi: string): Promise<string> {
  const noIp = '---.---.---.---'
  if (workingApi) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(
      `https://checkip.${workingApi.includes('staging') ? 'windscribe.com' : workingApi}`,
      {
        signal: controller.signal,
      },
    )
      .then(r => r.text())
      .catch(() => noIp)

    clearTimeout(timeoutId)

    return res
  }
  return noIp
}
