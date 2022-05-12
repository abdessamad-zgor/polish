import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: [],
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
});

const ordersReducer = orderSlice.reducer;

export default ordersReducer;
