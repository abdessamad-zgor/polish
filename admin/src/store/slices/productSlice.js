import { createSlice } from '@reduxjs/toolkit';
import {
	getSelectedProductThunk,
	getIndexThunk,
	addProductThunk,
	replaceProductImageThunk,
	addProductImageThunk,
	updateFieldThunk,
} from '../thunks/productThunks';
import { resetStatus } from '../common';

const initialState = {
	index: { status: 'idle', error: null, value: {} },
	inView: { status: 'idle', error: null, value: {} },
	changes: {
		status: 'idle',
		error: null,
		value: [],
	},
};

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {},

	extraReducers(builder) {
		builder
			.addCase(getIndexThunk.pending, (state, action) => {
				state.index.status = 'loading';
			})
			.addCase(getIndexThunk.fulfilled, (state, action) => {
				state.index.status = 'completed';
				state.index.value = action.payload;
			})
			.addCase(getIndexThunk.rejected, (state, action) => {
				state.index.status = 'failed';
				state.index.error = action.error;
			})
			.addCase(getSelectedProductThunk.pending, (state, action) => {
				state.inView.status = 'loading';
			})
			.addCase(getSelectedProductThunk.fulfilled, (state, action) => {
				state.inView.status = 'completed';
				state.inView.value = action.payload.productInView;
			})
			.addCase(getSelectedProductThunk.rejected, (state, action) => {
				state.inView.status = 'failed';
				state.inView.error = action.error;
			})
			.addCase(updateFieldThunk.pending, (state, action) => {
				state.changes.status = 'loading';
			})
			.addCase(updateFieldThunk.fulfilled, (state, action) => {
				state.changes.status = 'completed';
				state.inView.value = action.payload;
			})
			.addCase(updateFieldThunk.rejected, (state, action) => {
				state.changes.status = 'failed';
				state.changes.error = action.error;
			})
			.addCase(replaceProductImageThunk.pending, (state) => {})
			.addCase(replaceProductImageThunk.fulfilled, (state, action) => {})
			.addCase(replaceProductImageThunk.rejected, (state, action) => {})
			.addCase(addProductImageThunk.pending, (state, action) => {})
			.addCase(addProductImageThunk.fulfilled, (state, action) => {})
			.addCase(addProductImageThunk.rejected, (state, action) => {})
			.addCase(resetStatus, (state, action) => {
				state.changes.error = null;
				state.inView.error = null;
				state.index.error = null;
				state.index.status = 'idle';
				state.inView.status = 'idle';
				state.changes.status = 'idle';
			});
	},
});
const productsReducer = productSlice.reducer;
export default productsReducer;
