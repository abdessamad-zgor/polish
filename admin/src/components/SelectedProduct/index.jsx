import { connect } from 'react-redux';
import styles from './selectedproduct.module';

import ClipLoader from 'react-spinners/ClipLoader';
import DataEntry from '../DataEntry';
import ImagesDisplay from '../ImagesDisplay';

// import DataEntry from '../DataEntry';

function SelectedProduct(props) {
	// function isPrimary(value) {
	//   const type = typeof value;
	//   if (type == 'number') {
	//     return 'number';
	//   } else if (type == 'string') {
	//     return 'string';
	//   } else if (Object.keys(value).length > 0) {
	//     return 'map';
	//   } else if (Object.prototype.toString.call(value) === '[object Array]') {
	//     return 'array';
	//   }
	// }
	if (props.status == 'loading') {
		return (
			<div className={styles.root}>
				{' '}
				<ClipLoader />
			</div>
		);
	}
	if (props.status == 'idle' && JSON.stringify(props.inView) == '{}') {
		return (
			<div className={styles.root}>
				<p className={styles.prompt}>select a product to view here.</p>
			</div>
		);
	}
	if (props.error != null) {
		return <div className={styles.root}>Error</div>;
	}

	return (
		<div className={styles.root}>
			{/* {Object.keys(props.product).length > 0
        ? Object.keys(props.product).map((key, i) => (
            <DataEntry key={i} type={isPrimary(props.product[key])} propertyName={key} value={props.product[key]} />
          ))
        : ''} */}

			<ImagesDisplay productID={props.inView.id} images={props.inView.images} />
			<DataEntry propertyName="Title" value={props.inView.title} />
			<DataEntry propertyName="Price" value={props.inView.price} />
			<DataEntry value={props.inView.attributes} propertyName="Attributes" />
			<DataEntry value={props.inView.type} propertyName="Type" />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		inView: state.products.inView.value,
		status: state.products.inView.status,
		error: state.products.inView.error,
	};
};

export default connect(mapStateToProps)(SelectedProduct);
