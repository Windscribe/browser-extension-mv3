import {
  type TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch,
} from 'react-redux'
import { type RootState, type AppDispatch } from './store'

type DispatchAlias = (type: string, payload?: object) => Promise<{ type: string; payload: object }>
export function useDispatchAlias(): DispatchAlias {
  const dispatch = useDispatch()
  return async (type: string, payload = {}) => {
    return await dispatch({ type: `alias/${type}`, payload })
  }
}

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector
export const useDispatch: () => AppDispatch = useGenericDispatch
