import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EditIcon, DeleteIcon } from '../icons';
import { useDispatch, connect } from 'react-redux';
import EditField from '../EditField';
import styles from './dataentry.module';
import { updateFieldThunk } from '../../store/thunks/productThunks';

function DataEntry(props) {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const saveChanges = (data) => {
		setEdit(!edit);

		console.log(data);
		dispatch(updateFieldThunk({ id: props.id, data, idToken: props.idToken }));
	};

	const deleteEntry = (data) => {
		console.log('entry deleted');
	};

	if (edit && (typeof props.value == 'string' || typeof props.value == 'number')) {
		return (
			<form onSubmit={handleSubmit(saveChanges)} className={styles.entry}>
				<h4>{props.propertyName} </h4>
				<input
					type="text"
					className={styles.input}
					{...register(`${props.propertyName.toLowerCase()}`)}
					defaultValue={props.value}
				/>
				<input type="submit" value="save" />
				<button
					onClick={() => {
						setEdit(!edit);
					}}
				>
					cancel
				</button>
			</form>
		);
	}
	if (edit && Array.isArray(props.value)) {
		return (
			<form onSubmit={handleSubmit(saveChanges)} className={styles.entry}>
				<h4 className={styles.entryKey}>{props.propertyName} </h4>
				<div className={styles.values}>
					{props.value.map((item, i) => {
						return (
							<div className={styles.objectValue}>
								<h4>{`"${i}"`}</h4>
								<input
									type="text"
									className={styles.input}
									{...register(`${props.propertyName.toLowerCase()}[${i}]`)}
									defaultValue={item}
								/>
							</div>
						);
					})}
				</div>
				<input type="submit" value="save" />
				<button
					onClick={() => {
						setEdit(!edit);
					}}
				>
					cancel
				</button>
			</form>
		);
	}
	if (!edit && Array.isArray(props.value)) {
		return (
			<div className={styles.entry}>
				<h4 className={styles.entryKey}>{props.propertyName} </h4>
				<div className={styles.fieldActions}>
					<span
						onClick={() => {
							setEdit(!edit);
						}}
						className={styles.icon}
					>
						<EditIcon />
					</span>
					<span onClick={deleteEntry} className={styles.icon}>
						<DeleteIcon />
					</span>
				</div>
				<div className={styles.values}>
					{props.value.map((item, i) => {
						return (
							<div className={styles.objectValue}>
								<h4>{`"${i}"`}</h4>
								<p>{item}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
	if (edit && props.value.constructor.name == 'Object') {
		return (
			<form onSubmit={handleSubmit(saveChanges)} className={styles.entry}>
				<h4 className={styles.entryKey}>{props.propertyName} </h4>
				<div className={styles.values}>
					{Object.keys(props.value).map(
						(item,
						(i) => {
							return (
								<div className={styles.objectValue}>
									<h4>{`"${i}"`}</h4>
									<input
										type="text"
										className={styles.input}
										{...register(`${props.propertyName}[${i}]`)}
										defaultValue={item}
									/>
								</div>
							);
						})
					)}
				</div>
				<input type="submit" value="save" />
				<button
					onClick={() => {
						setEdit(!edit);
					}}
				>
					cancel
				</button>
			</form>
		);
	}
	if (!edit && props.value.constructor.name == 'Object') {
		return (
			<div className={styles.entry}>
				<h4 className={styles.entryKey}>{props.propertyName} </h4>
				<div className={styles.fieldActions}>
					<span
						onClick={() => {
							setEdit(!edit);
						}}
						className={styles.icon}
					>
						<EditIcon />
					</span>
					<span onClick={deleteEntry} className={styles.icon}>
						<DeleteIcon />
					</span>
				</div>
				<div className={styles.values}>
					{Object.keys(props.value).map((item, i) => {
						return (
							<div className={styles.objectValue}>
								<h4>{item}</h4>
								<p>{props.value[item]}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.entry}>
			<h4>{props.propertyName}: </h4>
			<p>{`${props.value}`}</p>
			<div className={styles.fieldActions}>
				<span
					onClick={() => {
						setEdit(!edit);
					}}
					className={styles.icon}
				>
					<EditIcon />
				</span>
				<span onClick={deleteEntry} className={styles.icon}>
					<DeleteIcon />
				</span>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		id: state.products.inView.value.id,
		idToken: state.admin.info.idToken,
	};
};

export default connect(mapStateToProps)(DataEntry);
