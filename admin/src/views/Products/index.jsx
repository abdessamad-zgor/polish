import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetStatus } from '../../store/common';
import styles from './products.module';
import ProductsTable from '../../components/ProductsTable';

function Products() {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(resetStatus());
		};
	}, []);

	return (
		<div className={styles.root}>
			<ProductsTable />
		</div>
	);
}

export default Products;
