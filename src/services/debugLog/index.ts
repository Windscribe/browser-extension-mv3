import { reportAppLog } from 'api/endpoints'
import { getStorage, setStorage } from 'services/storage'
import { AppDispatch } from 'state/store'
import { DEBUG_LOG_MAX_SIZE_BYTES, PRUNE_SIZE_BYTES } from 'utils/constants'
import getErrorMessage from 'utils/getErrorMessage'
import type { LogItem } from 'utils/types'

export const trimLogs = async (): Promise<LogItem[] | undefined> => {
  const debugLogSizeInBytes = await chrome.storage.local.getBytesInUse('debugLog')

  if (debugLogSizeInBytes < DEBUG_LOG_MAX_SIZE_BYTES) {
    return
  }

  const debugLog = (await getStorage('debugLog')) ?? []

  let totalSizeInBytes = debugLogSizeInBytes
  let removedItemCount = 0

  if (debugLogSizeInBytes > DEBUG_LOG_MAX_SIZE_BYTES) {
    while (
      totalSizeInBytes > 0 && // accidental negative check, cannot to go into infinite loop
      totalSizeInBytes > DEBUG_LOG_MAX_SIZE_BYTES - PRUNE_SIZE_BYTES &&
      debugLog.length > 0
    ) {
      /* 
        json stringify may fail because of malformed or contain circular references so we skip 
        calculating the size for that but remove it any way and count it as a removed item, otherwise 
        pruning may never happen if there is a malformed/circular referenced json object in the debug logs!
      */
      try {
        const removedLog = debugLog.shift()
        const sizeInBytes = new TextEncoder().encode(JSON.stringify(removedLog)).length
        totalSizeInBytes -= sizeInBytes
        removedItemCount += 1
      } catch (err) {
        console.error('Error during pruning:', err)
        // still count item as removed, skip taking bytes into account since json could
        // not be stringified
        removedItemCount += 1
      }
    }

    const extraLogItem: LogItem = {
      date: new Date().toLocaleString(),
      message: `Pruned debug log - reached over ${DEBUG_LOG_MAX_SIZE_BYTES} bytes in size - size was ${debugLogSizeInBytes} bytes - removed approximately ${
        debugLogSizeInBytes - totalSizeInBytes
      } bytes and ${removedItemCount} entries`,
      level: 'INFO',
      tag: 'popup',
    }

    debugLog.push(extraLogItem)
    return debugLog
  }
}

const pushToDebugLog = async (logInfo: LogItem): Promise<void> => {
  try {
    const logItem = {
      date: new Date().toLocaleString(),
      tag: logInfo.tag || 'popup',
      level: logInfo.level || 'INFO',
      message: logInfo.message,
      data: logInfo.data,
    }

    const debugLog: LogItem[] = (await getStorage('debugLog')) ?? []

    const trimmedLog = await trimLogs()

    if (trimmedLog && !(trimmedLog instanceof Error)) {
      trimmedLog.push(logItem)
      await setStorage({ debugLog: trimmedLog })
    } else {
      if (trimmedLog instanceof Error) {
        debugLog.push({
          date: new Date().toLocaleString(),
          tag: 'popup',
          message: getErrorMessage(trimmedLog),
        })
      }
      debugLog.push(logItem)
      await setStorage({ debugLog })
    }
  } catch (err) {
    console.error('Error in pushToDebugLog:', err)
  }
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

const clearLogs = async (): Promise<void> => {
  try {
    const trimmedLog = await trimLogs()
    if (trimmedLog) {
      // set the trimmed storage only
      await setStorage({ trimmedLog })
    }
  } catch (err) {
    console.error('Error in clearLog:', err)
  }
}

export { pushToDebugLog, sendDebugLog, parseLogToStrings, clearLogs }
