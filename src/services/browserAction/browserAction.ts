import proxyOnIcon from 'assets/img/proxyOn.png'
// import desktopOn from 'assets/img/desktop_on.png'
import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyFailureIcon from 'assets/img/proxyFailure.png'
// import proxyOnDouble from 'assets/img/proxy_on_double.png'
// import noConnectionIcon from 'assets/img/no_connection.png'

type IconVariant = 'proxyOn' | 'proxyOff' | 'proxyFailure'
export function setIcon(iconVariant: IconVariant): void {
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
  chrome.action.setIcon({ path })
}
