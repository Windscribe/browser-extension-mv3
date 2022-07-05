import { createSlice } from '@reduxjs/toolkit';

import log from '../../utils/log';

interface TestState {
	counter: number;
}

const initialState: TestState = {
	counter: 42
};

export const recreateSlice = (updatedState: TestState) => {
	return createSlice({
		name: 'test',
		initialState: updatedState || initialState,
		reducers: {
			increment(state) {
				log('increment.counter ', state.counter);
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

export const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		increment(state) {
			log('increment.counter ', state.counter);
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

export const { increment, decrement, set } = testSlice.actions;
export default testSlice.reducer;