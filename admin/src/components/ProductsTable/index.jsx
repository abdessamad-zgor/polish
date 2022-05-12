import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getIndexThunk } from '../../store/thunks/productThunks';
import styles from './productstable.module';
import { DeleteIcon, AddIcon } from '../icons';

import ProductTableItem from '../ProductTableItem';
import SelectedProduct from '../SelectedProduct';
import AddProductForm from '../AddProductForm';

function ProductsTable() {
	const [addProduct, setAddProduct] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIndexThunk());
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<span
					className={styles.icon}
					onClick={() => {
						setAddProduct(!addProduct);
					}}
				>
					<AddIcon />
				</span>
				<span className={styles.icon}>
					<DeleteIcon />
				</span>
			</div>
			<div className={styles.content}>
				<ProductTableItem />
				{!addProduct ? (
					<SelectedProduct />
				) : (
					<AddProductForm
						closeForm={() => {
							setAddProduct(!addProduct);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default ProductsTable;
