import Appbar from '../../components/Appbar';
import { Outlet } from 'react-router-dom';
import styles from './layout.module';

function Layout() {
	return (
		<div className={styles.root}>
			<Appbar />
			<div className={styles.page}>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
