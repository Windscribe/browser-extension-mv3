export default async (): Promise<boolean> => {
  try {
    const ublockInfo = await chrome.management.get(
      // extension id for ublock
      'ddkjiahejlhfcafbddmgiahcphecmpfh',
    )
    return ublockInfo.enabled
  } catch (e) {
    return false
  }
}
