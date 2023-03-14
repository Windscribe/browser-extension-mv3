/*
This is temporary file until TypeScript adds support for NetworkInformation as built-in types.
@ link https://github.com/microsoft/TypeScript/issues/27186
*/
export interface WorkerNavigatorWithConnection extends WorkerNavigator {
  readonly connection?: NetworkInformation
}

type ConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'mixed'
  | 'none'
  | 'other'
  | 'unknown'
  | 'wifi'
  | 'wimax'

type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g'
type Megabit = number
type Millisecond = number

interface NetworkInformation extends EventTarget {
  readonly type?: ConnectionType
  readonly effectiveType?: EffectiveConnectionType
  readonly downlinkMax?: Megabit
  readonly downlink?: Megabit
  readonly rtt?: Millisecond
  readonly saveData?: boolean
  onchange?: EventListener
}
