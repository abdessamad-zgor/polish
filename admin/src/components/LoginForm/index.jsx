import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAdminThunk } from '../../store/thunks/authThunks';
import styles from './loginform.module';

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();

	const loginAdmin = (data) => {
		dispatch(loginAdminThunk(data));
	};
	return (
		<form className={styles.root} onSubmit={handleSubmit(loginAdmin)}>
			<div className={styles.formRow}>
				<label htmlFor="" className={styles.label}>
					Email
				</label>
				<input type="text" {...register('email')} className={styles.input} />
			</div>
			<div className={styles.formRow}>
				<label htmlFor="" className={styles.label}>
					Password
				</label>
				<input type="password" {...register('password')} className={styles.input} />
			</div>
			<div className={styles.actions}>
				<input type="submit" value="Login" className={styles.submitBtn} />
			</div>
		</form>
	);
}

export default LoginForm;
