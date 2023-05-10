import { type StoreType } from 'state/store'
import { fetchServerList } from 'state/slices/servers'
import { checkSessionStatus } from 'state/slices/session'
import { fetchNotifications } from 'state/slices/newsfeed'
import { fetchServerCredentials } from 'state/slices/serverCredentials'

export function alarmHandler(bgStore: Promise<StoreType>) {
  return async (alarm: chrome.alarms.Alarm): Promise<void> => {
    if (alarm.name === 'sessionPoller') {
      const store = await bgStore

      const oldSession = store.getState().session
      await store.dispatch(checkSessionStatus())
      const newSession = store.getState().session

      const sessionDoNotCompareArr = [
        'email',
        'email_status',
        'our_ip',
        'reg_date',
        'traffic_used',
        'user_id',
        'username',
        'loading',
      ] as Array<keyof typeof oldSession>

      const oldSessionCompare = Object.assign({}, oldSession)
      const newSessionCompare = Object.assign({}, newSession)

      for (const property of sessionDoNotCompareArr) {
        delete oldSessionCompare[property]
        delete newSessionCompare[property]
      }

      if (JSON.stringify(oldSessionCompare) !== JSON.stringify(newSessionCompare)) {
        await store.dispatch(fetchServerCredentials())
        store.dispatch(fetchServerList())
      }
    } else if (alarm.name === 'notificationPoller') {
      const store = await bgStore
      store.dispatch(fetchNotifications())
    }
  }
}
