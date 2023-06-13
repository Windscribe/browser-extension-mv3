import { reportAppLog } from 'api/endpoints'
import { getStorage, setStorage } from 'services/storage'
import { AppDispatch } from 'state/store'
import type { LogItem } from 'utils/types'

const pushToDebugLog = async (logInfo: LogItem): Promise<void> => {
  const logItem = {
    date: new Date().toLocaleString(),
    tag: logInfo.tag || 'popup',
    level: logInfo.level || 'INFO',
    message: logInfo.message,
    data: logInfo.data,
  }
  const debugLog = await getStorage('debugLog')

  let newDebugLog = []
  if (!debugLog) {
    newDebugLog.push(logItem)
  } else {
    newDebugLog = debugLog
    newDebugLog.push(logItem)
  }
  setStorage({ debugLog: newDebugLog })
}

const sendDebugLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
): Promise<number | undefined> => {
  const debugLog = await getStorage('debugLog')
  const response = await reportAppLog(
    dispatch,
    session_auth_hash,
    username,
    btoa(parseLogToStrings(debugLog).toString()),
  )

  return response?.data?.success
}

const parseLogToStrings = (log: LogItem[]): string[] => {
  return log.map(logItem => {
    const { date, tag, level, message, data } = logItem
    let s = `${date} [${tag}] [${level}] ${message}.\n`
    if (data) s = s.replace('\n', ` [Data]: ${JSON.stringify(data)}. \n`)
    return s
  })
}

export { pushToDebugLog, sendDebugLog, parseLogToStrings }
