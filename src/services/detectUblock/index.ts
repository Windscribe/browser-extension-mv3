import { pushToDebugLog } from 'services/debugLog'
import { UBLOCK_LITE_EXTENSION_ID } from 'utils/constants'
import getErrorMessage from 'utils/getErrorMessage'
import { useEffect, useState } from 'react'
import { Message } from 'api/types'
import { StoreType } from 'state'

type UblockInstallStatus = 'enabled' | 'disabled' | 'not_installed'

const detectUblock = async (): Promise<UblockInstallStatus> => {
  try {
    const isEnabled = await chrome.management.get(UBLOCK_LITE_EXTENSION_ID)
    return isEnabled.enabled ? 'enabled' : 'disabled'
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      data: JSON.stringify(err),
      level: 'ERROR',
    })
    return 'not_installed'
  }
}

const toggleUblockLite = async (): Promise<void> => {
  try {
    const ublockStatus = await detectUblock()
    if (ublockStatus === 'not_installed') {
      // the extension is not installed ignore toggling
      return
    }
    const nextValue = ublockStatus === 'enabled' ? false : true
    await chrome.management.setEnabled(UBLOCK_LITE_EXTENSION_ID, nextValue)
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      data: JSON.stringify(err),
      level: 'ERROR',
    })
  }
}

// could also use sync external store but you would need to update react
const useIsUblockLiteStatus = (): UblockInstallStatus => {
  const [ublockStatus, setUblockStatus] = useState<UblockInstallStatus>('disabled')

  useEffect(() => {
    const listener = (info: chrome.management.ExtensionInfo) => {
      if (info.id === UBLOCK_LITE_EXTENSION_ID) {
        const result = info.enabled ? 'enabled' : 'disabled'
        setUblockStatus(result)
      }
    }

    async function initialDetection() {
      try {
        const result = await detectUblock()
        setUblockStatus(result)
      } catch (err) {
        const message = getErrorMessage(err)
        await pushToDebugLog({
          message,
          data: JSON.stringify(err),
          level: 'ERROR',
        })
        setUblockStatus('not_installed')
      }
    }

    initialDetection()
    chrome.management.onEnabled.addListener(listener)
    chrome.management.onDisabled.addListener(listener)

    return () => {
      chrome.management.onEnabled.removeListener(listener)
      chrome.management.onDisabled.removeListener(listener)
    }
  }, [])

  return ublockStatus
}

const enableOrDisableUblock = async (blockLists: string[], store: StoreType): Promise<void> => {
  const ublockStatus = await detectUblock()

  const authHash = store.getState().session.sessionData?.session_auth_hash
  if (!authHash) {
    await chrome.runtime.sendMessage<Message>({
      target: 'offscreen',
      type: 'applyBlockerSettings',
      data: [],
    })
    return
  }

  if (ublockStatus === 'enabled') {
    await chrome.runtime.sendMessage<Message>({
      target: 'offscreen',
      type: 'applyBlockerSettings',
      data: [],
    })
  } else {
    await chrome.runtime.sendMessage<Message>({
      target: 'offscreen',
      type: 'applyBlockerSettings',
      data: blockLists,
    })
  }
}

export { detectUblock, toggleUblockLite, useIsUblockLiteStatus, enableOrDisableUblock }
