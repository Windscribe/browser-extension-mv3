import { pushToDebugLog } from 'services/debugLog'
import { UBLOCK_LITE_EXTENSION_IDS } from 'utils/constants'
import getErrorMessage from 'utils/getErrorMessage'
import { useEffect, useState } from 'react'
import { Message } from 'api/types'
import { StoreType } from 'state'
import { serializeError } from 'serialize-error'

type UblockInstallStatus = {
  status: 'enabled' | 'disabled' | 'not_installed'
  extensionId?: string
}

function isFulfilled<T>(r: PromiseSettledResult<T>): r is PromiseFulfilledResult<T> {
  return r.status === 'fulfilled'
}

// id collisions are highly unlikely
const detectUblock = async (): Promise<UblockInstallStatus> => {
  try {
    const currentUblocksIfAnyEnabled = UBLOCK_LITE_EXTENSION_IDS.map(async id => {
      const extension = await chrome.management.get(id)
      return {
        enabled: extension.enabled,
        id: extension.id,
      }
    })

    const result = await Promise.allSettled(currentUblocksIfAnyEnabled)

    const enabledUblocks = result.filter(extension => extension.status === 'fulfilled')

    if (enabledUblocks.length === 0) {
      return {
        status: 'not_installed',
      }
    }

    const enabledUblock = result.find(isFulfilled)

    if (!enabledUblock) {
      return {
        status: 'not_installed',
      }
    }

    const { enabled, id } = enabledUblock.value

    return {
      status: enabled ? 'enabled' : 'disabled',
      extensionId: id,
    }
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      data: serializeError(err),
      level: 'ERROR',
    })
    return {
      status: 'not_installed',
    }
  }
}

const toggleUblockLite = async (): Promise<void> => {
  try {
    const currentUblock = await detectUblock()
    if (currentUblock.status === 'not_installed') {
      // the extension is not installed ignore toggling
      return
    }

    const nextValue = currentUblock.status === 'enabled' ? false : true

    if (currentUblock.extensionId) {
      await chrome.management.setEnabled(currentUblock.extensionId, nextValue)
    } else {
      await pushToDebugLog({
        message: 'No extension id found for ublock lite',
        level: 'WARN',
      })
    }
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      data: serializeError(err),
      level: 'ERROR',
    })
  }
}

// could also use sync external store but you would need to update react
const useIsUblockLiteStatus = (): UblockInstallStatus => {
  const [ublockStatus, setUblockStatus] = useState<UblockInstallStatus>({
    status: 'disabled',
    extensionId: undefined,
  })

  useEffect(() => {
    const listener = (info: chrome.management.ExtensionInfo) => {
      if (UBLOCK_LITE_EXTENSION_IDS.find(id => id === info.id)) {
        setUblockStatus({
          status: info.enabled ? 'enabled' : 'disabled',
          extensionId: info.id,
        })
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
          data: serializeError(err),
          level: 'ERROR',
        })
        setUblockStatus({ status: 'not_installed' })
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
  const currentUblock = await detectUblock()

  const authHash = store.getState().session.sessionData?.session_auth_hash
  if (!authHash) {
    await chrome.runtime.sendMessage<Message>({
      target: 'offscreen',
      type: 'applyBlockerSettings',
      data: [],
    })
    return
  }

  if (currentUblock.status === 'enabled') {
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
