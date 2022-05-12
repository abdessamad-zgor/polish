import styles from './orderitem.module';

function OrderItem(props) {
	const OrderAt = new Date(props.order.orderedAt);
	return (
		<div className={styles.orderItem}>
			<div className={styles.orderItemDate}>{`${OrderAt.toDateString()}`}</div>
			<div className={styles.orderItemContent}>
				{props.order.products.map((product) => '')}
				<div className={styles.orderItemFooter}>
					<h3>{props.order.estinatedTotal}</h3>
				</div>
			</div>
		</div>
	);
}

export default OrderItem;
