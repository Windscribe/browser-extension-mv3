import debounce from 'lodash.debounce'
import { type ThemeUIJSX } from '@theme-ui/core'
import { type View as _View } from 'state/slices/view'
import flags from 'assets/flags'

export type ThemeUiElement<Props = Record<string, never>> = (props: Props) => ThemeUIJSX.Element

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedFunction<Func extends (...any: any) => any> = ReturnType<typeof debounce<Func>>

export type View = _View

export type CountryCodeType = keyof typeof flags
