import { pushToDebugLog } from 'services/debugLog'
import { LogItem } from 'utils/types'

export default (logItem: LogItem | string): void => {
  if (typeof logItem === 'string') {
    pushToDebugLog({ message: logItem })
  } else {
    pushToDebugLog(logItem)
  }
}
