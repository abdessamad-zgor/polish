import styles from './imagesdisplay.module';
import ImageBox from '../ImageBox';
import { AddIcon } from '../icons';
import { useDispatch } from 'react-redux';

import $ from 'jquery';

function ImagesDisplay(props) {
	const dispatch = useDispatch();

	const addImage = (file) => {
		dispatch(addProductImageThunk({ productID: props.prductId, image: file }));
	};
	return (
		<div className={styles.root}>
			<div className={styles.images}>
				{props.images.map((img, i) => {
					return <ImageBox key={i} productID={props.productID} imgSrc={img} />;
				})}
				<div className={styles.newImage}>
					<input
						type="file"
						name=""
						onChange={(e) => {
							if (e.target.files.length > 0) {
								addImage(e.target.files.item);
							}
						}}
						id="new-image-file"
						style={{ display: 'none' }}
					/>
					<span
						className={styles.icon}
						onClick={() => {
							$('#new-image-file').trigger('click');
						}}
					>
						<AddIcon />
					</span>
				</div>
			</div>
		</div>
	);
}

export default ImagesDisplay;
