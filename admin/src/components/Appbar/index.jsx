import styles from './appbar.module';

import Drawer from '../Drawer';

function Appbar() {
	return (
		<div className={styles.root}>
			<div className={styles.logo}>
				<h3 className={styles.title}>Asoul</h3> <p className={styles.small}>admin</p>
			</div>
			<Drawer />
		</div>
	);
}

export default Appbar;
