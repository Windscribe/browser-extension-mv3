import { useDispatch } from 'state/hooks'
import { type PayloadAction } from '@reduxjs/toolkit'
import { set, back, reset, type View } from 'state/slices/view'

type RouteActionReturn = () => PayloadAction<View | undefined>

export function useGoTo(route: View): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(set(route))
}

export function useGoBack(): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(back())
}

export function useResetView(): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(reset())
}
