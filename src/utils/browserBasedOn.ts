// TODO: Add more browsers to the list as needed

function isFirefoxBased(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return (
    ua.includes('firefox') ||
    ua.includes('librewolf') ||
    ua.includes('waterfox') ||
    ua.includes('mullvad') ||
    ua.includes('palemoon') ||
    ua.includes('basilisk') ||
    ua.includes('icecat')
    // also works for tor browser
  )
}

function isChromiumBased(userAgent: string): boolean {
  // First check if it's Firefox-based to exclude it
  if (isFirefoxBased(userAgent)) {
    return false
  }

  const ua = userAgent.toLowerCase()
  return (
    ua.includes('chrome') ||
    ua.includes('edg') ||
    ua.includes('opr') ||
    ua.includes('yabrowser') ||
    ua.includes('vivaldi') ||
    ua.includes('arc') ||
    ua.includes('brave') ||
    ua.includes('headlesschrome')
  )
}

export { isChromiumBased, isFirefoxBased }
