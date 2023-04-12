import { reportAppLog } from 'api/endpoints'

import { parseLogToStrings } from 'state/slices/debugLog'
import type { LogItem } from 'utils/types'

const sendDebugLog = async (
  session_auth_hash: string,
  username: string,
  debugLog: LogItem[],
): Promise<number | undefined> => {
  const response = await reportAppLog(
    session_auth_hash,
    username,
    btoa(parseLogToStrings(debugLog).toString()),
  )

  return response?.data?.success
}

export default sendDebugLog
