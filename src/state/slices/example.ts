import { createSlice } from '@reduxjs/toolkit';
import log from '../../utils/log';

interface ExampleState {
	counter: number;
}

const initialState: ExampleState = {
	counter: 42
};

// TODO Refactor. Unite recreateSlice() & exampleSlice()
export const recreateSlice = (updatedState?: ExampleState) => {
	return createSlice({
		name: 'example',
		initialState: updatedState || initialState,
		reducers: {
			increment(state) {
				state.counter += 1;
			},
			decrement(state) {
				state.counter -= 1;
			},
			set(state, action) {
				state.counter = action.payload;
			},
		}
	});
};

export const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		increment(state) {
			log('increment');
			state.counter += 1;
		},
		decrement(state) {
			state.counter -= 1;
		},
		set(state, action) {
			state.counter = action.payload;
		},
	}
});

export const { increment, decrement, set } = exampleSlice.actions;
export default exampleSlice.reducer;