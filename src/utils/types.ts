import debounce from 'lodash.debounce'
import { type ThemeUIJSX } from '@theme-ui/core'
import type * as Containers from 'views'
import flags from 'assets/flags'

export type ThemeUiElement<Props = Record<string, never>> = (props: Props) => ThemeUIJSX.Element

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunction<Func extends (...any: any) => any> = ReturnType<typeof debounce<Func>>

export type CountryCodeType = keyof typeof flags

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type View = keyof typeof Containers
