import { Dexie } from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { DB_NAME, DB_VERSION, DB_STATE_TABLE, SYNC_KEY, THEME_REDUCER } from 'utils/constants'
import { ThemeValidatorManifestV2 } from 'utils/validators'

const LOCAL_STORAGE_THEME_UI_KEY = 'theme-ui-color-mode'

async function runOffScreenAction() {
  try {
    const db = new Dexie(DB_NAME)

    db.version(DB_VERSION).stores({
      WS_STATE: 'reducer',
      WS_LOGS: '++id, [timestamp+activity]',
    })

    const themeData = await db.table(DB_STATE_TABLE).get(SYNC_KEY + THEME_REDUCER)

    const parsedThemeStateV2 = ThemeValidatorManifestV2.safeParse(themeData)

    if (parsedThemeStateV2.success) {
      localStorage.setItem(LOCAL_STORAGE_THEME_UI_KEY, parsedThemeStateV2.data.state)
      await pushToDebugLog({
        level: 'INFO',
        message: `Migrated theme`,
        tag: 'offscreen',
      })
    } else {
      await pushToDebugLog({
        level: 'INFO',
        message: `Theme reducer not found`,
        tag: 'background',
      })
    }
  } catch (err) {
    await pushToDebugLog({
      level: 'ERROR',
      data: JSON.stringify(err),
      message: '',
      tag: 'offscreen',
    })
  } finally {
    await chrome.runtime.sendMessage({
      type: 'closeOffscreenDocument',
      target: 'background',
    })
  }
}

runOffScreenAction()
