import { pushToDebugLog } from 'services/debugLog'
import { useDispatchAlias } from 'state/hooks'
import {
  ADD_TO_ALLOWLIST,
  REMOVE_FROM_ALLOWLIST,
  type AllowlistPayload,
} from 'state/slices/allowlist'
import { setUblockFilteringMode } from 'services/ublockController/setFilteringMode'

type RemoveFromAllowlist = (options: { hostname: string; level: number }) => Promise<void>

type AddToAllowlist = (options: {
  hostname: string
  level: number
  domainWithSettings: AllowlistPayload
}) => Promise<void>

export default (): {
  removeFromAllowlist: RemoveFromAllowlist
  addToAllowlist: AddToAllowlist
} => {
  const dispatchAlias = useDispatchAlias()

  const addToAllowlist: AddToAllowlist = async ({ hostname, level, domainWithSettings }) => {
    try {
      if (domainWithSettings.allowAds === true) {
        await setUblockFilteringMode({ hostname, level })
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

  const removeFromAllowlist: RemoveFromAllowlist = async ({ hostname, level }) => {
    try {
      await setUblockFilteringMode({ hostname, level })
      await dispatchAlias(REMOVE_FROM_ALLOWLIST, { domain: hostname })
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
