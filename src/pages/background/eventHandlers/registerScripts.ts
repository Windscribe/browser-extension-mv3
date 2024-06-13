import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { workerBlockScriptId } from 'utils/constants'
import { registerScript } from 'utils/scriptController'

const registerScripts = async (store: StoreType): Promise<void> => {
  const isWorkerBlockActive = store.getState().workerBlock

  if (isWorkerBlockActive) {
    await registerScript(workerBlockScriptId, ['workerBlockContentScript.bundle.js'])
  }

  await pushToDebugLog({
    message: 'registered scripts on install/update',
    tag: 'background',
  })
}

export { registerScripts }
