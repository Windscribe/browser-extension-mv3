import { reportAppLog } from 'api/endpoints'

const sendDebugLog = async (
  session_auth_hash: string,
  username: string,
  debugLog: string[],
  workingApi: string,
): Promise<number | undefined> => {
  const response = await reportAppLog(
    session_auth_hash,
    username,
    btoa(debugLog.toString()),
    workingApi,
  )

  return response?.data?.success
}

export default sendDebugLog
