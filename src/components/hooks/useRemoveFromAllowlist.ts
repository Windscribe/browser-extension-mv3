import { pushToDebugLog } from 'state/slices/debugLog'
import { useDispatch, useDispatchAlias } from 'state/hooks'
import { REMOVE_FROM_ALLOWLIST } from 'state/slices/allowlist'
import { setUblockFilteringMode } from 'services/ublockController/setFilteringMode'

type RemoveFromAllowlist = (options: { hostname: string; level: number }) => Promise<void>

export default (): {
  removeFromAllowlist: RemoveFromAllowlist
} => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const removeFromAllowlist: RemoveFromAllowlist = async ({ hostname, level }) => {
    try {
      await setUblockFilteringMode({ hostname, level })
      await dispatchAlias(REMOVE_FROM_ALLOWLIST, { domain: hostname })
    } catch (err) {
      dispatch(
        pushToDebugLog({
          message: 'Failed while trying to removing domain from allowlist',
          level: 'ERROR',
          data: err as Error,
        }),
      )
    }
  }

  return { removeFromAllowlist }
}
