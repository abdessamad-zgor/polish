import styles from './imagebox.module';
import { EditIcon } from '../icons';
import { useDispatch } from 'react-redux';
import { replaceProductImageThunk } from '../../store/thunks/productThunks';
import $ from 'jquery';

function ImageBox(props) {
	const dispatch = useDispatch();
	const updateImage = (file) => {
		dispatch(replaceProductImageThunk({ id: props.productID, img: file, index: props.key }));
	};

	return (
		<div className={styles.root}>
			<div className={styles.actionsHover}>
				<input
					type="file"
					name=""
					id="file-input"
					onChange={(e) => {
						if (e.target.files.length > 0) {
							updateImage(e.target.files.item);
						}
					}}
					style={{ display: 'none' }}
				/>
				<span
					className={styles.icon}
					onClick={() => {
						$('#file-input').trigger('click');
					}}
					id="file-click"
				>
					<EditIcon />
				</span>
			</div>
			<img className={styles.imgSrc} src={props.imgSrc} alt="" />
		</div>
	);
}

export default ImageBox;
