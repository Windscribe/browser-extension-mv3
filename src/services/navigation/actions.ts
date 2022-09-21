import { useDispatch } from 'state/hooks'
import { type PayloadAction } from '@reduxjs/toolkit'
import { setView, back, resetView, type View } from 'state/slices/view'

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
