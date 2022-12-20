import { useDispatch } from 'state/hooks'
import { pushToDebugLog } from 'state/slices/debugLog'
import { LogItem } from 'utils/types'

export default (logItem: LogItem | string): void => {
  const dispatch = useDispatch()

  if (typeof logItem === 'string') {
    dispatch(pushToDebugLog({ message: logItem }))
  } else {
    dispatch(pushToDebugLog(logItem))
  }
}
