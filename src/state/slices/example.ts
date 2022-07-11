import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
	counter: number;
}

const defaultState: ExampleState = {
	counter: 42
};

export const create = (initialState?: ExampleState) => createSlice({
	name: 'example',
	initialState: initialState || defaultState,
	reducers: {
		increment(state) {
			state.counter += 1;
		},
		decrement(state) {
			state.counter -= 1;
		},
		set(state, action: PayloadAction<number>) {
			state.counter = action.payload;
		},
	}
});


const exampleSlice = create();
export const { increment, decrement, set } = exampleSlice.actions;
export default exampleSlice.reducer;