import { useDispatch } from 'state/hooks'
import { pushToDebugLog } from 'state/slices/debugLog'
import { LogInfo } from 'utils/types'

export default (logItem: LogInfo | string): void => {
  const dispatch = useDispatch()

  if (typeof logItem === 'string') {
    dispatch(pushToDebugLog({ message: logItem }))
  } else {
    dispatch(pushToDebugLog(logItem))
  }
}
