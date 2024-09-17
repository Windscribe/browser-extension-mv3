import { pushToDebugLog } from 'services/debugLog'
import { useDispatchAlias } from 'state/hooks'
import {
  ADD_TO_ALLOWLIST,
  REMOVE_FROM_ALLOWLIST,
  type AllowlistPayload,
} from 'state/slices/allowlist'
import { setUblockFilteringMode } from 'services/ublockController/setFilteringMode'

type RemoveFromAllowlistType = (options: { hostname: string; level: number }[]) => Promise<void>

export type AddToAllowlistType = (
  options: {
    hostname: string
    level: number
    domainWithSettings: AllowlistPayload
  }[],
) => Promise<void>

export default (): {
  removeFromAllowlist: RemoveFromAllowlistType
  addToAllowlist: AddToAllowlistType
} => {
  const dispatchAlias = useDispatchAlias()

  const addToAllowlist: AddToAllowlistType = async options => {
    try {
      const domainWithSettings = []
      for (const option of options) {
        const { hostname, level } = option
        if (option.domainWithSettings.allowAds === true) {
          await setUblockFilteringMode({ hostname: hostname, level: level })
        } else {
          await setUblockFilteringMode({ hostname: hostname, level: 3 })
        }
        domainWithSettings.push(option.domainWithSettings)
      }

      await dispatchAlias(ADD_TO_ALLOWLIST, domainWithSettings)
    } catch (err) {
      pushToDebugLog({
        message: 'Failed while trying to add domain to allowlist',
        level: 'ERROR',
        data: err as Error,
      })
    }
  }

  const removeFromAllowlist: RemoveFromAllowlistType = async options => {
    try {
      const domains = []
      for (const option of options) {
        const { hostname, level } = option
        await setUblockFilteringMode({ hostname, level })
        domains.push(hostname)
      }
      await dispatchAlias(REMOVE_FROM_ALLOWLIST, domains)
    } catch (err) {
      pushToDebugLog({
        message: 'Failed while trying to remove domain from allowlist',
        level: 'ERROR',
        data: err as Error,
      })
    }
  }

  return { addToAllowlist, removeFromAllowlist }
}
