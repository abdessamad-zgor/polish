import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import ordersReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';

export default configureStore({
	reducer: {
		orders: ordersReducer,
		products: productsReducer,
		admin: authReducer,
	},
});
