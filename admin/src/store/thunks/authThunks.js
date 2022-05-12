import { createAsyncThunk } from '@reduxjs/toolkit';
import app from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const loginAdminThunk = createAsyncThunk('admin/login', async (data) => {
	try {
		let auth = getAuth(app);
		let response = await signInWithEmailAndPassword(auth, data.email, data.password);
		let idToken = await response.user.getIdToken(true);

		return { info: { username: response.user.displayName, email: response.user.email }, idToken };
	} catch (e) {
		throw e;
	}
});

export { loginAdminThunk };
