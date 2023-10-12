export default async (): Promise<boolean> => {
  try {
    const ublockInfo = await chrome.management.get(
      // TODO make it .env variable
      // extension id for ublock
      'ddkjiahejlhfcafbddmgiahcphecmpfh',
    )
    return ublockInfo.enabled
  } catch (e) {
    return false
  }
}
