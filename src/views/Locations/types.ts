import type { DebouncedFunction } from 'utils/types'

export type HeaderType = React.FC<HeaderProps & React.HTMLAttributes<HTMLDivElement>>

export type EventHandler<Element = HTMLInputElement, Event = React.SyntheticEvent<Element>> = (
  e: Event,
) => void

export type SearchInputChangeHandler = EventHandler<
  HTMLInputElement,
  React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
>

export type DebouncedInputOnChangeHandler = DebouncedFunction<SearchInputChangeHandler>

export type SearchInputProps = {
  onSearchInputChange: SearchInputChangeHandler
  onSearchInputClose: () => void
  focusInitKey?: string | null
}

export type HeaderActionsSectionProps = SearchInputProps & {
  showSearchInput: boolean
}

export type Tab = 'locations' | 'favorites'
export type SetTab = (tab: Tab) => void

export type HeaderTabsProps = {
  currentTab: Tab
  isSearching: boolean
  setTab: SetTab
}

export type HeaderProps = HeaderTabsProps &
  HeaderActionsSectionProps &
  React.HTMLAttributes<HTMLDivElement>
