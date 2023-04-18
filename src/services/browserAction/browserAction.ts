import type { IconVariant } from 'utils/types'

import proxyOnIcon from 'assets/img/proxyOn.png'
import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyFailureIcon from 'assets/img/proxyFailure.png'
import proxyDesktopOnIcon from 'assets/img/proxyDesktopOn.png'
import proxyOnDoubleIcon from 'assets/img/proxyOnDouble.png'
import proxyNoConnectionIcon from 'assets/img/proxyNoConnection.png'

export async function setIcon(iconVariant: IconVariant): Promise<void> {
  let path = proxyOffIcon
  if (iconVariant === 'proxyOn') {
    path = proxyOnIcon
  }
  if (iconVariant === 'proxyOff') {
    path = proxyOffIcon
  }
  if (iconVariant === 'proxyFailure') {
    path = proxyFailureIcon
  }
  if (iconVariant === 'proxyDesktopOn') {
    path = proxyDesktopOnIcon
  }
  if (iconVariant === 'proxyOnDouble') {
    path = proxyOnDoubleIcon
  }
  if (iconVariant === 'proxyNoConnection') {
    path = proxyNoConnectionIcon
  }
  await chrome.action.setIcon({ path })
}

export async function setTitleByIconVariant(iconVariant: IconVariant): Promise<void> {
  const titleMap: Record<IconVariant, string> = {
    proxyOnDouble: 'Double Hop',
    proxyDesktopOn: 'Connected to Desktop',
    proxyOn: 'Connected to Proxy',
    proxyOff: 'Disconnected',
    proxyNoConnection: 'No Connection',
    proxyFailure: 'Proxy Failure',
  }

  const title = titleMap[iconVariant]
  await chrome.action.setTitle({ title })
}

type GetIconVariantOptions = {
  isOnline: boolean
  proxyConnected: boolean
  desktopConnected: boolean
  hasProxyError: boolean
}

export function getIconVariant({
  isOnline,
  proxyConnected,
  desktopConnected,
  hasProxyError,
}: GetIconVariantOptions): IconVariant {
  if (!isOnline) {
    return 'proxyNoConnection'
  }

  if (proxyConnected && desktopConnected) {
    return 'proxyOnDouble'
  }

  if (desktopConnected) {
    return 'proxyDesktopOn'
  }

  if (proxyConnected) {
    return 'proxyOn'
  }

  if (hasProxyError) {
    return 'proxyFailure'
  }

  return 'proxyOff'
}
