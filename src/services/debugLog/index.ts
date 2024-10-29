import { reportAppLog } from 'api/endpoints'
import { getStorage, addToLogDB, logDB } from 'services/storage'
import { MIGRATION_ID_V2_TO_V3, MAX_LOG_ENTRIES, THREE_DAYS_IN_MILLISECONDS } from 'utils/constants'

import { AppDispatch, RootState } from 'state/store'
import { generateLogHeaders } from 'utils/generateLogHeader'
import type { LogItem } from 'utils/types'
import { Base64 } from 'js-base64'
import { MigrationStatusReport } from 'state/slices/migration'
import { serializeError } from 'serialize-error'

const pushToDebugLog = async (logInfo: LogItem): Promise<void> => {
  try {
    const logItem = {
      date: new Date().toLocaleString(),
      tag: logInfo.tag || 'popup',
      level: logInfo.level || 'INFO',
      message: logInfo.message,
      data: logInfo.data,
      timestamp: Date.now(),
    }

    await addToLogDB(logItem)

    const count = await logDB.table('logs').count()

    if (count > MAX_LOG_ENTRIES) {
      const logsToDelete = await logDB
        .table('logs')
        .orderBy('id')
        .limit(Math.abs(count - MAX_LOG_ENTRIES))
        .toArray()

      if (logsToDelete.length > 0) {
        // Extract IDs to pass to bulkDelete
        const idsToDelete = logsToDelete.map(log => log.id)

        // Bulk delete by IDs
        await logDB.table('logs').bulkDelete(idsToDelete)
      }
    }
  } catch (err) {
    console.error('Error in pushToDebugLog:', err)
  }
}

const sendDebugLog = async (
  dispatch: AppDispatch,
  session_auth_hash: string,
  username: string,
  state: RootState,
): Promise<number | undefined> => {
  const debugLog = await getStorage()

  const logHeaders = generateLogHeaders(state)
  const logs = logHeaders + '\n' + parseLogToStrings(debugLog).toString()
  const migrationV2toV3 = state.migrations.migrations.find(mig => mig.id === MIGRATION_ID_V2_TO_V3)

  let status: MigrationStatusReport = 'not_run'
  if (migrationV2toV3) {
    status = migrationV2toV3.status
  }
  const response = await reportAppLog(
    dispatch,
    session_auth_hash,
    username,
    Base64.encode(logs),
    status,
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

const trimLogs = async (retentionPeriod: number): Promise<void> => {
  try {
    await logDB
      .table('logs')
      .where('timestamp')
      .below(Date.now() - retentionPeriod)
      .delete()

    await pushToDebugLog({
      level: 'INFO',
      message: `Cleared logs older than ${retentionPeriod}`,
    })
  } catch (ex) {
    await pushToDebugLog({
      level: 'ERROR',
      message: 'Failed to clear old logs',
      data: serializeError(ex),
    })
  }
}

const clearLogs = async (): Promise<void> => {
  try {
    await trimLogs(THREE_DAYS_IN_MILLISECONDS)
  } catch (err) {
    console.error('Error in clearLog:', err)
  }
}

export { pushToDebugLog, sendDebugLog, parseLogToStrings, clearLogs, trimLogs }
