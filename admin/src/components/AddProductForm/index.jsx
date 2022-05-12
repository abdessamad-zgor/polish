import { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AddIcon } from '../icons';
import { addProductThunk } from '../../store/thunks/productThunks';
import styles from './addproductform.module';

function AddProductForm(props) {
	const dispatch = useDispatch();
	const [arrays, setArrays] = useState({ attributes: [''], images: [''] });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const submitAddProduct = (data) => {
		dispatch(addProductThunk({ data, idToken: props.idToken }));
	};
	return (
		<form className={styles.root} onSubmit={handleSubmit(submitAddProduct)}>
			<div className={styles.formRow}>
				<label htmlFor="" className={styles.label}>
					Title:
				</label>
				<input type="text" className={styles.input} {...register('title')} />
			</div>
			<div className={styles.formRow}>
				<div className={styles.half}>
					<label htmlFor="" className={styles.label}>
						Price:
					</label>
					<input type="number" className={styles.input} {...register('price')} />
				</div>
				<div className={styles.half}>
					<label htmlFor="" className={styles.label}>
						Type:
					</label>
					<input type="text" className={styles.input} {...register('type')} />
				</div>
			</div>

			<div className={styles.formRow}>
				<div className="">
					{' '}
					<label htmlFor="" className={styles.label}>
						Images:
					</label>{' '}
					<span
						className={styles.iconMini}
						onClick={() => {
							setArrays({ ...arrays, images: [...arrays.images, ''] });
						}}
					>
						<AddIcon />
					</span>
				</div>
				{arrays.images.map((el, i) => (
					<input key={i} type="file" {...register(`images[${i}]`)} className={styles.inputImg} />
				))}
			</div>
			<div className={styles.formRow}>
				<div className="">
					{' '}
					<label htmlFor="" className={styles.label}>
						Attributes:
					</label>{' '}
					<span
						className={styles.iconMini}
						onClick={() => {
							setArrays({ ...arrays, attributes: [...arrays.attributes, ''] });
						}}
					>
						<AddIcon />
					</span>
				</div>

				{arrays.attributes.map((el, i) => (
					<input key={i} type="text" {...register(`attributes[${i}]`)} className={styles.input} />
				))}
			</div>
			<div className={styles.formRow}>
				<label htmlFor="" className={styles.label}>
					Sale:
				</label>
				<input type="text" className={styles.input} {...register('sale')} />
			</div>
			<div className={styles.footer}>
				<input type="submit" className={styles.btn} value="save" />
				<button
					className={styles.btn}
					onClick={() => {
						props.closeForm();
					}}
				>
					cancel
				</button>
			</div>
		</form>
	);
}

const mapStateToProps = (state) => {
	return {
		idToken: state.admin.info.idToken,
	};
};

export default connect(mapStateToProps)(AddProductForm);
