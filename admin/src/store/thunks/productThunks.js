import { createAsyncThunk } from '@reduxjs/toolkit';
import app from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const addProductThunk = createAsyncThunk('product/addProduct', async (data) => {
	try {
		let storage = getStorage(app);
		let images = [];

		for (const img of data.data.images) {
			let imgRef = ref(storage, img[0].name);
			let uploadResult = await uploadBytes(imgRef, img[0]);
			let imgURL = await getDownloadURL(uploadResult.ref);

			images.push(imgURL.toString());
		}

		let response = await axios({
			url: `${
				process.env.NODE_ENV == 'production' ? process.env.PROD_API : process.env.DEV_API
			}/api/admin/products`,
			method: 'POST',
			data: { ...data.data, images },
			headers: {
				Authorization: `BASIC ${data.idToken}`,
			},
		});
		return response.data;
	} catch (e) {
		throw e;
	}
});

const getIndexThunk = createAsyncThunk('product/getIndex', async () => {
	const response = await axios.get(
		`${process.env.NODE_ENV == 'production' ? process.env.PROD_API : process.env.DEV_API}/api/products/index`
	);
	return response.data;
});

const getSelectedProductThunk = createAsyncThunk('product/getSelectedProduct', async (id) => {
	const response = await axios.get(
		`${process.env.NODE_ENV == 'production' ? process.env.PROD_API : process.env.DEV_API}/api/products/${id}`
	);

	return response.data;
});

const updateFieldThunk = createAsyncThunk('product/updateField', async (data) => {
	const response = await axios({
		method: 'PUT',
		url: `${process.env.NODE_ENV == 'production' ? process.env.PROD_API : process.env.DEV_API}/api/admin/products/${
			data.id
		}`,
		data: { ...data.data },
		headers: {
			Authorization: `BASIC ${data.idToken}`,
		},
	});

	return response.data;
});

const replaceProductImageThunk = createAsyncThunk('product/replaceProductImage', async (data) => {
	try {
		let storage = getStorage(app);

		let fileRef = ref(storage.data.image.name);
		let uploadResult = await uploadBytes(fileRef, img[0]);

		let imgURL = await getDownloadURL(uploadResult.ref);

		let response = await axios({
			method: 'PUT',
			url: `${
				process.env.NODE_ENV == 'production' ? process.env.PROD_API : process.env.DEV_API
			}/api/admin/products/${data.id}`,
			data: { ...data.data },
			headers: {
				Authorization: `BASIC ${data.idToken}`,
			},
		});
	} catch (e) {
		throw e;
	}
});

const addProductImageThunk = createAsyncThunk('product/addProductImage', async (data) => {
	try {
		let storage = getStorage(app);
		let fileRef = ref(storage.data.image.name);
		let uploadResult = await uploadBytes(fileRef, img[0]);

		let imgURL = await getDownloadURL(uploadResult.ref);
	} catch (e) {}
});

export {
	addProductThunk,
	getIndexThunk,
	getSelectedProductThunk,
	updateFieldThunk,
	replaceProductImageThunk,
	addProductImageThunk,
};
