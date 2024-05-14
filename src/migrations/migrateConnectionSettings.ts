import { ReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAutoConnect, setFailover, setSmokeWall } from 'state/slices/connection'
import { setProxyPort } from 'state/slices/proxyPort'
import {
  AUTO_CONNECT_REDUCER,
  DB_STATE_TABLE,
  FAIL_OVER_REDUCER,
  PROXY_PORT_REDUCER,
  SMOKE_WALL_REDUCER,
  SYNC_KEY,
} from 'utils/constants'
import { FailoverOption, ProxyPort } from 'utils/types'
import {
  AutoConnectValidatorManifestV2,
  FailOverValidatorManifestV2,
  ProxyPortValidatorManifestV2,
  SmokeWallValidatorManifestV2,
} from 'utils/validators'

export const migrateConnectionSettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const smokeWallData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + SMOKE_WALL_REDUCER)

  const autoConnectData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + AUTO_CONNECT_REDUCER)

  const proxyPortData: ReducerStateV2<ProxyPort> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + PROXY_PORT_REDUCER)

  const failOverData: ReducerStateV2<FailoverOption> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + FAIL_OVER_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      smokeWallData,
      autoConnectData,
      proxyPortData,
      failOverData,
    }),
  })

  const parsedSmokeWallStateV2 = SmokeWallValidatorManifestV2.safeParse(smokeWallData)
  const parsedAutoConnectStateV2 = AutoConnectValidatorManifestV2.safeParse(autoConnectData)
  const parsedProxyPortStateV2 = ProxyPortValidatorManifestV2.safeParse(proxyPortData)
  const parsedFailOverStateV2 = FailOverValidatorManifestV2.safeParse(failOverData)

  if (parsedSmokeWallStateV2.success) {
    await store.dispatch(setSmokeWall(parsedSmokeWallStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Smokewall reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedSmokeWallStateV2.error),
    })
  }

  if (parsedAutoConnectStateV2.success) {
    await store.dispatch(setAutoConnect(parsedAutoConnectStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Auto Connect reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedAutoConnectStateV2.error),
    })
  }

  if (parsedProxyPortStateV2.success) {
    // stored as string in mv2 app state, but typed as number in mv3
    await store.dispatch(setProxyPort(parsedProxyPortStateV2.data.state as unknown as ProxyPort))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Proxy port reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedProxyPortStateV2.error),
    })
  }

  if (parsedFailOverStateV2.success) {
    await store.dispatch(setFailover(parsedFailOverStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Failover reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedFailOverStateV2.error),
    })
  }
}
