import OrderListProvider from './OrderListProvider'
import Table from './components/Table'

const OrderList = () => {
	return (
		<OrderListProvider>
			<Table />
		</OrderListProvider>
	)
}

export default OrderList