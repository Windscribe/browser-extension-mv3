import type { IconVariant, Status } from 'utils/types'

import proxyOnIcon from 'assets/img/proxyOn.png'
import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyFailureIcon from 'assets/img/proxyFailure.png'
import proxyDesktopOnIcon from 'assets/img/proxyDesktopOn.png'
import proxyOnDoubleIcon from 'assets/img/proxyOnDouble.png'
import proxyNoConnectionIcon from 'assets/img/proxyNoConnection.png'

export async function setIcon(iconVariant: IconVariant): Promise<void> {
  const iconMap: Record<IconVariant, string> = {
    proxyOn: proxyOnIcon,
    proxyOff: proxyOffIcon,
    proxyFailure: proxyFailureIcon,
    proxyDesktopOn: proxyDesktopOnIcon,
    proxyOnDouble: proxyOnDoubleIcon,
    proxyNoConnection: proxyNoConnectionIcon,
  }
  const path = iconMap[iconVariant] || proxyOffIcon
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
  status: Status
  desktopConnected: boolean
  hasProxyError: boolean
}

export function getIconVariant({
  isOnline,
  status,
  desktopConnected,
  hasProxyError,
}: GetIconVariantOptions): IconVariant {
  if (!isOnline) {
    return 'proxyNoConnection'
  }

  if (status === 'on' && hasProxyError) {
    return 'proxyFailure'
  }

  if (status === 'on' && desktopConnected) {
    return 'proxyOnDouble'
  }

  if (desktopConnected) {
    return 'proxyDesktopOn'
  }

  if (status === 'on') {
    return 'proxyOn'
  }

  return 'proxyOff'
}
