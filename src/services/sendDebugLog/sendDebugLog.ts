import { reportAppLog } from 'api/endpoints'

import { parseLogToStrings } from 'state/slices/debugLog'
import { AppDispatch } from 'state/store'
import type { LogItem } from 'utils/types'

const sendDebugLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
  debugLog: LogItem[],
): Promise<number | undefined> => {
  const response = await reportAppLog(
    dispatch,
    session_auth_hash,
    username,
    btoa(parseLogToStrings(debugLog).toString()),
  )

  return response?.data?.success
}

export default sendDebugLog
