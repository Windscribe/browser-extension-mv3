import { useCallback } from 'react'
import {
  type TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch,
} from 'react-redux'
import { type RootState, type AppDispatch } from './store'

type DispatchAlias = (type: string, payload?: object) => Promise<{ type: string; payload: object }>
export function useDispatchAlias(): DispatchAlias {
  const dispatch = useDispatch()
  // without useCallback usage of useDispatchAlias can lead to duplicated API requests
  return useCallback(
    async (type: string, payload = {}) => {
      return await dispatch({ type: `alias/${type}`, payload })
    },
    [dispatch],
  )
}

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector
export const useDispatch: () => AppDispatch = useGenericDispatch
