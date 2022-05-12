import { createSlice } from '@reduxjs/toolkit';
import { loginAdminThunk } from '../thunks/authThunks';

const initState = {
	info: {
		status: 'idle',
		error: null,
		value: {},
		idToken: '',
		loggedIn: false,
	},
};

const authSlice = createSlice({
	name: 'admin',
	initialState: initState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(loginAdminThunk.pending, (state, action) => {
				state.info.status = 'loading';
				state.info.error = null;
			})
			.addCase(loginAdminThunk.fulfilled, (state, action) => {
				state.info.status = 'completed';
				state.info.value = action.payload.info;
				state.info.idToken = action.payload.idToken;
				state.info.loggedIn = true;
			})
			.addCase(loginAdminThunk.rejected, (state, action) => {
				state.info.status = 'failed';
				state.info.error = action.error;
			});
	},
});
const authReducer = authSlice.reducer;
export default authReducer;
