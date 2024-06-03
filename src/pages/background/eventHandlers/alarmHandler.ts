import { type StoreType } from 'state/store'
import { checkSessionStatus } from 'state/slices/session'
import { fetchNotifications } from 'state/slices/newsfeed'
import { clearLogsOlderThanWeek } from 'services/debugLog'

export function alarmHandler(bgStore: Promise<StoreType>) {
  return async (alarm: chrome.alarms.Alarm): Promise<void> => {
    const store = await bgStore
    if (alarm.name === 'sessionPoller') {
      await store.dispatch(checkSessionStatus())
      return
    }
    if (alarm.name === 'notificationPoller') {
      await store.dispatch(fetchNotifications())
      return
    }
    if (alarm.name === 'pruneLog') {
      await clearLogsOlderThanWeek()
      return
    }
  }
}
