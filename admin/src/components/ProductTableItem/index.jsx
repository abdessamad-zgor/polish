import { connect, useDispatch } from 'react-redux';
import styles from './producttableitem.module';
import { getSelectedProductThunk } from '../../store/thunks/productThunks';

import ClipLoader from 'react-spinners/ClipLoader';

function ProductTableItem(props) {
	if (props.status == 'loading' || (props.status == 'idle' && JSON.stringify(props.index) == '{}')) {
		return (
			<div className={styles.root}>
				<ClipLoader size="30px" color="#000" />
			</div>
		);
	}

	if (props.error != null) {
		return <div className={styles.root}>Error</div>;
	}
	const dispatch = useDispatch();

	const getSelectedProduct = (e) => {
		dispatch(getSelectedProductThunk(e.currentTarget.id));
	};

	return (
		<div className={styles.root}>
			{Object.keys(props.index.all).map((productId) => {
				return (
					<div id={productId} onClick={getSelectedProduct} className={styles.productDiv}>
						<img src={props.index.all[productId].mainImage} alt="" />
						<h5>{props.index.all[productId].title}</h5>
					</div>
				);
			})}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		index: state.products.index.value,
		status: state.products.index.status,
		error: state.products.index.error,
	};
};

export default connect(mapStateToProps)(ProductTableItem);
