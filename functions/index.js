const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.OnAddProductAddToIndex = functions.firestore
	.document('products/{productId}')
	.onWrite(async (change, context) => {
		try {
			const newProduct = change.after.data();
			const newProductId = context.params.productId;
			const snapshot = await admin.firestore().collection('index').doc('products').get();
			const productsIndex = snapshot.data();
			let newIndexEntry = newProduct.ratings
				? {
						title: newProduct.title,
						price: newProduct.price,
						mainImage: newProduct.images[0],
						ratings: { ...newProduct.ratings },
				  }
				: {
						title: newProduct.title,
						price: newProduct.price,
						mainImage: newProduct.images[0],
				  };
			if (productsIndex.all == undefined) {
				productsIndex.all = {
					[newProductId]: newIndexEntry,
				};
			} else {
				productsIndex.all[newProductId] = newIndexEntry;
			}
			if (newProduct.attributes !== undefined) {
				if (newProduct.attributes.length > 0) {
					newProduct.attributes.forEach((atr) => {
						if (productsIndex[atr] == undefined || Object.keys(productsIndex[atr]).length == 0) {
							productsIndex[atr] = {
								[newProductId]: newIndexEntry,
							};
						} else if (Object.keys(productsIndex[atr]).length > 0) {
							productsIndex[atr] = {
								...productsIndex[atr],
								[newProductId]: newIndexEntry,
							};
						}
					});
				}
			}

			await admin
				.firestore()
				.collection('index')
				.doc('products')
				.set(CastPrototype(productsIndex), { merge: true });
		} catch (e) {
			throw e;
		}
	});

exports.ChangeUserAddressAfterOrderAndToOrdersCollection = functions.firestore
	.document('users/{userId}/orders/{orderId}')
	.onCreate(async (snapshot, context) => {
		try {
			const newOrder = snapshot.data();
			const uid = context.params.userId;
			//add new order to orders collection
			await admin.firestore().collection('orders').add(CastPrototype(newOrder));
			let { setDefaultAddress, ...pureAddress } = newOrder.address;
			//get address
			const address = await admin
				.firestore()
				.collection('users')
				.doc(uid)
				.collection('privateInfo')
				.doc('address')
				.get();
			const isChanged = !_.isEqual(pureAddress, address.data());

			if (setDefaultAddress && isChanged) {
				//change address
				await admin
					.firestore()
					.collection('users')
					.doc(uid)
					.collection('privateInfo')
					.doc('address')
					.set(CastPrototype(pureAddress), { merge: true });
			}
		} catch (e) {
			throw e;
		}
	});

exports.onDeleteRemoveProductFromIndex = functions.firestore
	.document('products/{productId}')
	.onDelete(async (snapshot, context) => {
		try {
			let index = await admin.firestore().collection('index').doc('products').get();
			let indexData = index.data();
			const DeletedId = context.params.productId;
			Object.keys(indexData).forEach((key) => {
				const { [DeletedId]: deletedId, ...newIndex } = indexData[key];
				indexData[key] = newIndex;
			});

			await admin.firestore().collection('index').doc('products').set(CastPrototype(indexData));
		} catch (e) {
			throw e;
		}
	});

exports.onAddReviewCalulateTotalRating = functions.firestore
	.document('products/{productId}/reviews/{reviewId}')
	.onCreate(async (snapshot, context) => {
		try {
			let productId = context.params.productId;
			let product = await admin.firestore().collection('products').doc(productId).get();
			let newReview = snapshot.data();
			let productNew = product.data();
			if (productNew.ratings) {
				productNew.ratings.average =
					(productNew.ratings.average * productNew.ratings.all + newReview.stars) /
					(productNew.ratings.all + 1);
				productNew.ratings.all++;
				await admin
					.firestore()
					.collection('products')
					.doc(productId)
					.set(CastPrototype(productNew), { merge: true });
			} else {
				productNew.ratings = { all: 1, average: productNew.stars };
				await admin
					.firestore()
					.collection('products')
					.doc(productId)
					.set(CastPrototype(productNew), { merge: true });
			}
		} catch (e) {
			throw e;
		}
	});

function CastPrototype(o) {
	return JSON.parse(JSON.stringify(o));
}
