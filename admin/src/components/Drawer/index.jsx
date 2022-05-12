import styles from './drawer.module';
import {
	HomeIcon,
	SettingsIcon,
	StatsIcon,
	FinancesIcon,
	UsersIcon,
	OrderIcon,
	ProductIcon,
	MediaIcon,
} from '../icons';
import useLogic from './logic';

function Drawer() {
	const { navigateToPage } = useLogic();
	return (
		<div className={styles.root}>
			<div onClick={() => navigateToPage('/')} className={styles.icon}>
				<HomeIcon />
			</div>
			<div className={styles.icon}>
				<UsersIcon />
			</div>
			<div className={styles.icon}>
				<StatsIcon />
			</div>
			<div onClick={() => navigateToPage('/products')} className={styles.icon}>
				<ProductIcon />
			</div>
			<div onClick={() => navigateToPage('/orders')} className={styles.icon}>
				<OrderIcon />
			</div>
			<div className={styles.icon}>
				<MediaIcon />
			</div>
			<div className={styles.icon}>
				<FinancesIcon />
			</div>
			<div className={styles.icon}>
				<SettingsIcon />
			</div>
		</div>
	);
}

export default Drawer;
