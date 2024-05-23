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

const clearLogsOlderThanWeek = async (): Promise<void> => {
  const debugLog = await getStorage('debugLog')
  if (!debugLog) return
  if (!Array.isArray(debugLog)) return

  const weekInMilliseconds = 604_800_000
  const currentTime = Date.now()
  const cutoffTime = currentTime - weekInMilliseconds

  // Filter logs to keep only those within the last week
  const newDebugLog = debugLog.filter((logItem: LogItem) => {
    // no date means remove from logs
    if (!logItem.date) {
      console.warn('Log item missing date:', logItem)
      return false
    }

    const logTime = new Date(logItem.date).getTime()

    if (isNaN(logTime)) {
      console.warn('Invalid date format in log item:', logItem)
      return false
    }

    return logTime >= cutoffTime
  })

  await setStorage({ debugLog: newDebugLog })
}

export { pushToDebugLog, sendDebugLog, parseLogToStrings, clearLogsOlderThanWeek }
