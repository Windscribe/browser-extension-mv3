import {
	type TypedUseSelectorHook,
	useSelector as useGenericSelector,
	useDispatch as useGenericDispatch
} from 'react-redux';
import { type RootState, type AppDispatch } from './store';

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;
export const useDispatch: () => AppDispatch = useGenericDispatch;