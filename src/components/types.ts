import { type ThemeUIJSX } from '@theme-ui/core'

export type ThemeUiElement<Props = void> = (props: Props) => ThemeUIJSX.Element
