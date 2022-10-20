import type { AsyncThunkPayloadCreator, AsyncThunkOptions, AsyncThunk } from '@reduxjs/toolkit'
import debounce from 'lodash.debounce'
import { type ThemeUIJSX } from '@theme-ui/core'

import type * as Containers from 'views'
import flags from 'assets/flags'
import type { AppDispatch, RootState } from 'state'

export type ThemeUiElement<Props = Record<string, never>> = (props: Props) => ThemeUIJSX.Element

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunction<Func extends (...any: any) => any> = ReturnType<typeof debounce<Func>>

export type CountryCodeType = keyof typeof flags

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type FailoverOption = 'Auto / Best' | 'Same Country' | 'None'

export type View = keyof typeof Containers

export type LogInfo = {
  tag?: string
  level?: string
  message: string
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
