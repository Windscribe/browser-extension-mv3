import type {
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
  AsyncThunk,
  Dispatch,
} from '@reduxjs/toolkit'
import debounce from 'lodash.debounce'
import { type ThemeUIJSX } from '@theme-ui/core'

import type * as Containers from 'views'
import flags from 'assets/flags'
import type { AppDispatch, RootState, StoreType } from 'state'

export type ThemeUiElement<Props = Record<string, never>> = (props: Props) => ThemeUIJSX.Element

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunction<Func extends (...any: any) => any> = ReturnType<typeof debounce<Func>>

export type CountryCodeType = keyof typeof flags

export type Coords = { latitude: string; longitude: string }

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type LocationSorting = 'alphabet' | 'geography'

export type OverlayTemplate =
  | 'welcome'
  | 'somethingWeird'
  | 'ublockDetected'
  | 'uninstallUblock'
  | 'noData'
  | 'extensionConflict'
  | 'locationDown'
  | 'proPlanExpired'
  | 'banned'

export type ErrorState = {
  errorCode?: number
  errorMessage: string
  errorDescription?: string
  logStatus?: string | null
}

export type FailoverOption = 'Auto / Best' | 'Same Country' | 'None'

export type ProxyPort = 443 | 9443

export type View = keyof typeof Containers

type OnlyFirst<T, U> = {
  [P in keyof T]: T[P]
} & {
  [P in keyof U]?: never
}
export type Either<T, U> = OnlyFirst<T, U> | OnlyFirst<U, T>

type NotFunction =
  | string
  | number
  | boolean
  | null
  | undefined
  | bigint
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | readonly any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { apply?: never; [k: string]: any }

export type LogItem = {
  date?: string
  tag?: LogTag
  level?: LogLevel
  data?: NotFunction
  message: string
}

export type LogTag = 'popup' | 'background' | 'debugLog' | 'contentScript'

export type LogLevel = 'INFO' | 'ERROR' | 'WARN'

export type IconVariant =
  | 'proxyOn'
  | 'proxyOff'
  | 'proxyFailure'
  | 'proxyDesktopOn'
  | 'proxyOnDouble'
  | 'proxyNoConnection'

export type Status = 'on' | 'off' | 'connecting' | 'disconnecting'

declare global {
  interface Window {
    store: StoreType
    OriginalDateConstructor: DateConstructor
  }
}

/*
  This module augments createAsyncThunk with our root state and app dispatch
  so we don't need to pass them to every createAsyncThunk call as generic params
  @link on Module Augmentation docs
  https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
*/
declare module '@reduxjs/toolkit' {
  type AsyncThunkConfig = {
    state?: unknown
    dispatch?: AppDispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
  }

  function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = { state: RootState; dispatch: AppDispatch },
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>
}

export type SyncThunkCreator<PayloadType> = (p: PayloadType) => (d: Dispatch) => void

export type InputChangeHandler = React.EventHandler<React.ChangeEvent<HTMLInputElement>>

export type TimeWarp = {
  desiredTimezone: string
  offset: number // 240
  defaultOffset: number // -180
  dst: string
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
