import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './views/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.scss';
import Home from './views/Home';
import Products from './views/Products';
import Orders from './views/Orders';
import Layout from './views/Layout';
import Auth from './views/Auth';
// import dotenv from 'dotenv';
// if (process.env.NODE_ENV !== 'production') {
//   dotenv.config();
// }

function Main() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="products"
							element={
								<ProtectedRoute>
									<Products />
								</ProtectedRoute>
							}
						/>
						<Route
							path="orders"
							element={
								<ProtectedRoute>
									<Orders />
								</ProtectedRoute>
							}
						/>
						<Route path="auth" element={<Auth />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default Main;
