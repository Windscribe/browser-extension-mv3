import { reportAppLog } from 'api/endpoints'
import { getStorage, setStorage } from 'services/storage'
import { AppDispatch, RootState } from 'state/store'
import { DEBUG_LOG_MAX_SIZE_BYTES } from 'utils/constants'
import { generateLogHeaders } from 'utils/generateLogHeader'
import type { LogItem } from 'utils/types'
import { Base64 } from 'js-base64'

const pushToDebugLog = async (logInfo: LogItem): Promise<void> => {
  const logItem = {
    date: new Date().toLocaleString(),
    tag: logInfo.tag || 'popup',
    level: logInfo.level || 'INFO',
    message: logInfo.message,
    data: logInfo.data,
  }

  const debugLogSizeInBytes = await chrome.storage.local.getBytesInUse('debugLog')

  let extraLogItem = null
  // prune debug log if more than 1mb
  if (debugLogSizeInBytes > DEBUG_LOG_MAX_SIZE_BYTES) {
    chrome.storage.local.set({ debugLog: [] })
    extraLogItem = {
      ...logItem,
    }

    extraLogItem.message = 'Cleared debug log - reached over 1mb in size - pushToDebugLog'
    extraLogItem.level = 'INFO'
  }

  const debugLog = await getStorage('debugLog')

  let newDebugLog = []
  if (!debugLog) {
    newDebugLog.push(logItem)
    if (extraLogItem) newDebugLog.push(extraLogItem)
  } else {
    newDebugLog = debugLog
    newDebugLog.push(logItem)

    if (extraLogItem) newDebugLog.push(extraLogItem)
  }
  setStorage({ debugLog: newDebugLog })
}

const sendDebugLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
  state: RootState,
): Promise<number | undefined> => {
  const debugLog = await getStorage('debugLog')

  const logHeaders = generateLogHeaders(state)
  const logs = logHeaders + '\n' + parseLogToStrings(debugLog).toString()
  const response = await reportAppLog(dispatch, session_auth_hash, username, Base64.encode(logs))

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

// clears logs if they become too large does not take time into consideration
const clearLogs = async (): Promise<void> => {
  const debugLogSizeInBytes = await chrome.storage.local.getBytesInUse('debugLog')

  // prune debug log if more than 1mb
  if (debugLogSizeInBytes > DEBUG_LOG_MAX_SIZE_BYTES) {
    chrome.storage.local.set({ debugLog: [] })
    await pushToDebugLog({
      message: 'Cleared debug log - reached over 1mb in size - clearLogs',
      level: 'INFO',
    })
  }
}

export { pushToDebugLog, sendDebugLog, parseLogToStrings, clearLogs }
