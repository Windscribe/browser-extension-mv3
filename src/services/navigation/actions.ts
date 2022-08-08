import { useDispatch } from 'state/hooks'
import { set, back, type View } from 'state/slices/view'
import { type PayloadAction } from '@reduxjs/toolkit'

type RouteActionReturn = () => PayloadAction<View | undefined>

export function useGoTo(route: View): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(set(route))
}

export function useGoBack(): RouteActionReturn {
  const dispatch = useDispatch()
  return () => dispatch(back())
}
