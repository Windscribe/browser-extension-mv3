import { type PayloadAction } from '@reduxjs/toolkit'

import { useDispatch } from 'state/hooks'
import { setView, back, resetView } from 'state/slices/view'
import { type View } from 'utils/types'

type RouteActionReturn = () => PayloadAction<View | undefined>

export function useGoTo(route: View): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(setView(route))
}

export function useGoBack(): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(back())
}

export function useResetView(): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(resetView())
}
